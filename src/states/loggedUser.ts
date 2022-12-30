import { reactive } from 'vue';

const loggedUser = reactive({
    id: undefined,
    token: undefined,
});

function setLoggedUser (data:any) {
    loggedUser.id = data.id;
    loggedUser.token = data.token;
}

function clearLoggedUser () {
    loggedUser.id = undefined;
    loggedUser.token = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser }