import fetchWithToken from "../utils/FetchWithToken"

export const getAllUser = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/User/All");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const patchUser = async (enrollNumber, roleId, departmentId)=>{
    const response = await fetchWithToken(`https://localhost:7080/api/User/${enrollNumber}`,{
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