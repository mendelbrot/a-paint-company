import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Flex,
  Spacer,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function EditRow(props) {
  const { paint, handleLineQtyChange } = props

  return (
    <Box maxWidth={600}>
      <Flex
        p={2}
        direction='row'
        border='1px'
        rounded='lg'
        align='center'
      >
        <IconButton
          size='xs'
          colorScheme='red'
          onClick={() => {}}
          aria-label='Refresh'
          icon={<DeleteIcon />}
          marginRight={4}
        />
        <Heading size='md'>{paint.colour}</Heading>
        <Spacer />
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
      </Flex>
    </Box>
  )
}

EditRow.propTypes = {
  paint: PropTypes.object.isRequired,
  handleLineQtyChange: PropTypes.func.isRequired,
}

export default EditRow