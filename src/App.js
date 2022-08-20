import "./App.css";
import TodoApp from "./components/TodoApp";
import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Heading align="center" size="lg" fontSize="50px">
          Todo app
        </Heading>
        <Flex my={5} align="center" justify="center">
          <TodoApp />
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
