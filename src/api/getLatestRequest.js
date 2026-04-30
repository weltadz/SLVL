import fetchWithToken from "../utils/FetchWithToken";

export const getLatestRequest = async () => {
    const response = await fetchWithToken('https://localhost:7080/api/LeaveRequest');
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
};

export const getAllRequest = async () => {
    const response = await fetchWithToken('https://localhost:7080/api/LeaveRequest/All');
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
};

export const getAllRequestApproval = async () =>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveRequest/HR");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}