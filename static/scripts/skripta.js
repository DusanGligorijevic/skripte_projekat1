let btn;
let btndel;

function initUsers() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/api/users/', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    },).then((response) => {
        if (!response.ok)
            throw response;

        return response.json()
    }).then( data => {
        const lst = document.getElementById('usrLst');
        console.log(data);
        data.forEach( el => {
            const div  = document.getElementById("divv");
            const label = document.createElement("label");
            label.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            btn = document.createElement("button");
            btn.id = el.id;
            btn.innerHTML = "Izmeni" +" "+ btn.id;

            btndel = document.createElement("button");
            btndel.id = el.id;
            btndel.innerHTML = "Obrisi"+" " + btndel.id;
            div.appendChild(label);
            div.appendChild(btn);
            div.appendChild(btndel);
            //document.body.appendChild(btndel);
            //lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            //document.getElementById('div').appendChild(btn);
            //document.getElementById("div").appendChild(btndel);


            bindDelete(btndel,token);
            btn.addEventListener("click", e => {
                e.preventDefault();
                console.log(btn.id);
                document.getElementById('user_Name').value = el.name;
                document.getElementById('email').value = el.email;

                document.getElementById("put_usersBtn").addEventListener("click", e => {
                    e.preventDefault();
                    console.log("IDEMOOO");
                    const putdata = {
                        name: document.getElementById("user_Name").value,
                        address: document.getElementById('email').value
                    };
                    console.log(putdata);
                    fetch(`http://localhost:8000/api/users/${btn.id}`, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`

                        },
                        body: JSON.stringify(putdata)
                    }).then((response) => {
                        if (!response.ok)
                            throw response;

                        return response.json();
                    }).then((jsonData) => {
                        // jsonData.name = putdata.name;
                        // jsonData.phoneNumber = putdata.phoneNumber;
                        // jsonData.address = putdata.address;
                        // lst.innerHTML.replace(`<li>ID: ${el.id}, Name: ${el.name}, phoneNumber: ${el.phoneNumber}, address: ${el.address}</li>`,`<li>ID: ${jsonData.id}, Name: ${jsonData.name}, phoneNumber: ${jsonData.phoneNumber}, address: ${jsonData.address}</li>`)
                        window.location.href = 'index.html';
                    })
                })
            })
            console.log(btn)

        });

    }).catch((error) => {
        if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
                alert(errorMessage);
            });
        else
            alert(error);
    });


    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
function bindDelete(button, token){
    button.addEventListener("click", e => {
        e.preventDefault();
        console.log(button.id);
        fetch(`http://localhost:8000/api/users/${button.id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (!response.ok)
                throw response;

            return response.json()
        }).then(el => {
            window.location.href = 'index.html';
        });
    });
    console.log(button)
}

function bindDelete2(button, token) {
    button.onclick = function(e){
        e.preventDefault();
        console.log(button.id);
        fetch(`http://localhost:8000/api/users/${button.id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (!response.ok)
                throw response;

            return response.json()
        }).then(el => {
            window.location.href = 'index.html';
        });
    };
    console.log(button)
}
