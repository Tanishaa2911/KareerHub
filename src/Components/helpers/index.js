import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    brand: {
      blue: '#4164e3',
      cadet: '#8998a8',
      dark: '#2D3748', // Lighter shade of black (gray.800 in Chakra)
      gray: '#a0acb9',
      green: '#36c537',
      light: '#e9ebee',
      pure: '#fafafb',
      slate: '#77889a',
      white: '#fcfdfe',
      yellow: '#ed9b13',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.dark', // Applying the lighter black shade globally
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          p: '6',
          color: 'white',
          bg: 'brand.blue',
          _hover: { bg: 'brand.blue' },
          _active: { bg: 'brand.blue' },
          _focus: { boxShadow: 'none' },
        },
        outline: {
          bg: 'transparent',
          borderWidth: '1px',
          color: 'brand.cadet',
          borderColor: 'brand.light',
          _hover: { bg: 'brand.white' },
          _active: { bg: 'brand.light' },
          _focus: { boxShadow: 'none' },
        },
        ghost: {
          color: 'white',
          bg: 'rgba(0, 0, 0, 0.25)',
          _hover: { bg: 'rgba(0, 0, 0, 0.25)' },
          _active: { bg: 'rgba(0, 0, 0, 0.35)' },
          _focus: { boxShadow: 'none' },
        },
        link: {
          p: '0',
          height: 'full',
          bg: 'transparent',
          color: 'gray.500',
          rounded: 'none',
          _active: { bg: 'brand.light' },
          _focus: { boxShadow: 'none' },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
})
