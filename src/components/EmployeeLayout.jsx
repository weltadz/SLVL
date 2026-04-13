import Navbar from "./Navbar";

const EmployeeLayout = ({children}) =>{
    return(
        <div>
            <Navbar role="Employee"/>
            <main>{children}</main>
        </div>
    )
}

export default EmployeeLayout