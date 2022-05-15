import * as React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import withData from 'components/withData'
import PaintEditRow from 'components/PaintEditRow'
import { Box, Button, Stack, Heading } from '@chakra-ui/react'

function Edit(props) {
  const { loading, error, data } = props
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState(data)

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
            <Button colorScheme='teal' variant='solid' onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button colorScheme='teal' variant='outline' onClick={() => navigate('/')}>
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