import * as Yup from "yup";

export const signUpSecond = Yup.object({
  password: Yup.string().min(8).required("enter your password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("enter your password"),
});
