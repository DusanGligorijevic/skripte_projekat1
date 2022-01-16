function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        fetch('http://127.0.0.1:9000/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (!response.ok)
                throw response;
            return response.json();
        }).then((jsonData) => {
            console.log("proslo");
            document.cookie = `token=${jsonData.token};SameSite=Lax`;
            window.location.href = 'naslovna.html';
        }).catch((error) => {
            if (typeof error.text === 'function')
                error.text().then((errorMessage) => {
                    alert(errorMessage);
                });
            else
                alert(error);
        });

    });
}