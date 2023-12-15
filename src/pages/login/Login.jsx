import axios from "axios";
import {Formik, Form, Field, useFormikContext } from "formik";
import { Box, Button, Flex,  FormLabel,  Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAccess } from "../../store/reducers/access";
import ForgotPassword from "./ForgotPassword";
import { loginValidation } from "./LoginValidation";

import Eye from '../../assets/images/eye-disable.png'
import EyeClose from '../../assets/images/eye.png'
import AuthBg from "../../components/AuthBg";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false)


  
  const [wrongMasseges, setWrongMessages] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const dispatch = useDispatch();

  const submit = async (username, password) => {
    try {
      const res = await axios.post(`users/login/`, {
        username,
        password,
      });

      const { access, refresh } = res.data;

      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem("refreshToken", refresh);
      dispatch(getAccess(access));
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        setWrongMessages(true);
      }
    }
  };

  const onSubmitHandler = (values) => {
    submit(values.name, values.password);

  };
  const initialValues = {
    name: "",
    password: "",
  };

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Flex>
    <AuthBg/>
     <Flex flexDirection={'column'}  mt={'240px'} ml={'192px'} position={'relative'}>
     <ToastContainer />
     <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={onSubmitHandler}

        
      >
        {({ errors , values}) => (
          <Form style={{display : 'flex', flexDirection:"column"}}>
            <Flex flexDirection={'column'}>
              <FormLabel style={{ opacity: values.name ? 1 : 0 }} color={'#C0C0C0'} fontSize={'14px'} fontFamily={'Inter '} mt={'30px'} position={'absolute'} top={'-40px'} fontWeight={'400'}>Имя пользователя</FormLabel>
              <Field   type="text" placeholder="Имя пользователя" name="name"  ></Field>
              <Box width={'335px'} height={'0.5px'} bg={'#C0C0C0'}/>
              {/* {errors.name && <small>{errors.name}</small>} */}
            </Flex>
           <Flex justifyContent={'space-between'} >
           <Flex flexDirection={'column'} mt={'47px'}>
           <FormLabel style={{ opacity: values.password ? 1 : 0 }} color={'#C0C0C0'} fontSize={'14px'} fontFamily={'Inter '} mt={'30px'} position={'absolute'} top={'54px'} fontWeight={'400'}>Пароль</FormLabel>
              <Field
                type={password ? 'text' : 'password'}
                placeholder="Пароль"
                name="password"
              ></Field>
                <Box width={'335px'} height={'0.5px'} bg={'#C0C0C0'}/>
              {/* {errors && <small>{errors.password}</small>} */}
            </Flex>
            <Image  
            onClick={()=> setPassword(!password)}
            display={password ? 'none' : 'block'}
            src={Eye} alt="eye password" width={'24px'} h={'24px'} ml={'-20px'} mt={'58px'} cursor={'pointer'}/>
               <Image 
            onClick={()=> setPassword(!password)}
            display={password ? 'block' : 'none'}
            src={EyeClose} alt="eye password" width={'24px'} h={'24px'} ml={'-20px'} mt={'58px'} cursor={'pointer'}/>
           </Flex>
           <ForgotPassword />
            <Button type="submit" bg={'#5458EA'} width={'335px'} height={'44px'} color={'#fff'} fontFamily={'Inter, sans-serif'} borderRadius={'80px'} _hover={{bg: "#5458EA"}}>Войти</Button>
          </Form>
        )}
      </Formik>
      <Heading>{wrongMasseges && "неверный логин или пароль"}</Heading>
      <Heading color={'#5458EA'} fontSize={'14px'} fontFamily={'Inter, sans-serif'} mt={'196px'} lineHeight={'120%'} textAlign={'center'} cursor={'pointer'}  fontWeight={'500'}>Зарегистрироваться</Heading>
     </Flex>


    </Flex>
  );
};

export default Login;
