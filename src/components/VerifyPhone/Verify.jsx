import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import PhoneSvg from "../../assets/svg/PhoneSvg.jsx";
import { useEffect, useState } from "react";
import SmsSvg from "../../assets/svg/SmsSvg.jsx";
import Loader from "./loader/Loader.jsx";
import axios from "axios";
import InputMask from "react-input-mask";

const Verify = ({ setModal, modal , setIsEditing, setCloseBtn}) => {
  const [sms, setSms] = useState(false);
  const [send, setSend] = useState(false);
  const [timer, setTimer] = useState(59);
  const [errorPhone, setErrorPhone] = useState(false);
  const [code, setCode] = useState(false);

  // оброботка phoneValue

  const access = localStorage.getItem("accessToken");

  const [phoneValue, setPhone] = useState("");
  const cleanedPhoneValue = phoneValue.replace(/[\s()]/g, "");
  const submit = async () => {
    try {
      const { data } = await axios.put(
        "users/add-phone/",
        { phone: cleanedPhoneValue },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(data, "verify");
      setSms(true);
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        return setErrorPhone(true);
      }
    }
  };

  // оброботка pin
  const [pin, setPin] = useState(["", "", "", ""]);

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Проверка, является ли текущее поле последним
    if (index === newPin.length - 1 && value !== "") {
      const pinValue = newPin.join("");
      sendPinToBackend(pinValue);
    }
  };

  const sendPinToBackend = (pinValue) => {
    axios
      .post(
        "users/verify-phone/",
        { code: pinValue },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((response) => {
        setModal(false);
        setIsEditing(true)
        setCloseBtn(true)
      })

      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          return setCode(true);
        }
      });
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
        {/* first form  */}
        <Box
          display={sms ? "none" : "flex"}
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
            Введите номер телефона
          </Heading>
          <Box mt="32px ">{<PhoneSvg />}</Box>
          <Heading
            color="#494949"
            fontFamily="Inter, sans-serif"
            fontSize="20px"
          >
            Введите номер телефона
          </Heading>
          <Text
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
          <Flex flexDirection={"column"} textAlign={"start"}>
            <InputMask
              mask="0(999) 999 999"
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              variant="flushed"
              w="233px"
              mb="54px"
              color="#494949"
              fontSize="32px" // Увеличиваем размер шрифта
              lineHeight="34px"
              letterSpacing="2px"
              placeholder="номер"
              placeholderTextColor="#A0A0A0" // Цвет placeholder'а
              fontFamily="Inter, sans-serif"
            />
            {errorPhone && (
              <small
                style={{
                  color: "red",
                  marginBottom: "10px",
                  textAlign: "start",
                }}
              >
                Данный номер уже зарегистрирован
              </small>
            )}
          </Flex>

          <Button
            onClick={submit}
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
        </Box>

        {/* second form  */}
        <Box
          display={sms ? "flex" : "none"}
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
          <Box mt="32px ">{<SmsSvg />}</Box>
          <Heading
            color="#494949"
            fontFamily="Inter, sans-serif"
            fontSize="20px"
          >
            Введите код из СМС
          </Heading>
          <HStack my={"20px"}>
            <PinInput>
              {pin.map((value, index) => (
                <PinInputField
                  key={index}
                  value={value}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                />
              ))}
            </PinInput>
          </HStack>
          {code && (
            <small
              style={{ color: "red", marginBottom: "10px", textAlign: "start" }}
            >
              Неверный код
            </small>
          )}
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
              <Box
                color="#C0C0C0"
                display="flex"
                alignItems="center"
                gap="10px"
              >
                {" "}
                <Loader timer={timer} /> 00:{timer}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Verify;
