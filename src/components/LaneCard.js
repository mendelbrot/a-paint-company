import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Heading } from '@chakra-ui/react'
import PaintCard from 'components/PaintCard'

function LaneCard(props) {
  const { lane } = props

  return (
    <Box
      border='1px'
      rounded='lg'
      width={{ base: '100%', md: '250px' }}
      shadow='lg'
    >
      <Stack
        p={4}
        spacing='4'
      >
        <Box
          minHeight={{ base: 0, md: '85px' }}
          borderBottom={{ base: 'none', md: '1px' }}
        >
          <Heading size='lg'>{lane.name}</Heading>
        </Box>
        <Stack direction='column' align='front' spacing='4'>
          {lane.paints.map(paint => <PaintCard key={paint._id} paint={paint} />)}
        </Stack>
      </Stack>
    </Box>
    
  )
}

LaneCard.propTypes = {
  lane: PropTypes.object.isRequired,
}

export default LaneCard