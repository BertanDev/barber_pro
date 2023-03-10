import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import { AuthProvider } from '../contexts/AuthContext'

const styles = {
  global: {
    body: {
      color: 'gray.100'
    },
    a: {
      color: '#fff'
    }
  }
}

const colors = {
  barber: {
    900: '#12131B',
    400: '#1B1C29',
    100: '#C6C6C6'
  },
  button: {
    cta: '#FBA931',
    default: '#FFF',
    gray: '#DFDFDF',
    danger: '#FF4040'
  },
  orange: {
    900: '#FBA931'
  }
}

const theme = extendTheme({ styles, colors })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  ) 
}
