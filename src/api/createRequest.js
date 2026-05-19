import fetchWithToken from "../utils/FetchWithToken";

const createLeaveRequest = async (
    startDate,
    endDate,
    reason,
    documentTypeId
) =>{
    const response = await fetchWithToken('http://10.198.10.7:500/api/LeaveRequest',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            startDate,
            endDate,
            reason,
            documentTypeId
        })
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}

export default createLeaveRequest