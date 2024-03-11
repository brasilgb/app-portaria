import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);

export default Yup.object().shape({
    codigo: Yup.string().required("O campo código é obrigatório!"),
    nome: Yup.string().required("O campo nome é obrigatório!"),
    placa: Yup.string().required("O campo placa é obrigatório!"),
    motorista: Yup.string().required("O campo motorista é obrigatório!"),
    produto: Yup.string().required("O campo produto é obrigatório!"),
    pager: Yup.string(),
    notas: Yup.string()
});