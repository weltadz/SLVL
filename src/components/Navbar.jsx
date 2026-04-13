const menuByRole = {
    Employee:[
        {name: "Dashboard"},
        {name: "Request"},
        {name: "Profile"}
    ],
    Admin:[
        {name: "Dashboard"},
        {name: "Employees"},
        {name: "Departments"}
    ],
    HR:[
        {name: "Dashboard"},
        {name: "Employees"},
        {name: "Request"}
    ],
    Supervisor:[
        {name: "Dashboard"},
        {name: "Request"}
    ],
    Manager:[
        {name: "Dashboard"},
        {name: "Request"}
    ]
};

const Navbar = ({role}) =>{
    const menu = menuByRole[role] || [];

    return(
        <nav className="hidden sm:text-sm sm:flex justify-between bg-gray-800 w-full min-h-16 text-white box-border md:text-lg">
            <div className="flex justify-center items-center text-2xl box-border p-5">
                <h1>IKPC SLVL System</h1>
            </div>
            <div className="flex justify-center items-center gap-5 box-border p-5 ">
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