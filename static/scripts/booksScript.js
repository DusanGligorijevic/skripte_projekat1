function initBooks() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/api/books/', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }}).then((response) => {
        if (!response.ok)
            throw response;

        return response.json()
    }).then( data => {
        const lst = document.getElementById('booksList');

        data.forEach( el => {
            const div  = document.getElementById("booksList");
            const label = document.createElement("label");


            label.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Desc: ${el.description}, Author: ${el.authorId}, 
            Publisher: ${el.publisherId}</li>`;
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
                fetch(`http://localhost:8000/api/books/${btndel.id}`, {
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
                document.getElementById('put_bookName').value = el.name;
                document.getElementById('put_bookAuthor').value = el.authorId;
                document.getElementById('put_bookPublisher').value = el.publisherId;
                document.getElementById('put_description').value = el.description;

                document.getElementById("put_booksBtn").addEventListener("click", e =>{
                    e.preventDefault();
                    console.log("IDEMOOO");
                    const putdata = {
                     name:   document.getElementById('put_bookName').value,
                     authorId:   document.getElementById('put_bookAuthor').value,
                     publisherId:   document.getElementById('put_bookPublisher').value,
                     description:  document.getElementById('put_description').value
                    };
                    console.log(putdata);
                    fetch(`http://localhost:8000/api/books/${btn.id}`, {
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
                        window.location.href = 'naslovna.html';
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
    document.getElementById('booksBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('bookName').value,
            authorId: document.getElementById('bookAuthor').value,
            publisherId: document.getElementById('bookPublisher').value,
            description: document.getElementById('description').value
        };
        console.log(JSON.stringify(data));
        fetch('http://localhost:8000/api/books/',{
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
                    document.getElementById('booksList').innerHTML += `<li>ID: ${data.id}, name: ${data.name},desc: ${data.description}, authorId: ${data.authorId}, publisherId: ${data.publisherId}</li>`;
                    console.log(data);
                    document.getElementById('booksList').appendChild(btn);
                    document.getElementById('booksList').appendChild(btndel);

                })
            }
        });
        document.getElementById('bookName').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPublisher').value = '';
        document.getElementById('description').value = '';
    });

}