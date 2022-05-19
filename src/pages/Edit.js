import * as React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import EditRow from 'components/EditRow'
import {
  Box,
  Text,
  Button,
  Stack,
  Heading
} from '@chakra-ui/react'
import ButtonRow from 'components/ButtonRow'
import SpinnerBox from 'components/SpinnerBox'
import NewPaintModal from 'components/NewPaintModal'

const {
  REACT_APP_API_URL
} = process.env

function Edit(props) {
  const { error, data, refresh } = props
  const navigate = useNavigate()

  const [changesInProgress, setChangesInProgress] = React.useState({}) 

  function handleSave() {
    fetch(REACT_APP_API_URL + '/paints', {
      method: 'PUT',
      body: JSON.stringify(Object.values(changesInProgress)),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status != 200) {
          window.alert('Error saving data.  Status: ' + response.status)
        }
      })
      .catch(error => {
        window.alert('Error: ' + error?.message)
      })
      .finally(() => { navigate('/') })
  }

  const handleLineQtyChange = R.curry((index, _id, value) => {
    const qty = Number.parseInt(value) || 0
    if (qty === data[index].qty ) { // remove the change in deference to the original data
      console.log('got here')
      setChangesInProgress(R.omit([_id], changesInProgress))
    } else {
      const newChangesInProgress = { [_id]: { _id, qty } }
      setChangesInProgress({
        ...changesInProgress,
        ...newChangesInProgress
      })
    }
    
  })

  // after data refresh, clean changesInProgress of any deleted data
  React.useEffect(() => {
    if (data) {
      const filterFunction = item => {
        return data.some((element) => element._id === item._id)
      }
      const filteredChangesInProgress = R.filter(
        filterFunction,
        changesInProgress
      )
      setChangesInProgress(filteredChangesInProgress)
    }
  }, [data])

  const MainSection = () => {
    if (error) {
      return (
        <Box>
          <Text color='red'>Error Loading data:</Text>
          <Text color='red'>{error}</Text>
        </Box>
      )
    }

    if (data) {
      return (
        <Stack>
          {data.map((paint, index) => (
            <EditRow
              key={paint._id}
              paint={paint}
              qty={changesInProgress[paint._id]?.qty || paint.qty}
              highlightQty={!R.isNil(changesInProgress[paint._id])}
              handleLineQtyChange={handleLineQtyChange(index, paint._id)}
              refresh={refresh}
            />
          ))}
        </Stack>
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
      <Box >
        <Heading size='lg'>Edit Paints Inventory</Heading>
      </Box>
      <Box paddingTop={4}>
        <ButtonRow>
          <NewPaintModal
            data={data}
            refresh={refresh}
          />
        </ButtonRow>
      </Box>
      <Box paddingTop={4}>
        <MainSection />
      </Box>
      <Box paddingTop={4}>
        <ButtonRow>
          <Button
            colorScheme='green'
            variant='solid'
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            colorScheme='green'
            variant='outline'
            onClick={handleSave}
            isDisabled={R.isEmpty(changesInProgress)}
          >
            Save
          </Button>
        </ButtonRow>
      </Box>
    </Box>
  )
}

Edit.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.array,
  refresh: PropTypes.func
}

export default withData('/paints', Edit)