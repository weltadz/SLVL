import Navbar from "./Navbar";

const HRLayout = ({children}) =>{
    return(
        <div>
            <Navbar role="HR"/>
            <main>{children}</main>
        </div>
    )
}

export default HRLayout