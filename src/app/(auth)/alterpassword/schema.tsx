import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);

export default Yup.object().shape({
    password: Yup.string().required("Digite a senha atual"),
    password2: Yup.string().required("Digite a a nova senha"),
    password3: Yup.string().required("Repita a nova senha")
    .oneOf([Yup.ref('password2')], 'As senhas devem ser iguais'),
});