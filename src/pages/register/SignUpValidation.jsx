import * as Yup from "yup";

export const signUpFirst = Yup.object({
  username: Yup.string().required("enter your name"),
  email: Yup.string()
    .email("please enter valid email")
    .required("enter your email"),
});
