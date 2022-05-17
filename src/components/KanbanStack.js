import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack } from '@chakra-ui/react'

const KanbanStack = (props) => (
  <Box>
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align='front'>
      {props.children}
    </Stack>
  </Box>
)


KanbanStack.propTypes = {
  children: PropTypes.node
}

export default KanbanStack