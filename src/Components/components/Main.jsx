import { Container } from '@chakra-ui/react' // Simplified import
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'

export default function Main() {
  return (
    <Container 
      maxW="container.xl"
      display="flex"
      flexDir={{ base: 'column', md: 'row' }} // More explicit
      gap={5} // Added spacing between Sidebar & Content
    >
      <Sidebar />
      <Content />
    </Container>
  )
}
