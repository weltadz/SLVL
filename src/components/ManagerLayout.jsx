import Navbar from "./Navbar";

const ManagerLayout = ({children}) =>{
    return(
        <div>
            <Navbar role="Manager"/>
            <main>{children}</main>
        </div>
    )
}

export default ManagerLayout