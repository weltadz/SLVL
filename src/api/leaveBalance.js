import fetchWithToken from "../utils/FetchWithToken"

export const resetLeaveBalance = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveBalance",{
        method: "POST"
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}