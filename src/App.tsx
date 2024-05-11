import { Box, VStack, Button, Input, HStack } from "@chakra-ui/react";
import { useRef, useState, FormEvent } from "react";

function App() {
  const [isConverting, setIsConverting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    inputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage){
      return;
    }


    setIsDownloaded(false); // Reset on new submission
    const file = inputRef.current?.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    setIsConverting(true);
    try {
      const response = await fetch(
        "https://docxtopdf-hqws.onrender.com/convert",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Couldn't upload file");
      setIsDownloaded(true)
      setErrorMessage("");
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName.replace(/\.[^/.]+$/, "") + ".pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setIsDownloaded(true); // Set downloaded state true after successful operation
    } catch (error) {
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDownloaded(false); // Reset on new file selection
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop();
      if (fileExtension !== "docx" && fileExtension !== "doc") {
        setErrorMessage('Only .doc or .docx files please.')
      } else {
        setErrorMessage("");
      }
      setFileName(file.name);
      setIsDownloaded(false);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Box p={4} bg="pink.100" borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <HStack spacing={3}>
              <Button onClick={handleButtonClick} colorScheme="teal">
                Choose File
              </Button>
              {fileName && !errorMessage ? (
                <Box bg="limegreen" p={2} color="white" borderRadius="md">
                  {`${fileName}`} Selected
                </Box>
              ) : errorMessage ? (
                <Box bg="gray.200" border="2px solid" borderColor='red.500' p={2}  borderRadius="md">
                  {`${fileName}`} Selected
                </Box>
              ) : (
                <Box bg="tomato" p={2} color="white" borderRadius="sm">
                  No File Selected
                </Box>
              )}
              <Input
                type="file"
                ref={inputRef}
                hidden
                onChange={handleFileChange}
              />
            </HStack>
            {isDownloaded && (
              <Box bg="yellow.50" p={2} borderRadius="md">
                File downloaded. Check your downloads.
              </Box>
            )}
            {errorMessage && (
              <Box bg="red.500" p={2} color="white" borderRadius="sm" textAlign='center'>
                {errorMessage}
              </Box>
            )}
            <Button
              type="submit"
              colorScheme="purple"
              isLoading={isConverting}
              loadingText="Converting..."
              isDisabled={!!errorMessage}
            >
              Convert File
            </Button>

          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default App;
