import fetchWithToken from "../utils/FetchWithToken";

const getLeaveBalance = async () =>{
    const response = await fetchWithToken('http://10.198.10.7:500/api/LeaveBalance');
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export default getLeaveBalance