import React, { useState } from 'react'
import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'

const Register = () => {
    const [username,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [form, setForm] = useState(false)
    const [wrong, setWrong] = useState(false)
    const navigate = useNavigate()

    const submit = async(e) =>{
        e.preventDefault()
        try{
            const {data} =  await axios.post(`users/check-user/`,{
                username, email
            })

            if(data.username || data.email){
                setWrong(true)
            }else{
                setForm(true)
            }
            
        }catch(e){
            if( e.response.status > 200){
                return e.message
            }
        }
        
    }
    const fetching = async (e) =>{
        e.preventDefault()

        await axios.post(`users/register/`, {
            username, email, password , confirm_password 
        })
        navigate('/login')
    }

  return (
    <Box>
   <Box display={form ? 'none' : 'block'}>
   <form onSubmit={submit} >
        <Heading>Register</Heading>
        <Box>
            <Input onChange={e => setName(e.target.value)} type='text' placeholder='name'/>
            <FormLabel>name</FormLabel>
        </Box>
        <Box>
            <Input onChange={e => setEmail(e.target.value)}  type='email' placeholder='email'/>
            <FormLabel>email</FormLabel>
        </Box>
        <Button type='submit'>Submit</Button>
    </form>
    <Heading>{wrong && 'Данный пользователь уже зарегистрирован'}</Heading>
   </Box>
  <Box display={form ? 'block' : 'none'}>
  <form onSubmit={fetching} >
        <Heading>Register</Heading>
        <Box>
            <Input onChange={(e) => setPassword(e.target.value)} type='text' placeholder='password'/>
            <FormLabel>Password</FormLabel>
        </Box>
        <Box>
            <Input onChange={(e) => setConfirmPassword(e.target.value)}  type='text' placeholder='ConfirmPassword'/>
            <FormLabel>ConfirmPassword</FormLabel>
        </Box>
        <Button type='submit'>Submit</Button>
    </form>
  </Box>

</Box>
  )
}

export default Register