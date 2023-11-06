import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state, token) {
                state.token= token;
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get(process.env.baseUrl + '/posts.json')
                .then(res => {
                    const postsArray = [];
                    for(const key in res.data) {
                        postsArray.push({ ...res.data[key], id: key})
                    }
                    vuexContext.commit('setPosts', postsArray)
                })
                .catch(e => context.error(e))
            },
            addPost(vuexContext, post) {
                const createdPost = {...post, updatedDate: new Date()}
                return axios.post('https://nuxt-blog-deda2-default-rtdb.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
                .then(res => 
                    vuexContext.commit('addPost', { ...createdPost, id: res.data.name}))
                .catch(e => console.log(e))
            },
            editPost(vuexContext, editedPost) {
                return axios.put('https://nuxt-blog-deda2-default-rtdb.firebaseio.com/posts/' + 
                editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                .then(res => vuexContext.commit('editPost', editedPost))
                .catch(e => console.log(e))
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            authenticateUser(vuexContext, authData) {
                let urlAuth;
                if(!authData.isLogin)
                {
                    urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.Api_Key;

                }
                else {
                    urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.Api_Key;
                }
                return axios.post(urlAuth, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                    }).then(result => {
                        vuexContext.commit('setToken', result.data.idToken);
                        localStorage.setItem('token', result.data.idToken);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                        Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                        Cookie.set('jwt', result.data.idToken);
                        return axios.post('http://localhost:3000/api/track-data', {data: "Authenticated"})
                    }).catch(e => {
                    console.log(e)
                    })
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                  if(!req.headers.cookie) {
                    return;
                  }  
                  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
                  if(!jwtCookie) {
                    return;
                  }
                  token = jwtCookie.split('=')[1];
                  const jwtexpirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate='));
                  expirationDate = jwtexpirationDate.split('=')[1];
                }
                else if (process.client) {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                if(new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch('logout');
                    return;
                }
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if(process.client) {
                    localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    });
}

export default createStore;