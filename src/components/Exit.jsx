import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import LogoutSvg from '../assets/svg/LogoutSvg'

const Exit = ({modal, setModal}) => {
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
        w="391px"
        h='392px'
        bg="#FFF"
        rounded="40px"
        padding="44px "
        display="flex"
        alignItems="center"
        flexDirection="column"
   >
        <Box>
        <LogoutSvg/>
        </Box>
        <Text color='#292929' fontSize='18px' lineHeight='120%' fontFamily='Inter, sans-serif' w='303px ' mt='14px' fontWeight='600'  textAlign='center' >Вы действительно хотите выйти с приложения?</Text>
        <Button w='280px' h='44px' background='#5D5FEF' _hover={{background: "#5D5FEF"}} rounded='16px' fontSize='16px'  fontFamily='Inter, sans-serif' mt='24px' color='#fff' mb='10px'>Выйти</Button>
        <Button   background='transparent' _hover={{background: "transparent"}} fontSize='16px'  fontFamily='Inter, sans-serif'  color='#494949'>Отмена</Button>
   </Box>
  </Box>
  )
}

export default Exit