import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Box,
  Text,
  Icon,
  Progress,
  Link,
  useToast,
} from "@chakra-ui/react";
import { FaUpload, FaFileAlt, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

function UploadSection() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeProgress, setResumeProgress] = useState(0);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [resumeType, setResumeType] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateProgress, setCertificateProgress] = useState(0);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [certificateType, setCertificateType] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  
  const toast = useToast();

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.resumeFileName) {
          setResumeFile(parsedData.resumeFileName);
          setResumeProgress(100);
          setResumeUrl(parsedData.resumeUrl);
          setResumeType(parsedData.resumeType);
        }
        if (parsedData.certificateFileName) {
          setCertificateFile(parsedData.certificateFileName);
          setCertificateProgress(100);
          setCertificateUrl(parsedData.certificateUrl);
          setCertificateType(parsedData.certificateType);
        }
        setProjectLink(parsedData.projectLink || "");
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

  const handleFileUpload = (file, setFile, setProgress, setFileUrl, setFileType) => {
    if (file) {
      setFile(file.name);
      setFileType(file.type);
      
      // Create simulated progress
      let uploadProgress = 0;
      const interval = setInterval(() => {
        uploadProgress += 25;
        setProgress(uploadProgress);
        
        if (uploadProgress >= 100) {
          clearInterval(interval);
          
          // Create a URL for the file
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            setFileUrl(fileReader.result);
          };
        }
      }, 300);
    }
  };

  const handleSaveChanges = () => {
    const dataToSave = {
      resumeFileName: resumeFile,
      resumeUrl: resumeUrl,
      resumeType: resumeType,
      certificateFileName: certificateFile,
      certificateUrl: certificateUrl,
      certificateType: certificateType,
      projectLink,
    };
    
    try {
      localStorage.setItem("resumeData", JSON.stringify(dataToSave));
      toast({
        title: "Success",
        description: "Your files and information have been saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({  
        title: "Error saving data",
        description: "Your files may be too large for local storage. Try using smaller files.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Storage error:", error);
    }
  };

  const handleRemoveFile = (fileType) => {
    if (fileType === "resume") {
      setResumeFile(null);
      setResumeUrl(null);
      setResumeProgress(0);
      setResumeType(null);
    } else if (fileType === "certificate") {
      setCertificateFile(null);
      setCertificateUrl(null);
      setCertificateProgress(0);
      setCertificateType(null);
    }
  };

  const openFile = (fileUrl, fileType, fileName) => {
    if (fileUrl) {
      // For images and PDFs, we can display them directly
      if (fileType.includes("image") || fileType.includes("pdf")) {
        // Open data URL in new tab
        const newWindow = window.open();
        if (newWindow) {
          // Create HTML to properly display the file
          let html = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>${fileName}</title>
              <style>
                body, html { margin: 0; padding: 0; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0; }
                .container { max-width: 95%; max-height: 95%; }
                img { max-width: 100%; max-height: 90vh; object-fit: contain; }
                object { width: 100%; height: 90vh; }
              </style>
            </head>
            <body>
              <div class="container">
          `;

          if (fileType.includes("pdf")) {
            html += `<object data="${fileUrl}" type="application/pdf" width="100%" height="100%">
                      <p>Unable to display PDF. <a href="${fileUrl}" download="${fileName}">Download instead</a>.</p>
                     </object>`;
          } else {
            html += `<img src="${fileUrl}" alt="${fileName}" />`;
          }

          html += `
              </div>
            </body>
            </html>
          `;

          newWindow.document.write(html);
          newWindow.document.close();
        }
      } else {
        // For other file types, offer download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
      <FormControl>
        <FormLabel htmlFor="resumeUpload" fontSize="2xl" cursor="pointer">
          Upload Resume
        </FormLabel>
        <Input
          id="resumeUpload"
          type="file"
          accept=".pdf,.doc,.docx"
          display="none"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleFileUpload(
                e.target.files[0], 
                setResumeFile, 
                setResumeProgress, 
                setResumeUrl,
                setResumeType
              );
            }
          }}
        />
        <Button as="label" htmlFor="resumeUpload" leftIcon={<Icon as={FaUpload} />} colorScheme="blue" height="40px" fontSize="xl" width="full">
          Choose File
        </Button>
        {resumeFile && (
          <Box mt={2} p={3} borderWidth="1px" borderRadius="md">
            <Text fontSize="md" mb={1} fontWeight="bold">File: {resumeFile}</Text>
            {resumeProgress < 100 ? (
              <>
                <Text fontSize="sm" color="gray.500">Uploading...</Text>
                <Progress value={resumeProgress} size="sm" colorScheme="blue" mb={2} />
              </>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button 
                  leftIcon={<Icon as={FaFileAlt} />} 
                  colorScheme="green" 
                  size="sm"
                  onClick={() => openFile(resumeUrl, resumeType, resumeFile)}
                >
                  View File
                </Button>
                <Button 
                  leftIcon={<Icon as={FaTrash} />} 
                  colorScheme="red" 
                  size="sm"
                  onClick={() => handleRemoveFile("resume")}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="projectLink" fontSize="2xl">Enter Project Link</FormLabel>
        <Input
          id="projectLink"
          type="url"
          placeholder="https://example.com/project"
          height="40px"
          fontSize="xl"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        {projectLink && (
          <Box mt={2}>
            <Link href={projectLink} isExternal color="blue.500" fontSize="sm" display="flex" alignItems="center">
              {projectLink} <Icon as={FaExternalLinkAlt} ml={1} />
            </Link>
          </Box>
        )}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="certificateUpload" fontSize="2xl">Upload Certificate</FormLabel>
        <Input
          id="certificateUpload"
          type="file"
          accept=".pdf,.jpg,.png"
          display="none"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleFileUpload(
                e.target.files[0], 
                setCertificateFile, 
                setCertificateProgress, 
                setCertificateUrl,
                setCertificateType
              );
            }
          }}
        />
        <Button as="label" htmlFor="certificateUpload" leftIcon={<Icon as={FaUpload} />} colorScheme="blue" height="40px" fontSize="xl" width="full">
          Choose File
        </Button>
        {certificateFile && (
          <Box mt={2} p={3} borderWidth="1px" borderRadius="md">
            <Text fontSize="md" mb={1} fontWeight="bold">File: {certificateFile}</Text>
            {certificateProgress < 100 ? (
              <>
                <Text fontSize="sm" color="gray.500">Uploading...</Text>
                <Progress value={certificateProgress} size="sm" colorScheme="blue" mb={2} />
              </>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Button 
                  leftIcon={<Icon as={FaFileAlt} />} 
                  colorScheme="green" 
                  size="sm"
                  onClick={() => openFile(certificateUrl, certificateType, certificateFile)}
                >
                  View File
                </Button>
                <Button 
                  leftIcon={<Icon as={FaTrash} />} 
                  colorScheme="red" 
                  size="sm"
                  onClick={() => handleRemoveFile("certificate")}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        )}
      </FormControl>

      <FormControl mb={4}>
        <Button colorScheme="blue" fontSize="xl" height="40px" onClick={handleSaveChanges} width="full">
          Save Changes
        </Button>
      </FormControl>
    </Grid>
  );
}

export default UploadSection;