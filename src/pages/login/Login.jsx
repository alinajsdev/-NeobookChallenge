import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAccess } from '../../store/reducers/access'
import ForgotPassword from './ForgotPassword'
import { useFormik, Formik, Form, Field } from 'formik'
import { loginValidation } from './LoginValidation'

const Login = () => {
    const navigate = useNavigate()
    const [wrongMasseges, setWrongMessages] = useState(false)
    // const [username, setUserName] = useState('')
    // const [password, setPassword] = useState('')
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const dispatch = useDispatch()



    const submit = async (username, password) => {
        try {
          const res = await axios.post(`users/login/`, {
            username,
            password,
          });
      
          const { access, refresh } = res.data;
      
          setAccessToken(access);
          setRefreshToken(refresh);
          localStorage.setItem('refreshToken', refresh);
          dispatch(getAccess(access));
      
          // Устанавливаем токен в заголовок для авторизации запросов
          axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
          navigate('/');
        } catch (error) {
          if (error.response && error.response.status >= 400) {
            setWrongMessages(true);
          }
        }
      };   
      

    const onSubmitHandler = (values, { resetForm, setSubmitting }) => {
        
        submit(values.name, values.password)
        // resetForm();
        // setSubmitting(false);
      };
    const initialValues = {
        name : '',
        password : ''
    }


  return (
    <Box>
        <Formik
          initialValues = {initialValues}
          validationSchema = {loginValidation}
          onSubmit={onSubmitHandler}
        >
            {({errors})=>
                <Form >
                <Heading>login</Heading>
                <Box>
                        <FormLabel>name</FormLabel>
                        <Field  type='text' placeholder='name' name='name'></Field>
               
                        {errors.name && <small>{errors.name}</small>}   
                
                </Box>
                <Box>
                <FormLabel>password</FormLabel>
    
                    <Field  type='password' placeholder='password' name='password'></Field>
                    {errors && <small>{errors.password}</small>}
                </Box>
                <Button type='submit'>Submit</Button>
            </Form>
            }
    
        </Formik>
      
        <Heading>{wrongMasseges && 'неверный логин или парольxxx'}</Heading>
        <ForgotPassword/>
    </Box>
  )
}

export default Login