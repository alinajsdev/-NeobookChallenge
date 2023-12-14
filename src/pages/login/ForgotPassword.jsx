import { Button, useDisclosure,Modal, ModalOverlay,ModalContent,ModalHeader,Input,ModalCloseButton,ModalBody } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    const [phone,setPhone] = useState('')
    const {access} = useSelector(s => s.accessToken)
    const btnRef = React.useRef(null)

    const submit  = async (e) =>{
        e.preventDefault()
        try{
            const {data} = await axios.post(`users/forgot-password/`,{
                headers: {
                    'Authorization': `Bearer ${access}`
                },
                body: {
                    phone
                }
            })

        }catch(e){

        }
    }
  return (
    
    <>
        <Button mt={3} ref={btnRef} onClick={onOpen}>
        Забыли пароль?
  </Button>

  <Modal
    onClose={onClose}
    finalFocusRef={btnRef}
    isOpen={isOpen}
    scrollBehavior={scrollBehavior}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Введите номер телефона </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       <form onSubmit={submit}>
       <Input onChange={e => setPhone(e.target.value)} type='tel' placeholder='0(000) 000 000' />
       <Button type='submit'>Далее</Button>
       </form>
      </ModalBody>
   
    </ModalContent>
  </Modal>
    </>
  )
}

export default ForgotPassword