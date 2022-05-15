import * as React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

function PaintCard(props) {
  const { paint } = props

  return (
    <Box p={4} border='1px' rounded='lg'>
      <Box>{paint.colour}</Box>
      <Box>{paint.qty}</Box>
    </Box>
  )
}

PaintCard.propTypes = {
  paint: PropTypes.object.isRequired,
}

export default PaintCard