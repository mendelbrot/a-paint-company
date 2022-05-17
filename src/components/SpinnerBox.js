import * as React from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'

const SpinnerBox = () => (
  <Box>
    <Center h='200px'>
      <Spinner size='lg' />
    </Center>
  </Box>
)

export default SpinnerBox