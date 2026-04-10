const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
    };

    let response = await fetch(url,{...options,headers});

    if(response.status === 401){
        const refreshToken = localStorage.getItem('refreshToken');

        if(!refreshToken){
            throw new Error('Session expired, please log in again')
        };

        const refreshTokenResponse = await fetch('https://localhost:7080/api/RefreshToken',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({refreshToken})
        });

        if(!refreshTokenResponse.ok){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            throw new Error('Session expired, please log in again')
        };

        const data = await refreshTokenResponse.json();

        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${data.token}`,
            'Content-Type' : 'application/json'
        };

        response = await fetch(url,{...options,headers:newHeaders});
    }

    return response;
}

export default fetchWithToken