import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import ButtonRow from 'components/ButtonRow'

const {
  REACT_APP_API_URL
} = process.env

function DeletePaintDialog(props) {
  const { paint, refresh } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleDelete() {
    fetch(REACT_APP_API_URL + '/paints/' + paint._id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.status != 200) {
          window.alert('Error deleting.  Status: ' + response.status)
        }
      })
      .catch(error => {
        window.alert('Error deleting: ' + error?.message)
      })
      .finally(() => {
        onClose()
        refresh()
      })
  }

  return (
    <Box>
      <IconButton
        size='xs'
        colorScheme='red'
        onClick={onOpen}
        aria-label='Refresh'
        icon={<DeleteIcon />}
        marginRight={4}
      />
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Paint</AlertDialogHeader>
          <AlertDialogBody>
            <Text>Are you sure you want to delete <b>{paint.colour}</b>?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonRow>
              <Button
                colorScheme='green'
                variant='solid'
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                variant='outline'
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonRow>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  )
}

DeletePaintDialog.propTypes = {
  paint: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
}

export default DeletePaintDialog