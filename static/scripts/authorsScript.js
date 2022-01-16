function initAuthors() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/api/authors/', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if (!response.ok)
            throw response;

        return response.json()
    }).then( data => {
        const lst = document.getElementById('authorsList');

        data.forEach( el => {
            const div  = document.getElementById("authorsList");
            const label = document.createElement("label");
            label.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Address: ${el.address}, Phone_Number: ${el.phoneNumber} </li>`;
            btn = document.createElement("button");
            btn.id = el.id;
            btn.innerHTML = "Izmeni" +" "+ btn.id;

            btndel = document.createElement("button");
            btndel.id = el.id;
            btndel.innerHTML = "Obrisi"+" " + btndel.id;
            div.appendChild(label);
            div.appendChild(btn);
            div.appendChild(btndel);
            btndel.addEventListener("click", e => {
                e.preventDefault();
                console.log(btndel.id);
                fetch(`http://localhost:8000/api/authors/${btndel.id}`, {
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }}).then((response) => {
                    if (!response.ok)
                        throw response;

                    return response.json()
                }).then(el => {
                    //lst.innerHTML-=  `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;

                });
                window.location.href = 'index.html';
            });
            btn.addEventListener("click", e =>{
                e.preventDefault();
                console.log(btn.id);
                document.getElementById('put_Name').value = el.name;
                document.getElementById('put_phone_number').value = el.phoneNumber;
                document.getElementById('put_AuthorAddress').value = el.address;

                document.getElementById("put_authorsBtn").addEventListener("click", e =>{
                    e.preventDefault();
                    console.log("IDEMOOO");
                    const putdata = {
                        name: document.getElementById("put_Name").value,
                        phoneNumber: document.getElementById('put_phone_number').value,
                        address: document.getElementById('put_AuthorAddress').value
                    };
                    console.log(putdata);
                    fetch(`http://localhost:8000/api/authors/${btn.id}`, {
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

        });

    })

    document.getElementById('authorsBtn').addEventListener('click', e => {
        e.preventDefault();

    const data = {
        name: document.getElementById("aName").value,
        phoneNumber: document.getElementById('phone_number').value,
        address: document.getElementById('AuthorAddress').value
    };

        console.log(JSON.stringify(data));
        fetch('http://localhost:8000/api/authors/',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
                res.json().then(data =>{
                    let btn = document.createElement("button");
                    btn.innerHTML = "Izmeni";
                    btn.id=data.id;
                    let btndel = document.createElement("button");
                    btndel.innerHTML = "Obrisi";
                    btndel.id=data.id;
                    document.getElementById('authorsList').innerHTML += `<li>ID: ${data.id}, name: ${data.name}, phoneNumber: ${data.phoneNumber}, address: ${data.address}</li>`;
                    console.log(data);
                    document.getElementById('authorsList').appendChild(btn);
                    document.getElementById('authorsList').appendChild(btndel);

                })
            }
        });
        document.getElementById('aName').value = '';
        document.getElementById('phone_number').value = '';
        document.getElementById('AuthorAddress').value = '';
    });
}