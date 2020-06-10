import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '@/service/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userLogIn: false,
        usuario: {},
        ifMapCreated: false,
        setIntervalId:0
    },
    getters: {
        nombre(state) {
            return state.usuario.name;
        },
        ifMapCreated(state) {
            return state.ifMapCreated;
        },
        userLogIn(state) {
            return state.userLogIn;
        },
        user_id(state) {
            return state.usuario._id;
        },
        level(state) {
            return state.usuario.level;
        },
        exp(state) {
            return state.usuario.exp;
        },
        exp_next(state) {
            return state.usuario.exp_next;
        },
        warriors(state) {
            return state.usuario.warriors;
        },
        archers(state) {
            return state.usuario.archers;
        },
        money(state) {
            return state.usuario.money;
        },
        usuario(state) {
            return state.usuario;
        }
    },
    mutations: {
        logOut: (state) => {
            state.usuario = {};
            state.userLogIn = false;
            localStorage.setItem("user", JSON.stringify(state.usuario));
            localStorage.setItem("login", JSON.stringify(state.userLogIn));
            clearInterval(state.setIntervalId);
        },
        login: (state, data) => {
            state.usuario = data;
            state.userLogIn = true;
            localStorage.setItem("login", JSON.stringify(state.userLogIn));
            localStorage.setItem("user", JSON.stringify(data));
        },
        storage: (state) => {
            var data = JSON.parse(localStorage.getItem("user"));
            var login = JSON.parse(localStorage.getItem("login"));

            state.usuario = data;
            state.userLogIn = login;
            
               state.setIntervalId= setInterval(()=>{  
                if (state.userLogIn) {              
                     Axios().post("post/login/",{
                        name:data.name,
                        password:data.password
                     }).then(docs=>{
                        state.usuario = docs.data;
                        localStorage.setItem("user", JSON.stringify(docs.data));
                     });  
                    } 
                },10000);              
        },
        storage_user: (state, data) => {
            state.usuario = data;
            // Save user data to the current local store
            localStorage.setItem("user", JSON.stringify(data));
        }
    },
    actions: {
        logOut: ({ commit }) => {
            commit('logOut');
        },
        login: ({ commit }, data) => {
            commit('login', data);
        },
        storage: ({ commit }) => {
            commit('storage');
        },
        storage_user: ({ commit }, data) => {
            commit('storage_user', data);
        }
    }
});