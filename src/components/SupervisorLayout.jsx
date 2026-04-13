import Navbar from "./Navbar";

const SupervisorLayout = ({children}) =>{
    return(
        <div>
            <Navbar role="Supervisor"/>
            <main>{children}</main>
        </div>
    )
}

export default SupervisorLayout