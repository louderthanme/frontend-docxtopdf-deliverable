import { Box, VStack, Button, Input, HStack } from "@chakra-ui/react";
import { useRef, useState, FormEvent } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would handle uploading the file
    setTimeout(() => {
      setIsLoading(false);
      setIsFileSelected(false);
      setFileName("");
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsFileSelected(true);
      setFileName(files[0].name);
    } else {
      setIsFileSelected(false);
      setFileName("");
    }
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
          <HStack>
            <Button onClick={handleButtonClick} colorScheme="teal">
              Choose File
            </Button>
            {isFileSelected ? (
              <Box bg='limegreen' p={2} color='white' borderRadius="md"> {`${fileName}`} Selected</Box>
            ) : (
              <Box bg='tomato' p={2} color='white' borderRadius='sm'>No File Selected</Box>
            )}
            <Input
              type="file"
              ref={inputRef}
              hidden
              onChange={handleFileChange}
            />
          </HStack>

          <Button
            type="submit"
            colorScheme="purple"
            isLoading={isLoading}
            loadingText="Uploading..."
          >
            Upload Document
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default App;
