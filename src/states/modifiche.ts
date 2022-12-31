import { reactive } from 'vue';

const modifiche = reactive({
    idBrano: undefined
});

function setModifiche (idBrano:any) {
    modifiche.idBrano = idBrano;
}


export { modifiche, setModifiche }