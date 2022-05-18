import * as React from 'react'
import PropTypes from 'prop-types'
import { Text, Heading, Stack } from '@chakra-ui/react'

function PaintCard(props) {
  const { paint } = props

  return (
    <Stack
      p={2}
      border='1px'
      rounded='lg'
      backgroundColor='aliceBlue'
    >
      <Heading size='md'>{paint.colour}</Heading>
      <Text>{paint.qty}</Text>
    </Stack>
  )
}

PaintCard.propTypes = {
  paint: PropTypes.object.isRequired,
}

export default PaintCard