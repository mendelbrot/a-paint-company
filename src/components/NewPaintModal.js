import * as React from 'react'
import PropTypes from 'prop-types'
import {
  useNavigate
} from 'react-router-dom'
import {
  Box,
  Button,
  Stack,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import ButtonRow from 'components/ButtonRow'

const {
  REACT_APP_API_URL
} = process.env

function NewPaintModal(props) {
  const { formData } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [paint, setPaint] = React.useState({ qty: 0, colour: '' })
  
  const nameTakenError = formData && formData.map((p) => p.colour).includes(paint.colour)
  const disableSave = !formData || nameTakenError || paint.colour === ''

  function clearEntry() {
    setPaint({ qty: 0, colour: '' })
  }

  function handleCancel() {
    clearEntry()
    onClose()
  }

  function handleSave() {
    console.log(paint)
    fetch(REACT_APP_API_URL + '/paints', {
      method: 'POST',
      body: JSON.stringify([paint]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        window.alert(JSON.stringify(paint))
        if (response.status != 200) {
          window.alert('Error saving data.  Status: ' + response.status)
        }
      })
      .catch(error => {
        window.alert('Error saving data: ' + error?.message)
      })
      .finally(() => {
        onClose()
        navigate('/edit')
      })
  }

  const handleColourChange = (event) => {
    let newPaint = { ...paint, colour: event.target.value }
    setPaint(newPaint)
  }

  const handleQtyChange = (value) => {
    let newPaint = { ...paint, qty: Number.parseInt(value) || 0 }
    setPaint(newPaint)
  }

  return (
    <Box>
      <IconButton
        icon={<AddIcon />}
        colorScheme='green'
        variant='outline'
        onClick={onOpen}
        isDisabled={!formData}
      />
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Paint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <FormControl id='colour' isInvalid={nameTakenError}>
                  <FormLabel htmlFor='colour'>Colour</FormLabel>
                  <Input
                    id='colour'
                    type='text'
                    value={paint.colour}
                    onChange={handleColourChange}
                  />
                  {nameTakenError && (
                    <FormErrorMessage>This name is already used</FormErrorMessage>
                  )}
                </FormControl>
              </Box>
              <Spacer />
              <Box>
                <FormLabel htmlFor='qty'>Quantity</FormLabel>
                <NumberInput
                  precision={0}
                  min={0}
                  value={paint.qty}
                  onChange={handleQtyChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonRow>
              <Button
                colorScheme='green'
                variant='solid'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                colorScheme='green'
                variant='outline'
                onClick={handleSave}
                isDisabled={disableSave}
              >
                Save
              </Button>
            </ButtonRow>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

NewPaintModal.propTypes = {
  formData: PropTypes.array
}

export default NewPaintModal