import fetchWithToken from "../utils/FetchWithToken";

export const addRole = async (roleName)=>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/Role",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({roleName})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}

export const getAllRole = async ()=>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/Role");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const patchRole = async (roleId, roleName)=>{
    const response = await fetchWithToken(`http://10.198.10.7:500/api/Role/${roleId}`,{
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({roleName})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}