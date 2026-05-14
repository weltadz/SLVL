import add from "../../assets/plus.png"
import { useState, useEffect } from "react"
import { addRole } from "../../api/role"
import { getAllRole } from "../../api/role"
import { patchRole } from "../../api/role"
import { getAllDepartment } from "../../api/department"
import { addDepartment } from "../../api/department"
import { patchDepartment } from "../../api/department"
import check from "../../assets/success.png"
import cross from "../../assets/failed.png"
import back from "../../assets/back.png"

function Settings (){
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [roleName, setRoleName] = useState("");
    const [roleId, setRoleId] = useState("");

    const [departmentName, setDepartmentName] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [isEditRoleOpen, setOpenRole] = useState(false);
    const [isEditDepartmentOpen, setOpenDepartment] = useState(false);

    const [isAddRoleOpen, setOpenAddRole] = useState(false);
    const [isAddDepartmentOpen, setOpenAddDepartment] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErroMessage] = useState("");

    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);

    const loadRole = async ()=>{
        const data = await getAllRole();
        setRoles(data);
    }

    const loadDepartment = async ()=>{
        const data = await getAllDepartment();
        setDepartments(data);
    }

    const handleReturnAddRole = ()=>{
        setOpenAddRole(false);
        setRoleName("");
    }

    const handleReturnEditRole = ()=>{
        setOpenRole(false);
    }

    const handleReturnAddDepartment = ()=>{
        setOpenAddDepartment(false);
        setDepartmentName("");
    }

    const handleReturnEditDepartment = ()=>{
        setOpenDepartment(false);
    }

    const handleAddRoleBtn = async (e)=>{
        e.preventDefault()

        try{
            const message = await addRole(roleName);
            setSuccessMessage(message);
            setErroMessage("");
            loadSuccessPopUp();
            loadRole();
        }catch(error){
            setErroMessage(error.message);
            setSuccessMessage("");
            loadErrorPopUp();
        }
    }

    const handleSubmitBtnRole = async (e)=>{
        e.preventDefault();

        try{
            const message = await patchRole(roleId, roleName);
            setSuccessMessage(message);
            setErroMessage("");
            loadSuccessPopUp();
            loadRole();
        }catch(error){
            setErroMessage(error.message);
            setSuccessMessage("");
            loadErrorPopUp();
        }
    }
    const handleAddDepartmentBtn = async (e)=>{
        e.preventDefault()

        try{
            const message = await addDepartment(departmentName);
            setSuccessMessage(message);
            setErroMessage("");
            loadSuccessPopUp();
            loadDepartment();
        }catch(error){
            setErroMessage(error.message);
            setSuccessMessage("");
            loadErrorPopUp();
        }
    }

    const handleSubmitBtnDepartment = async (e)=>{
        e.preventDefault();

        try{
            const message = await patchDepartment(departmentId, departmentName);
            setSuccessMessage(message);
            setErroMessage("");
            loadSuccessPopUp();
            loadDepartment();
        }catch(error){
            setErroMessage(error);
            setSuccessMessage("");
        }
    }

    const loadSuccessPopUp = ()=>{
        setSuccessPopUp(true);

        setTimeout(() => {
            setSuccessPopUp(false);
        }, 2000);
    }

    const loadErrorPopUp = ()=>{
        setErrorPopUp(true);

        setTimeout(() => {
            setErrorPopUp(false);
        }, 2000);
    }

    useEffect(()=>{
        loadRole();
        loadDepartment();
    },[])

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-45 box-border pt-10 bg-taupe-100">
            <div className="absolute flex items-center justify-between bottom-165 bg-white w-[90%] h-[90px] sm:w-[80%] 
                shadow-lg rounded-md p-6 mb-[0.9px]">
                    <h1 className="text-3xl font-medium">Settings</h1>  
                </div>
            <div className="roleDepartmentContainer relative flex flex-col items-center justify-start gap-20 w-[90%] 
            h-full mb-10 sm:w-[80%] sm:h-full box-border md:flex-row md:items-start md:gap-5">
                <div className="roleContainer relative w-full h-[280px] bg-white shadow-lg md:h-[400px] rounded">
                    <h1 className="absolute bottom-70 text-lg md:bottom-100 md:text-2xl">
                        Roles
                    </h1>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-[10px] uppercase bg-blue-500 text-white h-[2rem] md:h-[3rem] md:text-sm">
                                <th className="rounded-tl w-[200px]">Name</th>
                                <th className="rounded-tr w-[200px]">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((r)=>(
                                <tr 
                                key={r.roleId}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>
                                        {r.roleName}
                                    </td>
                                    <td>
                                        <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer transition duration-100 ease-in-out"
                                        onClick={()=>{
                                            setOpenRole(true)
                                            setRoleName(r.roleName)
                                            setRoleId(r.roleId)
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            
                    <button 
                    className="absolute flex items-center justify-center gap-3 cursor-pointer bg-green-500 
                    hover:bg-green-700 rounded-lg text-white w-[110px] h-[40px] transition duration-100 ease-in-out
                    right-0 bottom-71 md:bottom-101"
                    onClick={()=>{setOpenAddRole(true)}}>
                        <img src={add} alt="" className="w-[15px]" />
                        <p className="text-[15px]">Add Role</p>
                    </button>
                </div>

                <div className="departmentContainer relative w-full h-[280px] bg-white shadow-lg md:h-[400px] rounded">
                    <h1 className="absolute bottom-70 text-lg md:bottom-100 md:text-2xl">
                        Departments
                    </h1>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-[10px] uppercase bg-blue-500 text-white h-[2rem] md:h-[3rem] md:text-sm">
                                <th className="rounded-tl w-[200px]">Name</th>
                                <th className="rounded-tr w-[200px]">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dep)=>(
                                <tr
                                key={dep.departmentId}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>
                                        {dep.departmentName}
                                    </td>
                                    <td>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer transition duration-100 ease-in-out"
                                        onClick={()=>{
                                            setOpenDepartment(true);
                                            setDepartmentName(dep.departmentName)
                                            setDepartmentId(dep.departmentId)
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="absolute flex items-center justify-center gap-3 cursor-pointer bg-green-500 
                    hover:bg-green-700 rounded-lg text-white w-[150px] h-[40px] transition duration-100 ease-in-out
                    right-0 bottom-71 md:bottom-101"
                    onClick={()=>setOpenAddDepartment(true)}>
                        <img src={add} alt="" className="w-[15px]" />
                        <p className="text-[15px]">Add Department</p>
                    </button>
                </div>
            </div>

            {isAddRoleOpen && (
                <div
                className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/60 z-20">
                    {successPopUp && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={check} 
                            alt="successIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">SUCCESS</p>
                            <p className="text-gray-400">{successMessage}</p>
                         </div>
                    )}

                    {errorPopUp && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={cross} 
                            alt="errorIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">ERROR</p>
                            <p className="text-gray-400">{errorMessage}</p>
                         </div>
                    )}
                    <form
                    className=" relative bg-white w-[400px] h-[290px] shadow-lg
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleAddRoleBtn}>
                        <button
                        className="absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={handleReturnAddRole}>
                            <img 
                            src={back} 
                            alt="returnBtn"
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-5">Add Role Form</p>

                        <div
                        className="enrollNumberContainer w-full h-[1px] flex justify-between
                        items-center border-box p-10">
                            <label>Role Name:</label>
                            <input 
                            type="text"
                            className="outline-none border-b-1 text-center"
                            onChange={(e)=>setRoleName(e.target.value)}
                            required />
                        </div>

                        <div
                        className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box
                        pt-13 pr-2">
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

            {isAddDepartmentOpen && (
                <div
                className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/60 z-20">
                    {successPopUp && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={check} 
                            alt="successIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">SUCCESS</p>
                            <p className="text-gray-400 text-center">{successMessage}</p>
                         </div>
                    )}

                    {errorPopUp && (
                        <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                            <img 
                            src={cross} 
                            alt="errorIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                            <p className="text-lg font-medium">ERROR</p>
                            <p className="text-gray-400">{errorMessage}</p>
                         </div>
                    )}
                    <form
                    className=" relative bg-white w-[400px] h-[290px] shadow-lg
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleAddDepartmentBtn}>
                        <button
                        className="absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={handleReturnAddDepartment}>
                            <img 
                            src={back} 
                            alt="returnBtn"
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-5">Add Department Form</p>

                        <div
                        className="enrollNumberContainer w-full h-[1px] flex justify-between
                        items-center border-box p-10">
                            <label>Department Name:</label>
                            <input 
                            type="text"
                            className="outline-none border-b-1 text-center"
                            onChange={(e)=>setDepartmentName(e.target.value)}
                            required />
                        </div>

                        <div
                        className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box
                        pt-13 pr-2">
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

            {isEditRoleOpen && (
                        <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                        rounded bg-black/60 z-20">
                            {successPopUp && (
                                <div
                                className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                                flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                                    <img 
                                    src={check} 
                                    alt="successIcon"
                                    className=" w-[80px] h-[80px] mb-5" />
                                    <p className="text-lg font-medium">SUCCESS</p>
                                    <p className="text-gray-400">{successMessage}</p>
                                </div>
                            )}

                            {errorPopUp && (
                                <div
                                className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                                flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                                    <img 
                                    src={cross} 
                                    alt="errorIcon"
                                    className=" w-[80px] h-[80px] mb-5" />
                                    <p className="text-lg font-medium">ERROR</p>
                                    <p className="text-gray-400">{errorMessage}</p>
                                </div>
                            )}
                            
                            <form
                            className=" relative bg-white w-[400px] h-[290px] shadow-lg
                            rounded border-box pt-12 p-2 flex flex-col items-center"
                            onSubmit={handleSubmitBtnRole}>
                                <button
                                className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                                rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                                onClick={handleReturnEditRole}>
                                    <img 
                                        src={back} 
                                        alt="returnBtn"
                                        className="w-[20px]" />
                                </button>

                                <p className="text-2xl mb-5">Edit Role Form</p>

                                <div className="enrollNumberContainer w-full h-[1px] flex justify-between
                                items-center border-box p-10">
                                    <label>Role Name:</label>
                                    <input 
                                    type="text"
                                    value={roleName} 
                                    className="outline-none border-b-1 text-center"
                                    onChange={(e)=>setRoleName(e.target.value)}
                                    required/>
                                </div>

                                <div className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box
                                pt-13 pr-2">
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

                    {isEditDepartmentOpen && (
                        <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                        rounded bg-black/60 z-20">
                            {successPopUp && (
                                <div
                                className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                                flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                                    <img 
                                    src={check} 
                                    alt="successIcon"
                                    className=" w-[80px] h-[80px] mb-5" />
                                    <p className="text-lg font-medium">SUCCESS</p>
                                    <p className="text-gray-400 text-center">{successMessage}</p>
                                </div>
                            )}
                            <form
                            className=" relative bg-white w-[400px] h-[290px] shadow-lg
                            rounded border-box pt-12 p-2 flex flex-col items-center"
                            onSubmit={handleSubmitBtnDepartment}>
                                <button
                                className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                                rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                                onClick={handleReturnEditDepartment}>
                                    <img 
                                        src={back} 
                                        alt="return button"
                                        className="w-[20px]" />
                                </button>

                                <p className="text-2xl mb-5">Edit Role Form</p>

                                <div className="enrollNumberContainer w-full h-[1px] flex justify-between
                                items-center border-box p-10">
                                    <label>Department Name:</label>
                                    <input 
                                    type="text"
                                    value={departmentName} 
                                    className="outline-none border-b-1 text-center"
                                    onChange={(e)=>setDepartmentName(e.target.value)}
                                    required/>
                                </div>

                                <div className="SaveBtnContainer w-full h-[1px] flex justify-end items-center border-box
                                pt-13 pr-2">
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

export default Settings