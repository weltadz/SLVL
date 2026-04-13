const menuByRole = {
    Employee:[
        {name: "Dashboard"},
        {name: "Request"},
        {name: "Profile"},
        {name: "Logout"}
    ],
    Admin:[
        {name: "Dashboard"},
        {name: "Employees"},
        {name: "Departments"},
        {name: "Logout"}
    ],
    HR:[
        {name: "Dashboard"},
        {name: "Employees"},
        {name: "Request"},
        {name: "Logout"}
    ],
    Supervisor:[
        {name: "Dashboard"},
        {name: "Request"},
        {name: "Logout"}
    ],
    Manager:[
        {name: "Dashboard"},
        {name: "Request"},
        {name: "Logout"}
    ]
};

const Navbar = ({role}) =>{
    const menu = menuByRole[role] || [];

    return(
        <nav className="hidden sm:text-sm sm:flex justify-between bg-gray-800 w-full h-14 text-white box-border ">
            <div className="flex justify-center items-center text-2xl box-border p-5">
                <h1>IKPC SLVL System</h1>
            </div>
            <div className="flex justify-center items-center gap-5 box-border p-5 pr-5 ">
                {menu.map((item)=>(
                    <a key={item.name} href="" className="hover:text-lime-400">
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
    )
}

export default Navbar