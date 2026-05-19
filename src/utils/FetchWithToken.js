const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');

    const header = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'application/json'
    };

    let response = await fetch(url,{...options,headers:header});

    if(response.status === 401){
        console.log('still 401');
        const refreshToken = localStorage.getItem('refreshToken');

        if(!refreshToken){
            throw new Error('No refresh token');
        };

        const refreshTokenResponse = await fetch('http://10.198.10.7:500/api/RefreshToken',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({refreshToken})
        });

        if(!refreshTokenResponse.ok){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            throw new Error('Session expired');
        };

        const data = await refreshTokenResponse.json();

        localStorage.setItem('accessToken', data.newAccessToken);
        localStorage.setItem('refreshToken', data.newRefreshToken);

        const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${data.newAccessToken}`,
            'Content-Type' : 'application/json'
        };

        response = await fetch(url,{...options,headers:newHeaders});
    }

    return response;
}

export default fetchWithToken