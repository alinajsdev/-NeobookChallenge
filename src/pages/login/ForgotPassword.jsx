import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [phone, setPhone] = useState("");
  const btnRef = React.useRef(null);
  const access = localStorage.getItem('accessToken')
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`users/forgot-password/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: {
          phone,
        },
      });
    } catch (e) {}
  };
  return (
    <>
      <Button bg={'transparent'} _hover={{bg :"transparent"}} w={'107px'} fontWeight={'500'} color={'#5458EA'} fontSize={'14px'} fontFamily={'Inter, sans-serif'}  m='10px  0 50px 0' mt={3} ref={btnRef} onClick={onOpen}>
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
              <Input
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="0(000) 000 000"
              />
              <Button type="submit">Далее</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassword;
