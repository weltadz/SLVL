import fetchWithToken from "../utils/FetchWithToken";

const getLatestRequest = async () =>{
    const response = await fetchWithToken('https://localhost:7080/api/LeaveRequest');
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export default getLatestRequest