import { useState, useEffect } from "react"
import { getAllUser } from "../../api/user"
import getUserId from "../../utils/GetUserId"
import add from "../../assets/plus.png"
import back from "../../assets/back.png"
import { patchUser } from "../../api/user"

function Users (){
    const [users, setUser] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [enrollNumber, setEnrollNumber] = useState("");
    const [roleId, setRole] = useState("");
    const [departmentId, setDepartment] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loadUser = async ()=>{
        const data = await getAllUser()
        setUser(data);
    }

    useEffect(()=>{
        let interval;

        const runRefresh = ()=>{
            loadUser();

            const interval = setInterval(()=>{
                loadUser();
            },5000)
        }

        runRefresh();

        return ()=> clearInterval(interval);
    },[])

    const handleReturn = ()=>{
        setOpen(false);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const message = await patchUser(enrollNumber, roleId, departmentId)
            setSuccess(message);
            setError("");
        }catch(error){
            setError(error.message);
            setSuccess("")
        }
    }

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-40 box-border pt-10 bg-gray-200">
            <div className="absolute flex items-center justify-between bottom-160 bg-white w-[90%] h-[80px] sm:w-[80%] 
            shadow-md rounded-xl p-6">
                <h1 className="text-3xl font-medium">Users</h1>
                <button className=" flex items-center justify-center gap-3 cursor-pointer bg-green-500 hover:bg-green-700 
                    rounded-lg text-white w-[130px] h-[40px] transition duration-100 ease-in-out">
                    <img src={add} alt="" className="w-[15px]" />
                    <p className="text-[15px]">Add User</p>
                </button>
            </div>
            <div className="RequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded-xl w-[90%] h-[500px] sm:w-[80%] box-border">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-slate-600 text-white h-[2rem] md:h-[4rem] md:text-sm">
                            <th className="rounded-tl-xl w-[200px]">EnrollNumber</th>
                            <th className="w-[200px]">Role</th>
                            <th className="w-[200px]">Department</th>
                            <th className="rounded-tr-xl w-[200px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={3}>No user found</td>
                            </tr>
                        ):(
                            users.map((user , index)=>(
                                <tr 
                                key={index}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>{user.enrollNumber}</td>
                                    <td>{user.roleId == 1? "Admin"
                                        :user.roleId == 2? "Manager"
                                        :user.roleId == 3? "Supervisor"
                                        :user.roleId == 4? "HR"
                                        :"Employee"}
                                    </td>
                                    <td>
                                        {user.departmentId == 1? "IT"
                                        :user.departmentId == 2? "SPPL"
                                        :user.departmentId == 3? "HRAD"
                                        : "Production"}
                                    </td>
                                    <td>
                                        <button 
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer transition duration-100 ease-in-out"
                                        onClick={()=>{
                                            setOpen(true);
                                            setEnrollNumber(user.enrollNumber);
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
            {isOpen && (
                <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/70 z-20">
                    <form 
                    className=" relative bg-white w-[400px] h-[510px] shadow-md
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleSubmit}>
                        <button 
                        className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={handleReturn}>
                            <img 
                            src={back} 
                            alt="return button"
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-12">Edit Users</p>

                        <div 
                            className="enrollNumberContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">EnrollNumber:</label>
                                <input 
                                type="text" 
                                value={enrollNumber}
                                readOnly
                                className="outline-none"/>
                        </div>

                        <div 
                            className="roleContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Role:</label>
                                <select
                                value={roleId}
                                onChange={(e)=>setRole(e.target.value)}
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded">
                                    <option value="2">Manager</option>
                                    <option value="3">Supervisor</option>
                                    <option value="4">HR</option>
                                    <option value="5">Employee</option>
                                </select>
                        </div>

                        <div 
                            className="departmentContainer w-full h-[1px] flex justify-between
                            items-center border-box p-10">
                                <label className="text-end w-[80px] border-box">Department:</label>
                                <select
                                className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded"
                                value={departmentId}
                                onChange={(e)=>setDepartment(e.target.value)}>
                                    <option value="1">IT</option>
                                    <option value="2">SPPL</option>
                                    <option value="3">HRAD</option>
                                    <option value="4">Production</option>
                                </select>
                        </div>

                        <div className="leaveTypeContainer w-full h-[1px] flex justify-end items-center border-box pt-13 pr-2">
                            <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-700 w-[150px] h-[40px] 
                            text-white rounded-lg cursor-pointer transition ease-in-out duration-100">
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