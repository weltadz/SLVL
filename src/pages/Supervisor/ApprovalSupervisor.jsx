import { getAllRequestApprovalSupervisor } from "../../api/getLatestRequest"
import { patchLeaveRequest } from "../../api/patchLeaveRequest";
import { useState, useEffect } from "react"
import check from "../../assets/success.png"
import cross from "../../assets/failed.png"

function ApprovalSupervisor (){

    const [approvalRequest, setApproval] = useState([]);

    const [success, setSuccess] = useState("");
    const [errors, setError] = useState("");

    const [save, setSave] = useState(false);
    const [failed, setFailed] = useState(false);

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

    const loadRequest = async () => {
        const data = await getAllRequestApprovalSupervisor();
        setApproval(data);
    }

    const handleApprove = async (leaveRequestId) => {
        await patchLeaveRequest(leaveRequestId);
        loadRequest();  
    }

    useEffect(()=>{
        let interval;

        const runRefresh = ()=>{
            loadRequest();

            interval = setInterval(()=>{
                loadRequest();
            },3000)
        }

        runRefresh();

        return () => clearInterval(interval);
    },[])

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-45 box-border pt-10 bg-taupe-100">
            <div className="RequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded w-[90%] h-[500px] sm:w-[80%] box-border">
                {save && (
                    <div
                        className="successMessageContainer absolute w-[225px] h-[225px] rounded-lg shadow-xl/20 bg-white flex 
                        flex-col gap-1 justify-center items-center pb-7 z-1 border-1 border-gray-300">
                        <img
                            src={check}
                            alt="successIcon"
                            className=" w-[80px] h-[80px] mb-5" />
                        <p className="text-lg font-medium">SUCCESS</p>
                        <p className="text-gray-400 text-center">{success}</p>
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
                            <p className="text-gray-400 text-center">{errors}</p>
                        }

                    </div>
                )}
                
                <div className="absolute flex items-center justify-between bottom-143 bg-white w-full h-[90px] z-0 
                shadow-lg rounded-md p-6">
                    <h1 className="text-3xl font-medium">Approvals</h1>
                </div>

                <h1 className="absolute bottom-126 text-2xl">
                    For approval
                </h1>
                
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-blue-500 text-white h-[2rem] md:h-[3rem] md:text-sm">
                            <th className="rounded-tl w-[200px]">Enrollnumber</th>
                            <th className="w-[200px]">Start Date</th>
                            <th className="w-[200px]">End Date</th>
                            <th className="w-[200px]">Total Days</th>
                            <th className="w-[200px]">Reason</th>
                            <th className="w-[200px]">Document Type</th>
                            <th className="rounded-tr w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvalRequest.length == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={7}>No Request</td>
                            </tr>
                        ) : (
                            approvalRequest.map((item,index)=>(
                                <tr 
                                key={index}
                                className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>{item.enrollNumber}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.totalDays}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.documentTypeId == 1 ? "Sick Leave" : "Vacation Leave"}</td>
                                    <td className="w-[190px]">
                                        <button 
                                        className="bg-green-500 hover:bg-green-700 text-white h-[30px] w-[75px] 
                                        rounded mr-2 cursor-pointer"
                                        onClick={()=>handleApprove(item.requestId)}
                                        type="button">
                                            Approve
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white h-[30px] w-[75px] 
                                        rounded cursor-pointer">
                                            Decline
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

export default ApprovalSupervisor