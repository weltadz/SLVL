import refreshAccessToken from "../api/refreshToken";

const checkAccessToken = async () =>{

    const token = localStorage.getItem('accessToken');
    if(!token){
        await refreshAccessToken();
    }
}

export default checkAccessToken