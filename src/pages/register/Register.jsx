import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { signUpFirst } from "./SignUpValidation";
import Password from "./Password";
import AuthBg from "../../components/AuthBg";
import Arrow from "../../assets/images/arrow-left.png";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  const [form, setForm] = useState(false);


  const showToastMessage = () => {
    toast.error("Данный пользователь уже зарегистрирован", {
      position: "top-right",
    });
  };

  const submit = async (username, email) => {
    try {
      const { data } = await axios.post(`users/check-user/`, {
        username,
        email,
      });

      if (data.username || data.email) {
       return showToastMessage()
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
    <Flex>
      <AuthBg />
      <Toaster richColors />
      <Flex flexDirection={"column"}   >
        <Button
          onClick={() => navigate("/login")}
          pos={"absolute"}
          top={"15px"}
          left={"53%"}
          w={"44px"}
          h={"28px"}
          borderRadius={"50px"}
          p={"0"}
          bg={"rgba(192, 192, 192, 0.20)"}
        >
          <Image src={Arrow} alt="arrow left" w={"24px"} height={"24px"} />
        </Button>
        <Link to={"/login"}>
          {" "}
          <Heading
            pos={"absolute"}
            top={"19px"}
            left={"57%"}
            color={"#000"}
            fontSize={"16px"}
            fontFamily={"Inter"}
          >
            Назад
          </Heading>
        </Link>
        <Heading
          pos={"absolute"}
          top={"19px"}
          left={"73.5%"}
          color={"#494949"}
          fontSize={"18px"}
          fontFamily={"inter"}
        >
          Register
        </Heading>
        <Box display={form ? "none" : "block"} pos={'relative'}  mt={"240px"}
        ml={"192px"}>
          <form onSubmit={handleSubmit}>
            <Box >
              <FormLabel style={{ opacity: values.username ? 1 : 0 }}    color={"#C0C0C0"}
                fontSize={"14px"}
                fontFamily={"Inter "}
                mt={"0px"}
                position={"absolute"}
                top={"-6px"}
                fontWeight={"400"}>name</FormLabel>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                variant="unstyled"
                type="text"
                name="username"
                placeholder="Имя пользователя"
              />
                 <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
                 {errors.username && (
                <small
                  style={{ position: "absolute", top: "45px", color: "red" }}
                >
                  {errors.username}
                </small>
              )}
            </Box>
            <Box pos={'relative'} mt={'47px'}>
              <FormLabel  style={{ opacity: values.email ? 1 : 0 }}  color={"#C0C0C0"}
                fontSize={"14px"}
                fontFamily={"Inter "}
             
                position={"absolute"}
                top={"-6px"}
                fontWeight={"400"}>email</FormLabel>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                variant="unstyled"
                name="email"
                type="email"
                placeholder="Почта"
              />
                 <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
                 {errors.email && (
                <small
                  style={{ position: "absolute", top: "45px", color: "red" }}
                >
                  {errors.email}
                </small>
              )}
            </Box>
            <Button
              type="submit"
              bg={"#5458EA"}
              mt={'80px'}
              width={"335px"}
              height={"44px"}
              color={"#fff"}
              fontFamily={"Inter, sans-serif"}
              borderRadius={"80px"}
              _hover={{ bg: "#5458EA" }}
           >Далее</Button>
          </form>
        </Box>
        <Box display={form ? "block" : "none"} ml={'192px'} mt={'170px'}>
          <Password username={username} email={email} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
