import fetchWithToken from "../utils/FetchWithToken"

export const resetLeaveBalance = async ()=>{
    const response = await fetchWithToken("http://10.198.10.7:500/api/LeaveBalance",{
        method: "POST"
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}