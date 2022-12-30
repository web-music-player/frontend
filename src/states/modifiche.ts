import { reactive } from 'vue';

const modifiche = reactive({
    nuovoPreferito: undefined
});

function setModifiche (nuovoPreferito:any) {
    modifiche.nuovoPreferito = nuovoPreferito;
}


export { modifiche, setModifiche }