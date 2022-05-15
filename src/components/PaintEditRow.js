import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Heading, Stack, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function PaintEditRow(props) {
  const { paint, handleLineQtyChange } = props
  // const [qty, setQty] = React.useState(paint.qty)

  return (
    <Stack p={2} direction='row' border='1px' rounded='lg'>
      <Heading size='md'>{paint.colour}</Heading>
      <NumberInput
        precision={0}
        min={0}
        value={paint.qty}
        onChange={(value) => handleLineQtyChange(value)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  )
}

PaintEditRow.propTypes = {
  paint: PropTypes.object.isRequired,
  handleLineQtyChange: PropTypes.func.isRequired,
}

export default PaintEditRow