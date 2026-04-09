import { Navigate } from "react-router-dom";
import getUserRole from "../utils/GetUserRole"

const ProtectedRoutes = ({children, allowedRoles}) =>{
    const role = getUserRole();

    if(!role){
        return <Navigate to={"/"} replace/>;
    }

    if(!allowedRoles.includes(role)){
        return <Navigate to={"/"} replace/>
    }

    return children
}

export default ProtectedRoutes