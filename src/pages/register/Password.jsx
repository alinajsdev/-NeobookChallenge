import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSecond } from "./SignUpSecond";
import PasswordImg from "../../assets/images/password.png";
import EYE from "../../assets/images/eye-disable.png";
import EyeClose from "../../assets/images/eye.png";

const Password = ({ username, email }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [cPassword, setCPassword] = useState(false);

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
    <Flex flexDirection={"column"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src={PasswordImg} alt="password" w={"80px"} height={"80px"} />
        <Heading
          mt={"28px"}
          mb={"5px"}
          color={"#494949"}
          fontSize={"20px"}
          fontFamily={"Inter"}
          fontWeight={"500"}
        >
          Придумайте пароль
        </Heading>
        <Text
          color={"#C0C0C0"}
          fontSize={"16px"}
          fontFamily={"Inter"}
          fontWeight={"400"}
          w={"343px"}
          textAlign={"center"}
          mb={"28px"}
        >
          Минимальная длина — 8 символов. Для надежности пароль должен содержать
          буквы и цифры.
        </Text>
      </Flex>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <Box>
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
            variant="unstyled"
            type={password ? "text" : "password"}
            name="password"
            placeholder="Пароль"
          />

          <Image
            onClick={() => setPassword(!password)}
            display={password ? "none" : "block"}
            src={EYE}
            alt="eye password"
            width={"24px"}
            h={"24px"}
            position={"absolute"}
            right={"8px"}
            mt={"-28px"}
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
            right={"8px"}
            mt={"-28px"}
            cursor={"pointer"}
          />
          <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
          {errors.password && (
            <small style={{ position: "absolute", top: "45px", color: "red" }}>
              {errors.password}
            </small>
          )}
        </Box>
        <Box pos={"relative"} mt={"47px"}>
          <FormLabel
            style={{ opacity: values.confirm_password ? 1 : 0 }}
            color={"#C0C0C0"}
            fontSize={"14px"}
            fontFamily={"Inter "}
            position={"absolute"}
            top={"-6px"}
            fontWeight={"400"}
          >
            Повторите пароль
          </FormLabel>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm_password}
            variant="unstyled"
            name="confirm_password"
            type={cPassword ? "text" : "password"}
            placeholder="Повторите пароль"
          />
          <Image
            onClick={() => setCPassword(!cPassword)}
            display={cPassword ? "none" : "block"}
            src={EYE}
            alt="eye password"
            width={"24px"}
            h={"24px"}
            position={"absolute"}
            right={"8px"}
            mt={"-29px"}
            cursor={"pointer"}
          />
          <Image
            onClick={() => setCPassword(!cPassword)}
            display={cPassword ? "block" : "none"}
            src={EyeClose}
            alt="eye password"
            width={"24px"}
            h={"24px"}
            pos={"absolute"}
            right={"8px"}
            mt={"-29px"}
            cursor={"pointer"}
          />
          <Box width={"335px"} height={"0.5px"} bg={"#C0C0C0"} />
          {errors.confirm_password && (
            <small style={{ position: "absolute", top: "45px", color: "red" }}>
              {errors.confirm_password}
            </small>
          )}
        </Box>
        <Button
          type="submit"
          bg={"#5458EA"}
          mt={"80px"}
          width={"335px"}
          height={"44px"}
          color={"#fff"}
          fontFamily={"Inter, sans-serif"}
          borderRadius={"80px"}
          _hover={{ bg: "#5458EA" }}
        >
          Далее
        </Button>
      </form>
    </Flex>
  );
};

export default Password;
