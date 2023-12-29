import axios from "axios";
import { Toaster, toast } from "sonner";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ForgotPassword from "./ForgotPassword";
import { loginValidation } from "./LoginValidation";

import Eye from "../../assets/images/eye-disable.png";
import EyeClose from "../../assets/images/eye.png";
import AuthBg from "../../components/AuthBg";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);

  const submit = async (username, password) => {
    try {
      const res = await axios.post(`users/login/`, {
        username,
        password,
      });

      const { access, refresh } = res.data;
      // console.log(access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("accessToken", access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        return showToastMessage();
      }
    }
  };

  const initialValues = {
    name: "",
    password: "",
  };
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      submit(values.name, values.password);
    },
  });
  const showToastMessage = () => {
    toast.error("Неверный логин или пароль", {
      position: "top-right",
    });
  };

  return (
    <Flex>
      <AuthBg />
      <Flex
        flexDirection={"column"}
        mt={"240px"}
        ml={"192px"}
        position={"relative"}
      >
        <Toaster richColors />
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Flex flexDirection={"column"}>
            <FormLabel
              style={{ opacity: values.name ? 1 : 0 }}
              color={"#C0C0C0"}
              fontSize={"14px"}
              fontFamily={"Inter "}
              mt={"30px"}
              position={"absolute"}
              top={"-35px"}
              fontWeight={"400"}
            >
              Имя пользователя
            </FormLabel>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              type="text"
              variant="unstyled"
              placeholder="Имя пользователя"
              name="name"
            ></Input>
            <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
            {errors.name && (
              <small
                style={{ position: "absolute", top: "45px", color: "red" }}
              >
                {errors.name}
              </small>
            )}
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex flexDirection={"column"} mt={"47px"} pos={"relative"}>
              <FormLabel
                style={{ opacity: values.password ? 1 : 0 }}
                color={"#C0C0C0"}
                fontSize={"14px"}
                fontFamily={"Inter "}
                mt={"0px"}
                position={"absolute"}
                top={"-6px"}
                fontWeight={"400"}
              >
                Пароль
              </FormLabel>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type={password ? "text" : "password"}
                variant="unstyled"
                placeholder="Пароль"
                name="password"
              />
              <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
              {errors.name && (
                <small
                  style={{ position: "absolute", top: "45px", color: "red" }}
                >
                  {errors.password}
                </small>
              )}
            </Flex>
            <Image
              onClick={() => setPassword(!password)}
              display={password ? "none" : "block"}
              src={Eye}
              alt="eye password"
              width={"24px"}
              h={"24px"}
              position={"absolute"}
              right={"0"}
              mt={"58px"}
              cursor={"pointer"}
            />
            <Image
              onClick={() => setPassword(!password)}
              display={password ? "block" : "none"}
              src={EyeClose}
              alt="eye password"
              width={"24px"}
              h={"24px"}
              pos={"absolute"}
              right={"0"}
              mt={"58px"}
              cursor={"pointer"}
            />
          </Flex>
          <ForgotPassword />
          <Button
            type="submit"
            bg={"#5458EA"}
            width={"335px"}
            height={"44px"}
            color={"#fff"}
            fontFamily={"Inter, sans-serif"}
            borderRadius={"80px"}
            _hover={{ bg: "#5458EA" }}
          >
            Войти
          </Button>
        </form>

        <NavLink to={"/register"}>
          <Heading
            color={"#5458EA"}
            fontSize={"14px"}
            fontFamily={"Inter, sans-serif"}
            mt={"196px"}
            textAlign={"center"}
            cursor={"pointer"}
            fontWeight={"500"}
          >
            Зарегистрироваться
          </Heading>
        </NavLink>
      </Flex>
    </Flex>
  );
};

export default Login;
