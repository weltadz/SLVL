import Navbar from "./Navbar";

const EmployeeLayout = ({children}) =>{
    return(
        <div className="flex flex-col h-screen m-0 p-0">
            <Navbar role="Employee"/>
            <main className="flex-1">{children}</main>
        </div>
    ) 
}

export default EmployeeLayout