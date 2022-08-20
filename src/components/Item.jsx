import React from "react";
import {
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  Switch,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Portal,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Item = (props) => {
  const { id, value, status, handleUpdate, handleDelete, handleDone } = props;
  const [edit, setEdit] = React.useState(false);
  const inputRef = React.useRef(null);
  const { onOpen, onClose, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [edit, value]);

  const onUpdate = () => {
    onClose();
    if (edit) {
      handleUpdate({ id, value: inputRef.current.value });
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate();
  };

  return (
    <>
      <Alert variant="left-accent" status={status ? "success" : "info"} my={2}>
        <AlertIcon onClick={() => handleDone(id)} />
        <Box>
          <>
            <AlertDescription>{value}</AlertDescription>
            <Switch
              ml={5}
              id="isChecked"
              isChecked={status}
              onChange={() => handleDone(id)}
            />
            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
              <PopoverTrigger>
                <Button
                  colorScheme="teal"
                  onClick={() => setEdit(true)}
                  size="sm"
                  mx={2}
                >
                  <EditIcon />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Edit task</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <form onSubmit={handleSubmit}>
                      <Input type="text" ref={inputRef} my={2} />
                      <Button
                        type={edit ? "submit" : "button"}
                        onClick={onUpdate}
                        children={"Update"}
                        colorScheme="messenger"
                      />
                    </form>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </>
          <Button
            onClick={() => handleDelete(id)}
            size="sm"
            mx={2}
            colorScheme="red"
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Alert>
    </>
  );
};

export default Item;
