import React from "react";
import List from "./List";
import { useToast } from "@chakra-ui/react";

import {
  Input,
  Button,
  Box,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
let id = 1;

const TodoApp = () => {
  const [todos, setTodos] = React.useState([]);
  const [todosResult, setTodoResut] = React.useState([]);
  const value = React.useRef(null);
  const keySearch = React.useRef(null);
  const toast = useToast();

  React.useEffect(() => {
    if (keySearch.current) {
      const newTodos = todos.filter((item) =>
        item.value.includes(keySearch.current)
      );
      setTodoResut(newTodos);
    }
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.current.trim()) return;

    const newTodos = [
      {
        id: ++id,
        value: value.current,
        status: false,
      },
      ...todos,
    ];
    setTodos(newTodos);
    value.current = "";
    event.target.reset();
    customToast(
      "Task created successfully",
      "We've created task for you",
      "success"
    );
  };

  const customToast = (title, description, status, duration = 2000) => {
    toast({
      title,
      description,
      status,
      duration,
      position: "top-right",
      isClosable: true,
    });
  };

  const handleChange = (event) => {
    value.current = event.target.value;
  };

  const handleReset = () => {
    value.current = "";
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!keySearch.current.trim()) {
      handleResetSearch();
      return;
    }

    const newTodos = todos.filter((item) =>
      item.value.includes(keySearch.current)
    );

    setTodoResut(newTodos);
    customToast(
      "Notify",
      `There are ${newTodos.length} search results for the keyword "${keySearch.current}"`,
      "success",
      5000
    );
  };

  const handleChangeSeach = (event) => {
    keySearch.current = event.target.value;
  };

  const handleResetSearch = () => {
    keySearch.current = "";
    setTodoResut([]);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((value) => value.id !== id);
    setTodos(newTodos);
    customToast(
      "Deleted task successfully",
      "We have removed your task",
      "success"
    );
  };

  const handleDone = (id) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) return { ...item, status: !item.status };

      return item;
    });

    setTodos(newTodos);
    customToast(
      "Status update successfully",
      "We have changed your task status",
      "success"
    );
  };

  const handleUpdate = ({ id, value }) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) return { ...item, value: value };

      return item;
    });

    setTodos(newTodos);
    customToast(
      "Update task successfully",
      "We have update your task",
      "success"
    );
  };

  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Add task</Tab>
          <Tab>Serach tasks</Tab>
        </TabList>
        <TabPanels
          border="1px"
          borderTop="0"
          borderColor="gray.200"
          borderBottomRadius="md"
        >
          <TabPanel>
            <Box>
              <form onSubmit={handleSubmit}>
                <>
                  <FormLabel>Add your task</FormLabel>
                  <Input
                    ref={value}
                    type="text"
                    onChange={handleChange}
                    placeholder={`Type your todo`}
                    size="sm"
                  />
                </>
                <Button type="submit" mt={2} mr={2} colorScheme="green">
                  Submit
                </Button>
                <Button
                  type="reset"
                  mt={2}
                  colorScheme="gray"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </form>
              <List
                todos={todos}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleDone={handleDone}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <form onSubmit={handleSearch}>
                <>
                  <FormLabel>Search your tasks</FormLabel>
                  <Input
                    ref={keySearch}
                    type="text"
                    onChange={handleChangeSeach}
                    placeholder={`Type your todo`}
                    size="sm"
                  />
                </>
                <Button type="submit" mt={2} mr={2} colorScheme="green">
                  Search
                </Button>
                <Button
                  type="reset"
                  mt={2}
                  colorScheme="gray"
                  onClick={handleResetSearch}
                >
                  Clear
                </Button>
              </form>
              <List
                todos={todosResult}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleDone={handleDone}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TodoApp;
