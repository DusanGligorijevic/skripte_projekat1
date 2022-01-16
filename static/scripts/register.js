function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked
        };

        fetch('http://localhost:9000/register', {
            method: 'POST',
            cors: 'no-cors',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}
                `},
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok)
                throw response;
            return response.json();
        }).then((jsonData) => {
                document.cookie = `token=${jsonData.token};SameSite=Lax`;
                window.location.href = 'naslovna.html';
            });
    });
}