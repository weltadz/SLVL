import { useEffect, useState } from "react"
import getLeaveBalance from "../../api/getLeaveBalance"

function Home(){
    const [leaveBalance, setLeave] = useState({
        sickLeave: 0,
        vacationLeave: 0
    });

    const loadBalance = async () =>{
        const data = await getLeaveBalance();
        setLeave(data);
    }

    useEffect(() =>{
        loadBalance();

        const interval = setInterval(() =>{
            loadBalance();
        },5000);

        return () => clearInterval(interval);
    },[])

    return(
        <div className="flex flex-col w-full h-full m-0 p-0 bg-gray-100">
            <div className="leaveBalanceContainer flex justify-center items-center gap-5 w-full h-20 m-0 mt-5 pl-2 box-border sm:justify-start">

                <div className="sickLeave flex flex-col justify-center items-center w-40 h-18 bg-slate-700 text-white rounded-md">
                    <span className="text-3xl ">{leaveBalance.sickLeave}</span>
                    <p className="text-xs font-thin">Sick Leave Balance</p>
                </div>

                <div className="sickLeave flex flex-col justify-center items-center w-40 h-18 bg-slate-700 text-white rounded-md">
                    <span className="text-3xl">{leaveBalance.vacationLeave}</span>
                    <p className="text-xs font-thin">Vacation Leave Balance</p>
                </div>

            </div>
            
            <hr className="border-t w-full border-black/25  m-0 p-0"/>
        </div>
    )
}

export default Home