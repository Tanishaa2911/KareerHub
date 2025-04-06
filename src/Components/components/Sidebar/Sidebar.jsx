import { Box } from '@chakra-ui/react'

import Actions from './Actions'
import Data from './Data'
import NewProfile from './Profile'

function Sidebar() {
  return (
    <Box
      as="aside"
      flex={1}
      mr={{ base: 0, md: 5 }}
      mb={{ base: 5, md: 0 }}
      bg="gray.900" // Dark background to match Content
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.700" // Darker border for contrast
      color="white"
      sx={{ transform: "translateY(-100px)" }}
    >
      <NewProfile />
      <Data />
      <Actions />
    </Box>
  )
}

export default Sidebar;