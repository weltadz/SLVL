import { useEffect, useState } from "react"
import getLeaveBalance from "../api/getLeaveBalance"
import { getLatestRequest } from "../api/getLatestRequest";
import add from "../assets/plus.png";
import back from "../assets/back.png";
import backWhite from "../assets/backWhite.png";
import createLeaveRequest from "../api/createRequest";

function Home(){
    // toggle request form
    const [isOpen, setOpen] = useState(false);

    // hover effect on return button
    const [isHovered, setHovered] = useState(false);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [documentTypeId, setLeaveType] = useState(1);

    const [successMessage, setSuccess] = useState("");
    const [errorMessage, setError] = useState("");

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
            },10000);
        }
        
        runRefresh();

        return () => clearInterval(interval);
    },[])

    useEffect(()=> {
        if(errorMessage){
            const timer = setTimeout(()=>{
                setError("");
            },3000)

            return () => clearTimeout(timer);
        }
    },[errorMessage]);

    useEffect(()=> {
        if(successMessage){
            const timer = setTimeout(()=>{
                setSuccess("");
            },3000)

            return () => clearTimeout(timer);
        }
    },[successMessage]);

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const message = await createLeaveRequest(startDate, endDate, reason, documentTypeId);
            console.log("submit clicked")
            setSuccess(message);
            setError("");
            setStartDate("");
            setEndDate("");
            setReason("");
        }catch(error){
            setError(error.message);
            setSuccess("");
        }
    }

    const handleReturnBtn = () =>{
        setOpen(false);
        setStartDate("");
        setEndDate("");
        setReason("");
    }

    return(
        <main className="flex flex-col items-center justify-start w-full h-full m-0 p-0 pt-50 box-border pt-10 bg-gray-200">
            <div className="latestRequestTableContainer relative flex items-start justify-start
            bg-white shadow-md rounded w-[90%] h-[300px] sm:w-[80%] box-border">
                <h1 className="absolute bottom-77 text-2xl font-medium md:text-3xl">Leave Request Overview</h1>
                <div className="absolute right-5 bottom-77 box-border 
                h-[35px] w-[110px]">
                    <button className=" flex items-center justify-center gap-3 cursor-pointer bg-green-500 hover:bg-green-700 
                    rounded-lg text-white w-[130px] h-[40px] transition duration-100 ease-in-out" onClick={()=>setOpen(true)}>
                        <img src={add} alt="" className="w-[15px]" />
                        <p className="text-[15px]">Add request</p>
                    </button>
                </div>
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
                                <td colSpan={5} className="text-gray-500 text-center">
                                    No leave request yet
                                </td>
                            </tr>
                        ) : (
                            latestRequest.map((item,index) =>(
                                <tr key={index} className="text-[10px] h-[2rem] text-center md:text-[15px] md:h-[3rem] 
                                border-b-1 border-gray-300">
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
                <div className="balanceContainer absolute flex flex-col items-end gap-5 top-80 w-[260px] h-[120px] bg-slate-600 
                rounded p-2 text-white">
                    <div className="w-full h-[8px] box-border">
                        <p className="text-xs">Remaining balance</p>
                    </div>
                    <div className="slvlContainer w-full flex items-start justify-center flex-1">
                        <div className="sickLeave flex flex-col items-center w-[140px] h-[70px] bg-slate-600 p-1
                        text-white border-r-1 border-bg-white">
                            <p className="text-4xl">{leaveBalance.sickLeave}</p>
                            <p className="text-xs">Sick leave</p>
                        </div>
                        <div className="vacationLeave flex flex-col items-center w-[140px] h-[70px] bg-slate-600 p-1
                        text-white">
                            <p className="text-4xl">{leaveBalance.vacationLeave}</p>
                            <p className="text-xs">Vacation leave</p>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className=" flex items-center justify-center fixed bottom-1 w-full h-screen
                rounded bg-black/70 z-20">
                    <form 
                    className=" relative bg-white w-[400px] h-[600px] shadow-md
                    rounded border-box pt-12 p-2 flex flex-col items-center"
                    onSubmit={handleSubmit}>
                        <button    
                        className=" absolute left-2 top-2 bg-gray-300 hover:bg-gray-400 w-[40px] h-[40px] 
                        rounded-md border-box pl-2 cursor-pointer hover:shadow-lg transition ease-in-out duration-100"
                        type="button" 
                        onClick={handleReturnBtn}
                        onMouseEnter={()=>setHovered(true)}
                        onMouseLeave={()=>setHovered(false)}>
                            <img 
                            src={isHovered ? backWhite : back}
                            alt="return button" 
                            className="w-[20px]" />
                        </button>

                        <p className="text-2xl mb-12">Leave Request Form</p>

                        <div className="startDateContainer w-full h-[1px] flex justify-between
                        items-center border-box p-10">
                            <label className="text-end w-[80px] border-box">Start Date:</label>
                            <input 
                            className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded" 
                            type="date"
                            value={startDate}
                            onChange={(e)=>setStartDate(e.target.value)}
                            required />
                        </div>

                        <div className="endDateContainer w-full h-[1px] flex justify-between items-center border-box p-10">
                            <label className="text-end w-[80px] border-box">End Date:</label>
                            <input 
                            className="w-[200px] h-[40px] border-1 cursor-pointer outline-none border-box p-2 rounded" 
                            type="date"
                            value={endDate}
                            onChange={(e)=> setEndDate(e.target.value)}
                            required />
                        </div>

                        <div className="reasonContainer w-full h-[1px] flex justify-between items-center border-box p-10">
                            <label className="text-end w-[80px] border-box">Reason:</label>
                            <textarea 
                            className="w-[200px] h-[60px] border-1 cursor-pointer resize-none 
                            overflow-y-auto outline-none border-box p-2 rounded" 
                            type="text"
                            value={reason}
                            onChange={(e)=> setReason(e.target.value)} 
                            required/>
                        </div>

                        <div className="leaveTypeContainer w-full h-[1px] flex justify-between items-center border-box p-10">
                            <label className="text-end w-[80px] border-box">Leave type:</label>
                            <select 
                            className="w-[200px] h-[40px] outline-none border-1 border-box p-2 rounded
                            cursor-pointer"
                            onChange={(e)=> setLeaveType(Number(e.target.value))}
                            required>
                                <option value={1}>Sick Leave</option>
                                <option value={2}>Vacation Leave</option>
                            </select>
                        </div>

                        <div className="leaveTypeContainer w-full h-[1px] flex justify-end items-center border-box pt-13 pr-2">
                            <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-700 w-[150px] h-[40px] 
                            text-white rounded-lg cursor-pointer transition ease-in-out duration-100">
                                Submit Request
                            </button>
                        </div>

                        {errorMessage && 
                        <p className="absolute bottom-10 text-red-500 text-sm text-center">
                            {errorMessage}
                        </p>}

                        {successMessage && 
                        <p className="absolute bottom-10 text-green-500 text-sm text-center">
                            {successMessage}
                        </p>}
                    </form>
                </div>
            )}
        </main>
    )
}

export default Home