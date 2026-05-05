import { useState, useEffect } from "react"
import { getAllRequest } from "../api/getLatestRequest"

function Request (){

    const [latestRequest, setRequest] = useState([]);
    const [filter, setFilter] = useState("All");

    const status = {
        Pending: 1,
        Approved: 2,
        Completed: 3
    };

    const filteredRequest = latestRequest.filter((r)=>
        filter == "All" ? true : r.statusId ==status[filter]
    );

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
            <div className="RequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded w-[90%] h-[500px] sm:w-[80%] box-border">
                <h1 className="absolute bottom-127 text-2xl font-medium md:text-3xl">Leave Request</h1>
                <div className="absolute right-1 bottom-126 box-border h-[40px] w-[120px]">
                    <select
                    value={filter}
                    onChange={(e)=>setFilter(e.target.value)}
                    className="w-full h-[40px] border-1 border-gray-400 rounded cursor-pointer outline-none bg-white
                    text-center">
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-slate-600 text-white h-[2rem] md:h-[3rem] md:text-sm">
                            <th className="rounded-tl w-[200px]">Start Date</th>
                            <th className="w-[200px]">End Date</th>
                            <th className="w-[200px]">Reason</th>
                            <th className="w-[200px]">Document Type</th>
                            <th className="rounded-tr w-[200px]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequest.length == 0 ? (
                            <tr className=" text-[15px] text-gray-500 h-[2rem] md:h-[3rem] md:text-[20px] 
                                text-center">
                                <td colSpan={5}>
                                    No leave request yet
                                </td>
                            </tr>
                        ) : (
                            filteredRequest.map((item,index)=>(
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