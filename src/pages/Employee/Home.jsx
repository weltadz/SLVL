import { useEffect, useState } from "react"
import getLeaveBalance from "../../api/getLeaveBalance"
import getLatestRequest from "../../api/getLatestRequest";
import add from "../../assets/plus.png";

function Home(){
    const [isOpen, setOpen] = useState(true);

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
        let interval;

        const runRefresh = async () =>{
            await loadBalance();
            await loadRequest();

            interval = setInterval(() =>{
                loadBalance();
                loadRequest();
            },5000);
        }
        
        runRefresh();

        return () => clearInterval(interval);
    },[])

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 box-border pt-10 bg-gray-200">
            {isOpen && (
                <div>
                    <form action="">

                    </form>
                </div>
            )}
            <div className=" flex item-start font-medium text-2xl w-[100%] box-border mb-30 pl-2 pb-1 border-b-1
            border-gray-400">
                <h1>Approved Request</h1>
            </div>
            <div className="latestRequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded-lg w-[90%] h-[300px] sm:w-[80%] box-border">
                <div className="absolute right-3 bottom-76 box-border 
                h-[35px] w-[110px]">
                    <button className=" flex items-center justify-center gap-3 cursor-pointer bg-green-500 hover:bg-green-700 
                    rounded-lg text-white w-[120px] h-[35px] transition duration-100 ease-in-out">
                        <img src={add} alt="" className="w-[15px]" />
                        <p className="text-[15px]">Add request</p>
                    </button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[10px] uppercase bg-slate-600 text-white h-9 md:text-sm">
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
                                <tr key={index} className="text-[10px] text-center md:text-[15px] border-b-1 border-gray-300 
                                h-[2rem]">
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.documentTypeId == 1? "Sick Leave" : "Vacation Leave"}</td>
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

export default Home