import fetchWithToken from "../utils/FetchWithToken";

export const getAllRole = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/Role");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}