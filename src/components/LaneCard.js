import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack } from '@chakra-ui/react'
import PaintCard from 'components/PaintCard'

function LaneCard(props) {
  const { lane } = props

  return (
    <Box p={4} border='1px' rounded='lg'>
      <Box>
        {lane.name}
      </Box>
      <Stack direction='column' spacing={4} align='front'>
        {lane.paints.map(paint => <PaintCard key={paint._id} paint={paint} />)}
      </Stack>
    </Box>
  )
}

LaneCard.propTypes = {
  lane: PropTypes.object.isRequired,
}

export default LaneCard