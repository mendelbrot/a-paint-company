import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import { Box, Button, Stack } from '@chakra-ui/react'
import LaneCard from 'components/LaneCard'

function Home(props) {
  const { loading, error, data, refresh } = props
  const navigate = useNavigate()

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>{error}</div>
    )
  }

  if (data) {
    return (
      <Box>
        <Box>
          <Box p={4} border='1px'>
            <Stack direction='row' spacing={4} align='center'>
              <Button colorScheme='teal' variant='solid' onClick={refresh}>
                Refresh
              </Button>
              <Button colorScheme='teal' variant='outline' onClick={() => navigate('/edit')}>
                Edit Inventory
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box p={4} border='1px'>
          <Stack direction={{ base: 'column', sm:'row'}} spacing={4} align='front'>
            {data.map(lane => <LaneCard key={lane._id} lane={lane} />)}
          </Stack>
        </Box>
      </Box>
    )
  }

  return (
    <Link to="/edit">Test</Link>

    
  )
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.object,
  refresh: PropTypes.func.isRequired
}

export default withData('/lanes', Home)