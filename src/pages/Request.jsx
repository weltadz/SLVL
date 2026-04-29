import { useState, useEffect } from "react"
import { getAllRequest } from "../api/getLatestRequest"

function Request (){

    const [latestRequest, setRequest] = useState([]);
    const loadRequest = async () => {
        const data = await getAllRequest();
        setRequest(data);
    }

    useEffect(()=>{
        let interval;

        const runRefresh = async () => {
            await loadRequest();

            interval = setInterval(()=>{
                loadRequest();
            },10000)
        }

        runRefresh();

        return ()=> clearInterval(interval);
    },[])

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-50 box-border pt-10 bg-gray-200">
            <div className="latestRequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded w-[90%] h-[300px] sm:w-[80%] box-border">
                <h1 className="absolute bottom-77 text-2xl font-medium md:text-3xl">Leave Request</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-slate-600 text-white h-[2rem] md:h-[3rem] md:text-sm">
                            <th className="rounded-tl">Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Document Type</th>
                            <th className="rounded-tr">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestRequest.length == 0 ? (
                            <tr>
                                <td colSpan={5} className="text-gray-500 text-center">No leave request yet</td>
                            </tr>
                        ) : (
                            latestRequest.map((item,index)=>(
                                <tr key={index} className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.documentTypeId == 1 ? "Sick Leave" : "Vacation Leave"}</td>
                                    <td>
                                        {item.statusId == 1? "Pending"
                                        :item.statusId == 2? "Approved"
                                        : "Completed"}
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

export default Request