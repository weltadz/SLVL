const refreshAccessToken = async () =>{
    const refreshToken = localStorage.getItem("refreshToken");

    if(!refreshToken){
        console.log('no refresh token found')
        return null;
    }

    const response = await fetch('https://localhost:7080/api/RefreshToken',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({refreshToken})
    });

    if(!response.ok){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        return null;
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken',data.refreshToken);

    return data.token;
}

export default refreshAccessToken