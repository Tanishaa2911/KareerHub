import { useEffect, useRef } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  VStack,
} from '@chakra-ui/react'

export default function Actions() {
  const value = 'https://apple.com/cook'
  const { hasCopied, onCopy } = useClipboard(value)

  const profileUrl = useRef(null)

  useEffect(() => {
    if (hasCopied && profileUrl.current) {
      profileUrl.current.focus()
      profileUrl.current.select()
    }
  }, [hasCopied]) // Ensures proper clipboard behavior

  return (
    <VStack py={8} px={5} spacing={3}>
      <Button w="full" variant="outline">
        View Public Profile
      </Button>
      <InputGroup>
        <Input
          ref={profileUrl}
          type="url"
          value={value}
          isReadOnly
          focusBorderColor="blue.500"
        />
        <InputRightElement>
          <Button onClick={onCopy} variant="ghost">
            <svg width="1.2em" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}
