import { getAllRequestApprovalHr } from "../../api/getLatestRequest"
import { patchLeaveRequest } from "../../api/patchLeaveRequest";
import { useState, useEffect } from "react"

function ApprovalHr (){

    const [approvalRequest, setApproval] = useState([]);

    const loadRequest = async () => {
        const data = await getAllRequestApprovalHr();
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
            },10000)
        }

        runRefresh();

        return () => clearInterval(interval);
    },[])

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-45 box-border pt-10 bg-taupe-100">
            <div className="RequestTableContainer relative flex items-start justify-start
            bg-white shadow-lg rounded w-[90%] h-[500px] sm:w-[80%] box-border">

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
                            <th className="w-[200px]">Reason</th>
                            <th className="w-[200px]">Document Type</th>
                            <th className="rounded-tr w-[200px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvalRequest.length == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={6}>No Request</td>
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

export default ApprovalHr