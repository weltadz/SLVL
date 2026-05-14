import { useNavigate } from "react-router-dom";
import { useState } from "react";
import menuIcon from "../assets/icons8-menu-50.png";

const menuByRole = {
    Employee:[
        {name: "Dashboard", link: "/employee/home"},
        {name: "Requests", link: "/employee/request"},
        {name: "Logout"}
    ],
    Admin:[
        {name: "Dashboard", link: "/admin/home"},
        {name: "Users", link: "/admin/users"},
        {name: "Approvals", link: "/admin/approvals"},
        {name: "Settings", link: "/admin/settings"},
        {name: "Logout"}
    ],
    HR:[
        {name: "Dashboard", link: "/hr/home"},
        {name: "Employees", link: "/hr/employees"},
        {name: "Approvals", link: "/hr/approvals"},
        {name: "Requests", link: "/hr/request"},
        {name: "Logout"}
    ],
    Supervisor:[
        {name: "Dashboard", link: "/supervisor/home"},
        {name: "Approvals", link: "/supervisor/approvals"},
        {name: "Requests", link: "/supervisor/request"},
        {name: "Logout"}
    ],
    Manager:[
        {name: "Dashboard", link: "/manager/home"},
        {name: "Approvals", link: "/manager/approvals"},
        {name: "Requests", link: "/manager/request"},
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
        <nav className="bg-blue-700 w-full h-14 text-white box-border text-sm flex justify-between m-0 p-0 sticky top-0
        z-10">
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
                <div className="absolute right-0 bg-blue-700 flex flex-col justify-center items-center text-md 
                 w-50 h-37 mt-13 sm:hidden box-border pb-1 z-100 rounded-bl-md">
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