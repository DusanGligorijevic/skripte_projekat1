import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    token: '',
    bookformset:'',
    authors: [],
    authorformset:'',
    publishers: [],
    publisherformset: '',
    users: [],
    userformset: '',
  },

  mutations: {
    setBooks(state,o){
      state.books = o;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    addComment(state, obj) {
      const book = state.books.filter( book => book.id == obj.id )[0];
      if (book) {
        book.comments.push(obj.comment);
      }
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setBookForm(state,val){
      state.bookformset=val
    },
    setAuthors(state,o){
      state.authors = o;
    },
    setAuthorForm(state,val){
      state.authorformset=val
    },
    setPublishers(state,o){
      state.publishers = o;
    },
    setPublisherForm(state,val){
      state.publisherformset=val
    },
    setUsers(state,o){
      state.users = o;
    },
    setUserForm(state,val){
      state.userformset=val
    },
  },

  actions: {
    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            console.log(tkn)
            if (tkn.msg) {
              alert(tkn.msg);
            } else {

              commit('setToken', tkn.token)

            }
          });
    },
    getAuthors({ commit }){
      fetch('http://127.0.0.1:8000/api/authors',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('setAuthors', res) );

    },
    createAuthor({commit},obj){
      fetch('http://127.0.0.1:8000/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`

        },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/authors',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setAuthors', res) );
            }
          });
    },
    deleteAuthor({commit},id){
      fetch(`http://127.0.0.1:8000/api/authors/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/authors',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setAuthors', res) );
            }
          });
    },
    updateAuthor({commit,state},obj){
      fetch(`http://127.0.0.1:8000/api/authors/${state.authorformset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then( res => {
            if(res.ok) {
              res.json().then(data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/authors',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( resu => commit('setAuthors', resu) );
            }
              });
            }
          });
    },
    authorformset({commit},v){
      commit('setAuthorForm',v)
    },

    getPublishers({ commit }){
      fetch('http://127.0.0.1:8000/api/publishers',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('setPublishers', res) );

    },
    createPublisher({commit},obj){
      fetch('http://127.0.0.1:8000/api/publishers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`

        },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/publishers',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setPublishers', res) );
            }
          });
    },
    deletePublisher({commit},id){
      fetch(`http://127.0.0.1:8000/api/publishers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/publishers',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setPublishers', res) );
            }
          });
    },
    updatePublisher({commit,state},obj){
      fetch(`http://127.0.0.1:8000/api/publishers/${state.publisherformset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/publishers',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( resu => commit('setPublishers', resu) );
            }
          });
    },
    publisherformset({commit},v){
      commit('setPublisherForm',v)
    },

    getUsers({ commit }){
      fetch('http://127.0.0.1:8000/api/users',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('setUsers', res) );

    },
    createUser({commit},obj){
      fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`

        },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/users',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setUsers', res) );
            }
          });
    },
    deleteUser({commit},id){
      fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/users',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setUsers', res) );
            }
          });
    },
    updateUser({commit,state},obj){
      fetch(`http://127.0.0.1:8000/api/users/${state.userformset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/users',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( resu => commit('setUsers', resu) );
            }
          });
    },
    userformset({commit},v){
      commit('setUserForm',v)
    },

    getBooks({ commit }){
      fetch('http://127.0.0.1:8000/api/books',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( obj => obj.json() )
          .then( res => commit('setBooks', res) );

    },
    postbook({commit},obj){
      fetch('http://127.0.0.1:8000/api/books/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body:JSON.stringify(obj)
      })
          .then( res =>{
            if(res.ok) {
              res.json().then(data => {
                if (data.msg) {
                  alert(data.msg);
                } else {
                  fetch('http://127.0.0.1:8000/api/books', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.token}`
                    }
                  })
                      .then(obj => obj.json())
                      .then(res => commit('setBooks', res));
                }
              });
            }
          });

    },
    deletebook({commit},id){
      fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
      })
          .then( res => res.json() )
          .then( data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/books',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( res => commit('setBooks', res) );
            }
          });
    },
    updatebook({commit,state},obj){
      fetch(`http://127.0.0.1:8000/api/books/${state.bookformset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(obj)
      })
          .then( res => {
            if(res.ok) {
              res.json().then(data => {
            if (data.msg) {
              alert(data.msg);
            } else {
              fetch('http://127.0.0.1:8000/api/books',{
                headers: {
                  'Authorization': `Bearer ${localStorage.token}`
                }
              })
                  .then( obj => obj.json() )
                  .then( resu => commit('setBooks', resu) );
            }
              });
            }
          });
    },
    bookformset({commit},v){
      commit('setBookForm',v)
    },
    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { id: comment.id, comment: comment });
    }
  }
})

