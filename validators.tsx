import * as yup from "yup";

export const bookScheme = yup.object().shape({
    number: yup.number().required(),
})