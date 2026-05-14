import { useState, useEffect } from "react"
import { getAllUser } from "../../api/user"
import { getAllDepartment } from "../../api/department"
import { getAllRole } from "../../api/role"
import { resetLeaveBalance } from "../../api/leaveBalance"
import getLeaveBalance from "../../api/getLeaveBalance"
import getUserId from "../../utils/GetUserId"
import add from "../../assets/plus.png"
import back from "../../assets/back.png"
import { patchUser } from "../../api/user"
import check from "../../assets/success.png"
import cross from "../../assets/failed.png"
import { addUser } from "../../api/user"

function Users (){
    const [users, setUser] = useState([]);

    const [isOpen, setOpen] = useState(false);
    const [isAddUserFormOpen, setAddUserForm] = useState(false);

    const [enrollNumber, setEnrollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRole] = useState("");
    const [departmentId, setDepartment] = useState("");

    const [success, setSuccess] = useState("");
    const [errors, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [save, setSave] = useState(false);
    const [failed, setFailed] = useState(false);

    const [department, setDepartments] = useState([]);
    const [role, setRoles] = useState([]);

    const [leaveBalance, setLeave] = useState({
        sickLeave: 0,
        vacationLeave: 0
    });

     const loadBalance = async () =>{
        const data = await getLeaveBalance();
        setLeave(data);
    }

    const loadDepartment = async ()=>{
        const data = await getAllDepartment();
        setDepartments(data);
    }

    useEffect(()=>{
        loadDepartment();
    },[])

    const loadRole = async ()=>{
        const data = await getAllRole();
        setRoles(data);
    }

    useEffect(()=>{
        loadRole();
    },[])

    const loadUser = async ()=>{
        const data = await getAllUser()
        setUser(data);
    }

    useEffect(()=>{
        let interval;

        const runRefresh = ()=>{
            loadUser();
            loadBalance();

            const interval = setInterval(()=>{
                loadUser();
                loadBalance();
            },5000)
        }

        runRefresh();

        return ()=> clearInterval(interval);
    },[])

    const successMessage = ()=>{
        setSave(true);

        setTimeout(()=>{
            setSave(false);
        },2000)
    }

    const failedMessage = ()=>{
        setFailed(true);

        setTimeout(()=>{
            setFailed(false);
        },2000)
    }

    const handleReturnEdit = ()=>{
        setOpen(false);
    }

    const handleAddUserForm = async ()=>{
        setAddUserForm(true);
    }

    const handleReturnUserForm = ()=>{
        setAddUserForm(false);
        
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        setLoading(true);

        try{
            const message = await patchUser(enrollNumber, roleId, departmentId)
            setSuccess(message);
            setError("");
            loadUser()
            successMessage();
        }catch(errors){
            setError(errors.message);
            setSuccess("")
        }finally{
            setLoading(false);
        }
    }

    const handleAddUser = async (e)=>{
        e.preventDefault();

        try{
            const message = await addUser(enrollNumber, password, departmentId);
            setSuccess(message);
            setError("");
            loadUser();
            successMessage();
        }catch(errors){
            setError(errors.message);
            setSuccess("");
            failedMessage();
        }
    }

    const handleResetBalanceBtn = async (e)=>{
        e.preventDefault()

        try{
            const message = await resetLeaveBalance();
            setSuccess(message);
            setError("");
            loadBalance();
            successMessage();
        }catch(error){
            setError(error.message);
            setSuccess("");
            failedMessage();
        }
    }

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-45 box-border pt-10 bg-taupe-100">
            {save && (
                <div
                className="successMessageContainer absolute left-[100] top-65 w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                    <img 
                    src={check} 
                    alt="successIcon"
                    className=" w-[80px] h-[80px] mb-5" />
                    <p className="text-lg font-medium">SUCCESS</p>
                    <p className="text-gray-400">Balance updated</p>
                </div>
            )}

                    {failed && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={cross} 
                            alt="successMessage"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">FAILED</p>
                            {errors &&
                            <p className="text-gray-400">{errors}</p>
                            }
                            
                        </div>
                    )}
            

            <div className="UserTableContainer relative flex items-start justify-start
            bg-white shadow-lg rounded w-[90%] h-[500px] sm:w-[80%] box-border">

                <div className="absolute flex items-center justify-between bottom-143 bg-white w-full h-[90px] 
                shadow-lg rounded-md p-6">
                    <h1 className="text-3xl font-medium">Users</h1>
                    <div className="btnContainer flex gap-2">
                        <button 
                        className=" flex items-center justify-center gap-3 cursor-pointer bg-green-500 hover:bg-green-700 
                        rounded-lg text-white w-[110px] h-[40px] transition duration-100 ease-in-out"
                        onClick={handleAddUserForm}>
                            <img src={add} alt="" className="w-[15px]" />
                            <p className="text-[15px]">Add User</p>
                        </button>

                        <button 
                        className=" flex items-center justify-center gap-3 cursor-pointer bg-red-500 hover:bg-red-700 
                        rounded-lg text-white w-[110px] h-[40px] transition duration-100 ease-in-out"
                        onClick={handleResetBalanceBtn}>
                            <p className="text-[15px]">Reset Balance</p>
                        </button>
                    </div>
                
                </div>

                <h1 className="absolute bottom-126 text-2xl">
                    User List
                </h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-blue-500 text-white h-[2rem] md:h-[3rem] md:text-sm">
                            <th className="rounded-tl w-[200px]">EnrollNumber</th>
                            <th className="w-[200px]">Role</th>
                            <th className="w-[200px]">Department</th>
                            <th className="rounded-tr w-[200px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={4}>No user found</td>
                            </tr>
                        ):(
                            users.map((user , index)=>(
                                <tr 
                                key={index}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>{user.enrollNumber}</td>
                                    <td>{user.roleName}</td>
                                    <td>{user.departmentName}</td>
                                    <td>
                                        <button 
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer transition duration-100 ease-in-out"
                                        onClick={()=>{
                                            setOpen(true)
                                            setEnrollNumber(user.enrollNumber)
                                            setDepartment(user.departmentId.toString())
                                            setRole(user.roleId.toString())
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isAddUserFormOpen && (
                <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/60 z-20">
                    {save && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={check} 
                            alt="successIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">SUCCESS</p>
                            <p className="text-gray-400">Add User Successfully</p>
                        </div>
                    )}

                    {failed && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={cross} 
                            alt="successMessage"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">FAILED</p>
                            {errors &&
                            <p className="text-gray-400">{errors}</p>
                            }
                            
                        </div>
                    )}

                    <form 
                    className=" relative bg-white w-[400px] h-[450px] shadow-md
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleAddUser}>
                        <button 
                        className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={handleReturnUserForm}>
                            <img 
                            src={back} 
                            alt="return button"
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-5">Add User Form</p>

                        <div 
                            className="enrollNumberContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">EnrollNumber:</label>
                                <input 
                                type="text" 
                                className="outline-none border-b-1 text-center"
                                onChange={(e)=>setEnrollNumber(e.target.value)}
                                required/>
                        </div>

                        <div 
                            className="enrollNumberContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Password:</label>
                                <input 
                                type="password" 
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded"
                                onChange={(e)=>setPassword(e.target.value)}
                                required/>
                        </div>

                        <div 
                            className="departmentContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Department:</label>
                                <select
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 
                                rounded"
                                onChange={(e)=>setDepartment(e.target.value)}>
                                    {department.map((dep)=>(
                                        <option key={dep.departmentId} value={dep.departmentId}>
                                            {dep.departmentName}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box pt-13 pr-2">
                            <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-700 w-[150px] h-[40px] 
                            text-white rounded-lg cursor-pointer transition ease-in-out duration-100">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isOpen && (
                <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/60 z-20">
                    {save && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={check} 
                            alt="successMessage"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">SUCCESS</p>
                            <p className="text-gray-400">User updated</p>
                        </div>
                    )}

                    <form 
                    className=" relative bg-white w-[400px] h-[450px] shadow-lg
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleSubmit}>
                        <button 
                        className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={handleReturnEdit}>
                            <img 
                            src={back} 
                            alt="return button"
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-5">Edit User Form</p>

                        <div 
                            className="enrollNumberContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">EnrollNumber:</label>
                                <input 
                                type="text" 
                                value={enrollNumber}
                                readOnly
                                className="outline-none border-b-1 text-center"/>
                        </div>

                        <div 
                            className="roleContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Role:</label>
                                <select
                                value={roleId}
                                onChange={(e)=>setRole(e.target.value)}
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded">
                                    {role.map((r)=>(
                                        <option key={r.roleId} value={r.roleId}>
                                            {r.roleName}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div 
                            className="departmentContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Department:</label>
                                <select
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 
                                rounded"
                                value={departmentId}
                                onChange={(e)=>setDepartment(e.target.value)}>
                                    {department.map((dep)=>(
                                        <option key={dep.departmentId} value={dep.departmentId}>
                                            {dep.departmentName}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box pt-13 pr-2">
                            <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-700 w-[150px] h-[40px] 
                            text-white rounded-lg cursor-pointer transition ease-in-out duration-100"
                            disabled = {loading}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}

export default Users