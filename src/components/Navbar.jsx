import { useNavigate } from "react-router-dom";
import { useState } from "react";
import menuIcon from "../assets/icons8-menu-50.png";

const menuByRole = {
    Employee:[
        {name: "Dashboard", link: "/employee/home"},
        {name: "Requests"},
        {name: "Profile"},
        {name: "Logout"}
    ],
    Admin:[
        {name: "Dashboard", link: "/admin/home"},
        {name: "Employees"},
        {name: "Departments"},
        {name: "Logout"}
    ],
    HR:[
        {name: "Dashboard"},
        {name: "Employees"},
        {name: "Requests"},
        {name: "Logout"}
    ],
    Supervisor:[
        {name: "Dashboard"},
        {name: "Requests"},
        {name: "Logout"}
    ],
    Manager:[
        {name: "Dashboard"},
        {name: "Requests"},
        {name: "Logout"}
    ]
};

const Navbar = ({role}) =>{
    const menu = menuByRole[role] || [];
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const handleLogout = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    navigate("/");
};

    return(
        <nav className="bg-slate-800 w-full h-14 text-white box-border text-sm flex justify-between m-0 p-0">
            <div className="flex justify-center items-center text-2xl box-border pl-5">
                <h1>IKPC SLVL</h1>
            </div>

            {/* Mobile view */}
            <div>
                <button className="relative cursor-pointer pr-5 w-10 h-14 sm:hidden" onClick={() => setOpen(!isOpen)}>
                    <img src={menuIcon} alt="menu-bar"/>
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 bg-slate-800 flex flex-col justify-center items-center text-md 
                 w-50 h-37 mt-13 sm:hidden box-border pb-1 z-10 ">
                    {menu.map((item)=>(
                    item.name === "Logout"?(
                        <button key={item.name} onClick={handleLogout} className="cursor-pointer w-47 h-10 rounded 
                        hover:bg-white hover:text-black transition duration-100 ease-in-out">
                            Logout
                        </button>
                    ) : (
                        <a key={item.name} href={item.link} className="flex items-center justify-center hover:bg-white 
                        hover:text-black w-47 h-10 rounded transition duration-100 ease-in-out">
                            {item.name}
                        </a>
                    )
                ))}
                </div>
            )}

            {/* Desktop view */}
            <div className="hidden sm:flex justify-center items-center  box-border pr-2">
                {menu.map((item)=>(
                    item.name === "Logout"?(
                        <button key={item.name} onClick={handleLogout} className="cursor-pointer hover:bg-white 
                        hover:text-black w-23 h-10 rounded transition duration-100 ease-in-out ">
                            Logout
                        </button>
                    ) : (
                        <a key={item.name} href={item.link} className="hover:bg-white hover:text-black w-23 h-10 
                        flex items-center justify-center rounded transition duration-100 ease-in-out">
                            {item.name}
                        </a>
                    )
                ))}
            </div>

            
        </nav>
    )
}

export default Navbar