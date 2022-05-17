import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack } from '@chakra-ui/react'

const ButtonRow = (props) => (
  <Box>
    <Stack direction='row' spacing={4} align='center'>
      {props.children}
    </Stack>
  </Box>
)


ButtonRow.propTypes = {
  children: PropTypes.node
}

export default ButtonRow