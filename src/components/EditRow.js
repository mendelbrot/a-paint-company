import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Flex,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import DeletePaintDialog from 'components/DeletePaintDialog'

function EditRow(props) {
  const {
    paint,
    handleLineQtyChange,
    refresh,
    qty,
    highlightQty
  } = props

  return (
    <Box maxWidth={600}>
      <Flex
        p={2}
        direction='row'
        border='1px'
        rounded='lg'
        align='center'
      >
        <DeletePaintDialog
          paint={paint}
          refresh={refresh}
        />
        <Heading size='md'>{paint.colour}</Heading>
        <Spacer />
        <NumberInput
          precision={0}
          min={0}
          value={qty}
          onChange={(value) => handleLineQtyChange(value)}
        >
          <NumberInputField
            backgroundColor={highlightQty ? 'lightYellow' : 'white'}
          />
          <NumberInputStepper
            backgroundColor='white'
          >
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </Box>
  )
}

EditRow.propTypes = {
  paint: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  highlightQty: PropTypes.bool.isRequired,
  handleLineQtyChange: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default EditRow