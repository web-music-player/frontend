import { reactive } from 'vue';

const loggedUser = reactive({
    id: undefined,
    email: undefined,
    tipoAccount: undefined,
    token: undefined,
});

function setLoggedUser (data:any) {
    loggedUser.id = data.id;
    loggedUser.email = data.email;
    loggedUser.tipoAccount = data.tipoAccount;
    loggedUser.token = data.token;
}

function clearLoggedUser () {
    loggedUser.id = undefined;
    loggedUser.email = undefined;
    loggedUser.tipoAccount = undefined;
    loggedUser.token = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser }