import { useState, useEffect } from "react"
import { getAllUser } from "../../api/user"
import back from "../../assets/back.png"
import { getAllCompletedRequestForEachUser } from "../../api/getLatestRequest";

function Employees (){
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");

    const [recordForm, setRecordForm] = useState(false);
    const [records, setRecords] = useState([]);

    const loadUsers = async ()=>{
        const data = await getAllUser();
        setUsers(data);
    }

    const loadRecords = async ()=>{
        const data = await getAllCompletedRequestForEachUser(userId);
        setRecords(data);
    }

    useEffect(()=>{
        loadUsers();
    },[])

    useEffect(()=>{
        loadRecords();
    },[userId])

    return (
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-45 box-border pt-10 bg-taupe-100">
            <div className="EmployeeTableContainer relative flex items-start justify-start
            bg-white shadow-lg rounded w-[90%] h-[500px] sm:w-[80%] box-border">
                <div className="absolute flex items-center justify-between bottom-143 bg-white w-full h-[90px] 
                shadow-lg rounded-md p-6">
                    <h1 className="text-3xl font-medium">Employees</h1>
                </div>

                <h1 className="absolute bottom-126 text-2xl">
                    Employee List
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
                        {users.lenght == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={4}>No employee found</td>
                            </tr>
                        ) : (
                            users.map((u)=>(
                                <tr 
                                key={u.userId}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>{u.enrollNumber}</td>
                                    <td>{u.roleId == 1? "Admin"
                                        :u.roleId == 2? "Manager"
                                        :u.roleId == 3? "Supervisor"
                                        :u.roleId == 4? "HR"
                                        :"Employee"}
                                    </td>
                                    <td>
                                        {u.departmentId == 1? "IT"
                                        :u.departmentId == 2? "SPPL"
                                        :u.departmentId == 3? "HRAD"
                                        : "Production"}
                                    </td>
                                    <td>
                                        <button 
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white h-[30px] w-[100px] 
                                        rounded cursor-pointer transition duration-100 ease-in-out"
                                        onClick={()=>{
                                            setRecordForm(true)
                                            setUserId(u.userId.toString())
                                        }}>
                                            View Records
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {recordForm && (
                <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/60 z-20">
                    <div className="recordTableContainer relative pt-15 bg-white w-[90%] h-[650px] rounded sm:w-[80%]">
                        <button
                        className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        onClick={()=>{
                        setRecordForm(false)
                        setUserId("")
                        }}>
                            <img 
                            src={back} 
                            alt="returnIcon"
                            className="w-[20px]"  />
                        </button>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-[10px] uppercase bg-blue-500 text-white h-[2rem] md:h-[3rem] md:text-sm">
                                    <th className="w-[200px]">Start Date</th>
                                    <th className="w-[200px]">End Date</th>
                                    <th className="w-[200px]">Total Days</th>
                                    <th className="w-[200px]">Reason</th>
                                    <th className="w-[200px]">Document Type</th>
                                    <th className="w-[200px]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.length == 0 ? (
                                    <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                    text-center">
                                        <td colSpan={6}>No record found</td>
                                    </tr>
                                ) : (
                                    records.map((rec, index)=>(
                                        <tr
                                        key={index}
                                        className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                        border-b-1 border-gray-300">
                                            <td>{rec.startDate}</td>
                                            <td>{rec.endDate}</td>
                                            <td>{rec.totalDays}</td>
                                            <td>{rec.reason}</td>
                                            <td>{rec.documentTypeId == 1 ? "Sick Leave" : "Vacation Leave"}</td>
                                            <td>
                                                {rec.statusId == 1? "Pending"
                                                :rec.statusId == 2? "Approved"
                                                : "Completed"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Employees