const fetchLogin = async (enrollNumber, password) =>{
    const response = await fetch('https://localhost:7080/api/Login',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({enrollNumber, password})
    });

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.message || result.error);
    }

    localStorage.setItem('accessToken', result.token);
    localStorage.setItem('refreshToken', result.refreshToken);
    
}

export default fetchLogin