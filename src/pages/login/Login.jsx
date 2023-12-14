import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAccess } from '../../store/reducers/access'

const Login = () => {
    const navigate = useNavigate()
    const [username,setName] = useState('')
    const [password,setPassword] = useState('')
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const dispatch = useDispatch()



    const submit = async e => {
        e.preventDefault()
       const res =  await axios.post(`users/login/`,{
        username, password
        })
        setAccessToken(res.data.access);
        setRefreshToken(res.data.refresh);
        localStorage.setItem('refreshToken', res.data.refresh);
        dispatch(getAccess(res.data.access))
  
       navigate('/')
    }
    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const refreshResponse = await axios.post('users/login/refresh/', {
                    refresh: refreshToken
                });
    
                // Обновляем access token в состоянии компонента
                setAccessToken(refreshResponse.data.access);
            } catch (refreshError) {
                // Обработка ошибок при обновлении токена
                console.error(refreshError);
            }
        };
    
        if (accessToken) {
            // Проверяем срок действия access token
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000; // в секундах
    
            if (decodedToken.exp < currentTime) {
                // Если access token истек, обновляем его
                refreshAccessToken();
            }
        }
    }, [accessToken, refreshToken]);
  
  return (
    <Box>
        <form onSubmit={submit}>
            <Heading>login</Heading>
            <Box>
                <Input onChange={e => setName(e.target.value)} type='text' placeholder='name'/>
                <FormLabel>name</FormLabel>
            </Box>
            <Box>
                <Input onChange={e => setPassword(e.target.value)} type='password' placeholder='password'/>
                <FormLabel>password</FormLabel>
            </Box>
            <Button type='submit'>Submit</Button>
        </form>
    </Box>
  )
}

export default Login