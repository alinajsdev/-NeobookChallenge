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
import Exit from '../assets/images/arrowLeft.png'


const Admin = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef?.current?.click();
  };

  const handleImageChange = (event) => {
    const selectedImage = event?.target?.files[0];
    setImage(selectedImage);
    console.log(selectedImage);

    // Save the selected image URL to local storage
    const imageURL = URL?.createObjectURL(selectedImage);
    localStorage.setItem("selectedImageURL", imageURL);
    console.log(imageURL, "imageURL");
  };

  // Retrieve the saved image URL from local storage on component mount
  useEffect(() => {
    const imageURL = localStorage.getItem("selectedImageURL");
    if (imageURL) {
      setImage(imageURL);
    }
  }, []);

  const [modal, setModal] = useState(false);

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
                pl={'10px'}
              >
                <Image src={Exit} alt="exit"/>
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

        <Box w="652px" bg="#FFF" rounded="12px" mt="32px" p="6px 16px ">
          <Input type="text" placeholder="Имя" variant="flushed" />
          <Input type="text" placeholder="Фамилия" variant="flushed" />
          <Input
            type="text"
            placeholder="Дата рождения"
            variant="Unstyled"
            padding="0"
          />
        </Box>
        <Box w="652px" bg="#FFF" rounded="12px" mt="12px" p="6px 16px ">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              onClick={() => setModal(true)}
              transition='1s'
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
          <Heading
            mt="6px"
            color="#000"
            fontFamily="Inter, sans-serif"
            fontSize="16px"
            lineHeight="24px"
            letterSpacing="-0.408px"
            fontWeight="600"
          >
            nikitina.alesya@gmail.
          </Heading>
        </Box>
        <Button ml={'28%'} fontSize={'16px'} fontFamily={'Inter, sans-serif'} fontWeight={'700'} color={'#fff'} mt={'50px'} padding={'10px'} w={'335px'} h={'44px'} borderRadius={'80px'} bg={'#5458EA'} _hover={{bg: "#5458EA"}}>Закончить регистрацию</Button>
      </Container>
      <Box
        position="absolute"
        top={modal ? "31%" : "-800px"}
        zIndex="99"
        left='30%'
        transition="1s"
      >
        <Verify setModal={setModal} modal={modal} />
      </Box>
    </Box>
  );
};

export default Admin;