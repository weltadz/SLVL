import fetchWithToken from "../utils/FetchWithToken";

export const patchLeaveRequest = async (leaveRequestId) => {
    const response = await fetchWithToken(`https://localhost:7080/api/LeaveRequest/${leaveRequestId}`,{
        method: "PATCH"
    });

    if(!response.ok){
        throw new Error("Something went wrong");
    }
}