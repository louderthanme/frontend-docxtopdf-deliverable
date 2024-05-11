import { FormEvent, useState } from "react";
import { Box, VStack, Button, Input } from "@chakra-ui/react";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Uploading...");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <form onSubmit={handleSubmit}>
          <Input type="file" />
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Uploading..."
          >
            Upload Document
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default App;
