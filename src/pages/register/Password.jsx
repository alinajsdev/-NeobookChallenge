import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signUpSecond } from "./SignUpSecond";

const Password = ({ username, email }) => {
  const navigate = useNavigate();
  const fetching = async (password, confirm_password) => {
    await axios.post(`users/register/`, {
      username,
      email,
      password,
      confirm_password,
    });
    navigate("/login");
  };

  const initialSecond = {
    password: "",
    confirm_password: "",
  };

  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: initialSecond,
    validationSchema: signUpSecond,
    onSubmit: (values) => {
      fetching(values.password, values.confirm_password);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Heading>Register</Heading>
      <Box>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          type="text"
          name="password"
          placeholder="password"
        />
        {errors && <small>{errors.password}</small>}
      </Box>
      <Box>
        <FormLabel>ConfirmPassword</FormLabel>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirm_password}
          name="confirm_password"
          type="text"
          placeholder="ConfirmPassword"
        />
        {errors && <small>{errors.confirm_password}</small>}
      </Box>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Password;
