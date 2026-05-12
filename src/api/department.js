import fetchWithToken from "../utils/FetchWithToken";

export const getAllDepartment = async ()=>{
    const response = await fetchWithToken ("https://localhost:7080/api/Department");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const patchDepartment = async (departmentId, departmentName)=>{
    const response = await fetchWithToken (`https://localhost:7080/api/Department/${departmentId}`,{
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({departmentName})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}