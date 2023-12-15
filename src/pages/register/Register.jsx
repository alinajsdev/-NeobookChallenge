import axios from "axios";
import React, { useState } from "react";
import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";

import { signUpFirst } from "./SignUpValidation";
import Password from "./Password";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  const [form, setForm] = useState(false);
  const [wrong, setWrong] = useState(false);

  const submit = async (username, email) => {
    try {
      const { data } = await axios.post(`users/check-user/`, {
        username,
        email,
      });

      if (data.username || data.email) {
        setWrong(true);
      } else {
        setForm(true);
      }
    } catch (e) {
      if (e.response.status > 200) {
        return e.message;
      }
    }
  };

  const initialFirst = {
    username: "",
    email: "",
  };

  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: initialFirst,
    validationSchema: signUpFirst,
    onSubmit: (values) => {
      submit(values.username, values.email);
      setName(values.username);
      setEmail(values.email);
    },
  });

  return (
    <Box>
      <Box display={form ? "none" : "block"}>
        <form onSubmit={handleSubmit}>
          <Heading>Register</Heading>
          <Box>
            <FormLabel>name</FormLabel>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              type="text"
              name="username"
              placeholder="name"
            />
            {errors && <small>{errors.username}</small>}
          </Box>
          <Box>
            <FormLabel>email</FormLabel>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              type="email"
              placeholder="email"
            />
            {errors && <small>{errors.email}</small>}
          </Box>
          <Button type="submit">Submit</Button>
        </form>
        <Heading>{wrong && "Данный пользователь уже зарегистрирован"}</Heading>
      </Box>
      <Box display={form ? "block" : "none"}>
        <Password username={username} email={email} />
      </Box>
    </Box>
  );
};

export default Register;
