import { useState, useEffect } from "react"
import { getAllUser } from "../../api/user";
import getUserId from "../../utils/GetUserId";
import add from "../../assets/plus.png"

function Users (){
    const [users, setUser] = useState([]);

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
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Users