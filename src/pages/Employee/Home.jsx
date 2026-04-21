import { useEffect, useState } from "react"
import getLeaveBalance from "../../api/getLeaveBalance"
import getLatestRequest from "../../api/getLatestRequest";

function Home(){
    const [leaveBalance, setLeave] = useState({
        sickLeave: 0,
        vacationLeave: 0
    });

    const [latestRequest, setRequest] = useState([]);

    const loadBalance = async () =>{
        const data = await getLeaveBalance();
        setLeave(data);
    }

    const loadRequest = async () =>{
        const data = await getLatestRequest();
        setRequest(data);
    }

    useEffect(() =>{
        loadBalance();
        loadRequest();

        const interval = setInterval(() =>{
            loadBalance();
        },5000);

        return () => clearInterval(interval);
    },[])

    return(
        <div className="flex flex-col items-center justify-start w-full h-full m-0 p-0 box-border pt-10 bg-gray-100">
            <div className="latestRequestTableContainer flex items-start justify-start
            bg-white shadow-md rounded-lg w-[90%] h-[300px] sm:w-[80%] box-border">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-slate-600 text-white h-9 sm:text-sm">
                            <th className="rounded-tl-lg">Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Document Type</th>
                            <th className="rounded-tr-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestRequest.length == 0 ? (
                            <tr>
                                <td colSpan={5} className="text-gray-500 text-center">
                                    No approved appointment yet
                                </td>
                            </tr>
                        ) : (
                            latestRequest.map((item,index) =>(
                                <tr key={index} className="text-[10px] text-center sm:text-[15px] border-b-1 border-gray-300 
                                h-[2rem]">
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.documentTypeId == 1? "Sick Leave" : "Vacation Leave"}</td>
                                    <td>
                                        {item.status == 1? "Sick Leave"
                                        :item.status == 2? "Vacation Leave"
                                        : "Completed"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home