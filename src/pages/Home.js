import * as React from 'react'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import { Box, IconButton, Text, Button } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import LaneCard from 'components/LaneCard'
import ButtonRow from 'components/ButtonRow'
import KanbanStack from 'components/KanbanStack'
import SpinnerBox from 'components/SpinnerBox'

function Home(props) {
  const { error, data, refresh } = props
  const navigate = useNavigate()

  const MainSection = () => {
    if (error) {
      return (
        <Box>
          <Text color='red'>Error Loading data</Text>
          <Text color='red'>{error}</Text>
        </Box>
      )
    }

    if (data) {
      return (
        <KanbanStack>
          {data.map(lane => <LaneCard key={lane.name} lane={lane} />)}
        </KanbanStack>
      )
    }

    return (
      <Box>
        <SpinnerBox />
      </Box>
    )
  }

  return (
    <Box p={4}>
      <ButtonRow>
        <IconButton
          colorScheme='green'
          onClick={refresh}
          aria-label='Refresh'
          icon={<RepeatIcon />}
        />
        <Button
          colorScheme='teal'
          variant='outline'
          isDisabled={!data}
          onClick={() => navigate('/edit')}
        >
          Edit Inventory
        </Button>
      </ButtonRow>
      <Box paddingTop={4}>
        <MainSection />
      </Box>
    </Box>
  )
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.array,
  refresh: PropTypes.func.isRequired
}

export default withData('/lanes', Home)