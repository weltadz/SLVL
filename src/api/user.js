import fetchWithToken from "../utils/FetchWithToken"

export const getAllUser = async ()=>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/User/All");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const patchUser = async (enrollNumber, roleId, departmentId)=>{
    const response = await fetchWithToken(`http://10.198.10.7:500/api/User/${enrollNumber}`,{
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({roleId, departmentId})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}

export const addUser = async (enrollNumber, password, departmentId) =>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/User",{
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({enrollNumber, password, departmentId})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}

export const deleteUser = async (enrollNumber)=>{
    const response = await fetchWithToken(`http://10.198.10.7:500/api/User/${enrollNumber}`,{
        method: 'DELETE'
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}

export const resetPassword = async (enrollNumber,newPassword)=>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/User/Reset",{
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({enrollNumber, newPassword})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}