import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserRole from "../utils/GetUserRole"
import checkAccessToken from "../utils/checkAccessToken";
import refreshAccessToken from "../api/refreshToken";

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