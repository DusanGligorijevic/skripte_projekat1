function initPublishers() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/api/publishers/', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }}).then((response) => {
        if (!response.ok)
            throw response;

        return response.json()
    }).then( data => {

        data.forEach( el => {

            const div  = document.getElementById("publishersList");
            const label = document.createElement("label");
            label.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Address: ${el.address}</li>`;
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
                fetch(`http://localhost:8000/api/publishers/${btndel.id}`, {
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
            });
            btn.addEventListener("click", e =>{
                e.preventDefault();
                console.log(btn.id);
                document.getElementById('put_publisherName').value = el.name;
                document.getElementById('put_publisherAddres').value = el.address;

                document.getElementById("put_publishersBtn").addEventListener("click", e =>{
                    e.preventDefault();
                    console.log("IDEMOOO");
                    const putdata = {
                        name: document.getElementById("put_publisherName").value,
                        address: document.getElementById('put_publisherAddres').value
                    };
                    console.log(putdata);
                    fetch(`http://localhost:8000/api/publishers/${btn.id}`, {
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

    }).catch((error) => {
        if (typeof error.text === 'function')
            error.text().then((errorMessage) => {
                alert(errorMessage);
            });
        else
            alert(error);
    });
    document.getElementById('publishersBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('publisherName').value,
            address: document.getElementById('publisherAddres').value
        };
        console.log(JSON.stringify(data));
        fetch('http://localhost:8000/api/publishers/', {
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
                    document.getElementById('publishersList').innerHTML += `<li>ID: ${data.id}, name: ${data.name}, address: ${data.address}</li>`;
                    console.log(data);
                    document.getElementById('publishersList').appendChild(btn);
                    document.getElementById('publishersList').appendChild(btndel);
                })
            }
        });
        document.getElementById('publisherName').value = '';
        document.getElementById('publisherAddres').value = '';
    });

}
var reply_click = function()
{
    alert("Button clicked, id "+this.id+", text"+this.innerHTML);
}