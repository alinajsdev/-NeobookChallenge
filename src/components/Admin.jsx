import {
  Box,
  Container,
  Heading,
  Image,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import photoDefault from "../assets/images/user.png";
import Verify from "./VerifyPhone/Verify";
import Exit from "../assets/images/arrowLeft.png";
import { useSelector } from "react-redux";
import axios from "axios";

const Admin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const { isAuth } = useSelector((s) => s.isAuth);
  const { userData } = useSelector((s) => s.userData);
  const [first_name, setName] = useState("");
  const [last_name, setLastNmae] = useState("");
  const [username, setUsername] = useState("");
  const [birth_date, setBirthDate] = useState("");

  const [email, setEmail] = useState("");
  const [closeBtn, setCloseBtn] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBirthDate(value);
  };

  const formatInput = () => {
    // Проверяем, что введено достаточно символов для формата YYYY.MM.DD
    if (birth_date.length === 4) {
      setBirthDate(birth_date + ".");
    } else if (birth_date.length === 7) {
      setBirthDate(birth_date + ".");
    }
  };


  const handleImageClick = () => {
    inputRef?.current?.click();
  };

  const handleImageChange = (event) => {
    const selectedImage = event?.target?.files[0];
    setImage(selectedImage);

    // Save the selected image URL to local storage
    const imageURL = URL?.createObjectURL(selectedImage);
    localStorage.setItem("selectedImageURL", imageURL);
  };

  // Retrieve the saved image URL from local storage on component mount
  useEffect(() => {
    const imageURL = localStorage.getItem("selectedImageURL");
    if (imageURL) {
      setImage(imageURL);
    }
  }, []);

  const [modal, setModal] = useState(false);
  console.log(userData);
  const access = localStorage.getItem("accessToken");
  const fetchUpdate = async () => {
    try {
      const res = await axios.put(
        "users/profile/update/",
        {
          first_name: first_name,
          last_name: last_name,
          username: username,
          birth_date: birth_date,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    isEditing && fetchUpdate();
  };
  return (
    <Box>
      <Container maxW="636px">
        <Box display="flex" alignItems="center" mt="15px" gap="175px">
          <Link to={"/"}>
            <Box display="flex" gap="6px" alignItems="center" cursor="pointer">
              <Box
                w="44px"
                h="28px"
                bg="rgba(192, 192, 192, 0.20)"
                rounded="50px"
                pl={"10px"}
              >
                <Image src={Exit} alt="exit" />
              </Box>
              <Heading
                fontFamily="Inter, sans-serif"
                fontSize="16px"
                color="#000000"
              >
                Назад
              </Heading>
            </Box>
          </Link>
          <Heading
            top="29px"
            right="340px"
            color="#494949"
            fontFamily="Inter, sans-serif"
            fontSize="18px"
          >
            Профиль
          </Heading>
        </Box>

        <Box
          style={{ opacity: isAuth === false ? "0.5" : "1" }}
          onClick={handleImageClick}
          cursor="pointer"
          mt="138px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {image ? (
            <Image src={image} w="80px" h="80px" rounded="50%" />
          ) : (
            <Image src={photoDefault} w="80px" h="80px" />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            ref={inputRef}
            style={{ display: "none" }}
          />
          <Button
            color="blue"
            background="transparent"
            _hover={{ background: "transparent" }}
          >
            Выбрать фотографию
          </Button>
        </Box>
        <form onSubmit={submit}>
          <Box w="652px" bg="#FFF" rounded="12px" mt="32px" p="6px 16px ">
            {isEditing ? (
              <Input
                required
                onChange={(e) => setName(e.target.value)}
                value={first_name}
                type="text"
                placeholder="Имя"
                variant="flushed"
              />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                name
              </Heading>
            )}
            {isEditing ? (
              <Input
                required
                onChange={(e) => setLastNmae(e.target.value)}
                value={last_name}
                type="text"
                placeholder="Фамилия"
                variant="flushed"
              />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                Last Name
              </Heading>
            )}
            {isEditing ? (
              <Input
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="username"
                variant="flushed"
              />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                {userData?.username}
              </Heading>
            )}
            {isEditing ? (
            <input
            type="text"
            placeholder="YYYY.MM.DD"
            value={birth_date}
            onChange={handleInputChange}
            onBlur={formatInput}  // Форматируем при потере фокуса
          />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                15.11.2005
              </Heading>
            )}
          </Box>
          <Box w="652px" bg="#FFF" rounded="12px" mt="12px" p="6px 16px ">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                onClick={() => !isEditing && setModal(true)}
                transition="1s"
                bg="transparent"
                _hover={{ background: "transparent" }}
                color="#5458EA"
                fontSize="16px"
                lineHeight="24px"
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.408px"
                p="0"
              >
                Добавить номер
              </Button>

              <Text
                color="#C0C0C0"
                fontFamily="Inter, sans-serif"
                fontSize="16px"
                lineHeight="24px"
                letterSpacing="-0.408px"
              >
                0(000) 000 000
              </Text>
            </Box>
            {isEditing ? (
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                variant="Unstyled"
                padding="0"
              />
            ) : (
              <Heading
                mt="6px"
                color="#000"
                fontFamily="Inter, sans-serif"
                fontSize="16px"
                lineHeight="24px"
                letterSpacing="-0.408px"
                fontWeight="600"
              >
                {userData?.email}
              </Heading>
            )}
          </Box>
          <Button
            type="submit"
            display={closeBtn ? "block" : "none"}
            pos={"absolute"}
            top={"12px"}
            right={"95px"}
            borderRadius={"50px"}
            bg={"rgba(192, 192, 192, 0.20)"}
            h={"28px"}
            fontFamily={"Inter,sans-serif"}
          >
            {isEditing ? " Готово" : "Изм"}
          </Button>
        </form>
        <Button
          onClick={() => setModal(true)}
          display={closeBtn ? "none" : "block"}
          ml={"28%"}
          fontSize={"16px"}
          fontFamily={"Inter, sans-serif"}
          fontWeight={"700"}
          color={"#fff"}
          mt={"50px"}
          padding={"10px"}
          w={"335px"}
          h={"44px"}
          borderRadius={"80px"}
          bg={"#5458EA"}
          _hover={{ bg: "#5458EA" }}
        >
          Закончить регистрацию
        </Button>
      </Container>
      <Box
        position="absolute"
        top={modal ? "31%" : "-800px"}
        zIndex="99"
        left="30%"
        transition="1s"
      >
        <Verify
          setModal={setModal}
          modal={modal}
          setIsEditing={setIsEditing}
          setCloseBtn={setCloseBtn}
        />
      </Box>
    </Box>
  );
};

export default Admin;
