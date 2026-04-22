const getUserRole = () => {
    const token = localStorage.getItem('accessToken');
    
    if(!token){
        return null
    }

    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));

    return decoded.Role;
}

export default getUserRole