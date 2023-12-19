import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import PhoneSvg from "../../assets/svg/PhoneSvg.jsx";
import { useEffect, useState } from "react";
import SmsSvg from "../../assets/svg/SmsSvg.jsx";
import Loader from "./loader/Loader.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const Verify = ({ setModal, modal }) => {
  const [phoneValue, setPhone] = useState("");

  const [sms, setSms] = useState(false);
  const [send, setSend] = useState(false);
  const [timer, setTimer] = useState(59);
  const refresh = localStorage.getItem("refreshToken");
  const access = localStorage.getItem("accessToken");
  console.log(phoneValue);
  const submit = async () => {
    try {
      const { data } = await axios.put("users/add-phone/", phoneValue, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setSms(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      return setSend(true);
    }
  }, [timer]);

  return (
    <Box>
      <Box
        onClick={() => setModal(false)}
        transition="1s"
        position={modal ? "fixed" : "absolute"}
        top="0"
        bottom="0"
        right="0"
        left="0"
        bg="rgba(19, 19, 19, 0.40)"
        zIndex="1"
        w="100%"
      ></Box>
      <Box
        position="absolute"
        zIndex="99"
        w="565px"
        h={sms ? "407px" : "514px"}
        bg="#FFF"
        rounded="40px"
        padding="44px 16px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Heading
          color="#494949"
          textAlign="center"
          fontSize="24px"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          lineHeight="120%"
        >
          Изменить номер телефона
        </Heading>
        <Box mt="32px ">{sms ? <SmsSvg /> : <PhoneSvg />}</Box>
        <Heading color="#494949" fontFamily="Inter, sans-serif" fontSize="20px">
          {sms ? "Введите код из СМС" : "Введите номер телефона"}
        </Heading>
        <Text
          display={sms ? "none" : "block"}
          mt="12px"
          mb="24px"
          color="#C0C0C0"
          fontFamily="Inter, sans-serif"
          fontSize="16px"
          fontWeight="400"
          lineHeight="120%"
          textAlign="center"
          w="335px"
        >
          Мы отправим вам СМС с кодом подтверждения
        </Text>
        {!sms ? (
          <Input
            onChange={(event) => setPhone(event.target.value)}
            type="text"
            variant="flushed"
            w="233px"
            mb="54px"
            color="#494949"
            fontSize="27px"
            lineHeight="34px"
            letterSpacing="2px"
            placeholder="0(000) 000 000"
            fontFamily="Inter, sans-serif"
          />
        ) : (
          <HStack my={"20px"}>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        )}
        <Button
          onClick={submit}
          display={sms ? "none" : "block"}
          w="335px"
          h="65px"
          bg="#5458EA"
          rounded="16px"
          color="#FFF"
          fontSize="16px"
          fontFamily="Inter, sans-serif"
          _hover={{ bg: "#5458EA" }}
        >
          Далее
        </Button>

        {send ? (
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            color="#5458EA"
            fontFamily="Inter, sans-serif"
            fontSize="17px"
            fontWeight="500"
            letterSpacing="-0.408px"
          >
            Отправить код еще раз
          </Button>
        ) : (
          <Box
            display={sms ? "flex" : "none"}
            flexDirection="column"
            alignItems="center"
          >
            <Text
              color="#C0C0C0"
              fontSize="16px"
              fontFamily="Inter, sans-serif"
            >
              Повторный запрос
            </Text>
            <Box color="#C0C0C0" display="flex" alignItems="center" gap="10px">
              {" "}
              <Loader timer={timer} /> 00:{timer}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Verify;
