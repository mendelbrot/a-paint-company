import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Stack } from '@chakra-ui/react'

function PaintCard(props) {
  const { paint } = props

  return (
    <Stack p={2} border='1px' rounded='lg'>
      <Heading size='md'>{paint.colour}</Heading>
      <Box>{paint.qty}</Box>
    </Stack>
  )
}

PaintCard.propTypes = {
  paint: PropTypes.object.isRequired,
}

export default PaintCard