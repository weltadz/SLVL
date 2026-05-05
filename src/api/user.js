import fetchWithToken from "../utils/FetchWithToken"

export const getAllUser = async ()=>{
    const response = await fetchWithToken("https://localhost:7080/api/User/All");
    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}