import Navbar from "./Navbar";

const HRLayout = ({children}) =>{
    return(
        <div className="flex flex-col h-screen m-0 p-0">
            <Navbar role="Hr"/>
            <main className="flex-1">{children}</main>
        </div>
    )
}

export default HRLayout