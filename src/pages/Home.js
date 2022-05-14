import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import withData from 'components/withData'
import { Button, Stack } from '@chakra-ui/react'

function Home(props) {

  const { loading, error, data, refresh } = props

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
      <div>
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='solid' onClick={refresh}>
            Refresh
          </Button>
          <Button colorScheme='teal' variant='outline'>
            Button
          </Button>
          <Button colorScheme='teal' variant='ghost'>
            Button
          </Button>
          <Button colorScheme='teal' variant='link'>
            Button
          </Button>
        </Stack>
        {data[0].colour}
      </div>
    )
  }

  return (
    <Link to="/test">Test</Link>

    
  )
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.object,
  refresh: PropTypes.func.isRequired
}

export default withData('/paints', Home)