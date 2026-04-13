import Navbar from "./Navbar";

const AdminLayout = ({children}) =>{
    return(
        <div>
            <Navbar role="Admin"/>
            <main>{children}</main>
        </div>
    )
}

export default AdminLayout