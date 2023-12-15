import { Box, Heading, Image } from "@chakra-ui/react";
import BgImage from "../assets/images/authbg.jpg";
import shopping from "../assets/images/shopping.png";
import React from "react";

const AuthBg = () => {
  return (
    <>
    <Box
      background="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
      w="720px"
      h="1024px"
      position="absolute"
      zIndex={"3"}
    ></Box>
    <Image src={BgImage} h="1024px" w="720px" />
    <Box position="absolute" zIndex="88" top="343px" left="245px">
      <Image src={shopping} w="200px" h="200px" />
      <Heading className="auth-fonts" color='#000' fontWeight='800' fontSize='32px' mt='14px' >MOBI MARKET</Heading>
    </Box>
  </>
  )
}

export default AuthBg