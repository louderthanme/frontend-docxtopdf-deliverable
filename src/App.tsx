import { Box, VStack, Button, Input } from '@chakra-ui/react';
import { useRef, useState, FormEvent } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // This only triggers the file dialog
    inputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would handle uploading the file
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
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Button onClick={handleButtonClick} colorScheme="blue">Choose File</Button>
          <Input type="file" ref={inputRef} hidden onChange={(e) => console.log(e.target.files)} />
          <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Uploading...">
            Upload Document
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default App;
