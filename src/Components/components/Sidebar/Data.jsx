import { Box, Text, VStack } from '@chakra-ui/react'

const list = []

function Data() {
  return (
    <VStack as="ul" spacing={0} listStyleType="none" w="full">
      {list.map(item => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="1px"
          borderColor="gray.200"
        >
          <Text color="white">{item.name}</Text>
          <Text color={item.color} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}

export default Data