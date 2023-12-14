import * as Yup from 'yup'

export const loginValidation = Yup.object({
    name : Yup.string().required('please enter your name'),
    password : Yup.string().required('please enter password')
})