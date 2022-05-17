import * as React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import EditRow from 'components/EditRow'
import { Box, Text, Button, Stack, Heading } from '@chakra-ui/react'
import ButtonRow from 'components/ButtonRow'
import SpinnerBox from 'components/SpinnerBox'

const {
  REACT_APP_API_URL
} = process.env

function Edit(props) {
  const { error, data } = props
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState(data)

  const MainSection = () => {
    if (error) {
      return (
        <Box>
          <Text color='red'>Error Loading data</Text>
          <Text color='red'>{error}</Text>
        </Box>
      )
    }

    if (formData) {
      return (
        <Stack>
          {formData.map((paint, index) =>
            <EditRow
              key={paint._id}
              paint={paint}
              paintIndex={index}
              handleLineQtyChange={handleLineQtyChange(index)}
            />
          )}
        </Stack>
      )
    }

    return (
      <Box>
        <SpinnerBox />
      </Box>
    )
  }

  function handleSave() {
    fetch(REACT_APP_API_URL + '/paints', {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status != 200) {
          window.alert('Error saving data.  Status: ' + response.status)
        } else {
          navigate('/')
        }
      }).catch(error => {
        window.alert('Error ' + error?.message)
      })
  }

  const handleLineQtyChange = R.curry((index, value) => {
    console.log(value, index)
    let newData = [...data]
    newData[index].qty = Number.parseInt(value) || 0
    setFormData(newData)
  })

  React.useEffect(() => {
    setFormData(data)
  }, [data])


  return (
    <Box p={4}>
      <Box >
        <Heading size='lg'>Edit Paints Inventory</Heading>
      </Box>
      <Box paddingTop={4}>
        <ButtonRow>
          <Button colorScheme='green' variant='solid' onClick={() => navigate('/')}>
            + More Colours
          </Button>
        </ButtonRow>
      </Box>
      <Box paddingTop={4}>
        <MainSection />
      </Box>
      <Box paddingTop={4}>
        <ButtonRow>
          <Button colorScheme='green' variant='solid' onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button colorScheme='green' variant='outline' onClick={handleSave}>
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
  data: PropTypes.array
}

export default withData('/paints', Edit)