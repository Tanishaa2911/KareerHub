import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './helpers/index'
import Cover from './components/Cover'
import Main from './components/Main'


const Profile = () => {
  return (
    <ChakraProvider theme={theme}>
      
            <Cover />
            <Main />
          
    </ChakraProvider>
  )
}

export default Profile
