import Navbar from "./Navbar";

const ManagerLayout = ({children}) =>{
    return(
        <div className="flex flex-col h-screen m-0 p-0">
            <Navbar role="Manager"/>
            <main className="flex-1">{children}</main>
        </div>
    )
}

export default ManagerLayout