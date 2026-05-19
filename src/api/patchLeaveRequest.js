import fetchWithToken from "../utils/FetchWithToken";

export const patchLeaveRequest = async (leaveRequestId) => {
    const response = await fetchWithToken(`http://10.198.10.7:500/api/LeaveRequest/${leaveRequestId}`,{
        method: "PATCH"
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result.message;
}