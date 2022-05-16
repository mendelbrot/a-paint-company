import * as React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import PaintEditRow from 'components/PaintEditRow'
import { Box, Button, Stack, Heading } from '@chakra-ui/react'

const {
  REACT_APP_API_URL
} = process.env

function Edit(props) {
  const { loading, error, data } = props
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState(data)

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

  if (formData) {
    return (
      <Box>
        <Box p={4}>
          <Heading size='lg'>Edit Paints Inventory</Heading>
        </Box>
        <Box p={4}>
          <Stack>
            {formData.map((paint, index) =>
              <PaintEditRow
                key={paint._id}
                paint={paint}
                paintIndex={index}
                handleLineQtyChange={handleLineQtyChange(index)}
              />
            )}
          </Stack>
        </Box>
        <Box p={4}>
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='green' variant='solid' onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button colorScheme='green' variant='outline' onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    )
  }
}

Edit.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  data: PropTypes.array
}

export default withData('/paints', Edit)