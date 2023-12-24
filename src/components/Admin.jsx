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
import {  useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "sonner";

import { getUserData } from "../store/reducers/userData";
import { getUserUpdate } from "../store/reducers/isUpdate";


const Admin = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const { userData } = useSelector((s) => s.userData);
  const [first_name, setName] = useState("");
  const [last_name, setLastNmae] = useState("");
  const [username, setUsername] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const access = localStorage.getItem("accessToken");
  const closeBtn = localStorage.getItem('closeBtn')
  const isEditing = JSON.parse(localStorage.getItem('isEditing'));
  const dispatch = useDispatch()
  const [buttonClicked, setButtonClicked] = useState(false);
  const [changeBtn, setChangeBtn] =useState (false)

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
  useEffect(() => {
    // Ваш код для обработки эффекта
    if (buttonClicked) {
      (
        async () => {
          try {
            const {data} = await axios.get("users/me", {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            });
         
            dispatch(getUserData(data))
          } catch (error) {
        
          }
        }
       )()
    }
    // Сбрасываем флаг после обработки
    setButtonClicked(false);
  }, [buttonClicked]);


  const fetchUpdate = async () => {
    try {
       await axios.put(
        "users/profile/update/",
        {
          first_name: first_name,
          last_name: last_name,
          username: username,
          // birth_date: birth_date,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
    
      localStorage.setItem('isEditing', JSON.stringify(false))
      localStorage.setItem('isAuth', JSON.stringify(true))
      showToastSuccess()

    dispatch(getUserUpdate(true))
    setButtonClicked(true);
    setChangeBtn(!changeBtn)
        
    } catch (error) {
      console.log(error);
      if (error.response.data?.error?.email && error.response.status >= 400) {

        return showToastMessage();
        
      }else if( error.response.data?.error?.username && error.response.status >= 400) {
        return showToastUsername()
      }
    }
  };
  
  const submit = (e) => {
    e.preventDefault();

    isEditing && fetchUpdate();
  };

  const showToastMessage = () => {
    toast.error("user with this email already exists.", {
      position: "top-right",
    });
  };

  const showToastUsername = () => {
    toast.error("user with this username already exists.", {
      position: "top-right",
    });
  };
  const showToastSuccess = () => {
    toast.success("Данные успешно изменены.", {
      position: "top-right",
    });
  };
  return (
    <Box>
      <Container maxW="636px">
      <Toaster richColors />
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
                defaultValue={first_name}
                type="text"
                placeholder="Имя"
                variant="flushed"
              />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                {userData?.first_name ? userData?.first_name  : 'имя'}
              </Heading>
            )}
            {isEditing ? (
              <Input
                required
                onChange={(e) => setLastNmae(e.target.value)}
                defaultValue={last_name}
                type="text"
                placeholder="Фамилия"
                variant="flushed"
              />
            ) : (
              <Heading fontSize={"16px"} color={"#494949"} p={"10px 0"}>
                {userData?.last_name ? userData?.last_name : "Фамилия"}
              </Heading>
            )}
            {isEditing ? (
              <Input
                required
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={username}
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
              <Input
                onChange={(e) => setBirthDate(e.target.value)}
                defaultValue={birth_date}
                variant="Unstyled"
                padding="0"
                size="md"
                type="date"
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
              
                letterSpacing="-0.408px"
              >
                {userData?.phone}
              </Text>
            </Box>
            {isEditing ? (
              <Input
                required
                defaultValue={email}
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
            
                letterSpacing="-0.408px"
                fontWeight="600"
              >
                {userData?.email}
              </Heading>
            )}
          </Box>
          <Box display={changeBtn ? 'none' : "block"}>
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
       Готово
          </Button>
          </Box>
          <Button
            onClick={()=> {
              localStorage.setItem('isEditing', JSON.stringify(true))
              setChangeBtn(!changeBtn)
            }}
            display={changeBtn ? "block" : "none"}
            pos={"absolute"}
            top={"12px"}
            right={"95px"}
            borderRadius={"50px"}
            bg={"rgba(192, 192, 192, 0.20)"}
            h={"28px"}
            fontFamily={"Inter,sans-serif"}
          >
       изм
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
          
        />
      </Box>
    </Box>
  );
};

export default Admin;
