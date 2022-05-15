import * as React from 'react'
import PropTypes from 'prop-types'
import { Stack, Heading } from '@chakra-ui/react'
import PaintCard from 'components/PaintCard'

function LaneCard(props) {
  const { lane } = props

  return (
    <Stack p={4} spacing='4' border='1px' rounded='lg'>
      <Heading size='lg'>{lane.name}</Heading>
      <Stack direction='column' align='front' spacing='4'>
        {lane.paints.map(paint => <PaintCard key={paint._id} paint={paint} />)}
      </Stack>
    </Stack>
  )
}

LaneCard.propTypes = {
  lane: PropTypes.object.isRequired,
}

export default LaneCard