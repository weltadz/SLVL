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

export const getAllRequestApprovalHr = async () =>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveRequest/Hr");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const getAllRequestApprovalSupervisor = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveRequest/Supervisor");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const getAllRequestApprovalManager = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveRequest/Manager");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const getAllRequestApprovalAdmin = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/LeaveRequest/Admin");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}

export const getAllCompletedRequestForEachUser = async (userId)=>{
    const response = await fetchWithToken(`https://localhost:7080/api/LeaveRequest/${userId}`);
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}


