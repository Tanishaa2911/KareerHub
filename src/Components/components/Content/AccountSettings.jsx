import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Button,
  Select as ChakraSelect,
} from "@chakra-ui/react";

function CompanySettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    city: "",
  });

  const collegeOptions = [
    { value: "IIT Bombay", label: "IIT Bombay" },
    { value: "IIT Delhi", label: "IIT Delhi" },
    { value: "IIT Madras", label: "IIT Madras" },
    { value: "IIT Kanpur", label: "IIT Kanpur" },
    { value: "IIT Kharagpur", label: "IIT Kharagpur" },
    { value: "IIT Roorkee", label: "IIT Roorkee" },
    { value: "IIT Guwahati", label: "IIT Guwahati" },
    { value: "NIT Trichy", label: "NIT Trichy" },
    { value: "NIT Surathkal", label: "NIT Surathkal" },
    { value: "NIT Warangal", label: "NIT Warangal" },
    { value: "NIT Rourkela", label: "NIT Rourkela" },
    { value: "NIT Calicut", label: "NIT Calicut" },
    { value: "NIT Allahabad", label: "NIT Allahabad" },
    { value: "KIIT University", label: "KIIT University" },
  ];

  const cityOptions = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Chennai", label: "Chennai" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Pune", label: "Pune" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Lucknow", label: "Lucknow" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Patna", label: "Patna" },
    { value: "Bhubaneswar", label: "Bhubaneswar" },
    { value: "Indore", label: "Indore" },
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("accountSettings");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData({
          firstName: parsedData.firstName || "",
          lastName: parsedData.lastName || "",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          college: parsedData.college?.value || "",
          city: parsedData.city?.value || "",
        });
      } catch (error) {
        console.error("Error parsing saved data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    const dataToSave = {
      ...formData,
      college: formData.college ? { value: formData.college, label: formData.college } : null,
      city: formData.city ? { value: formData.city, label: formData.city } : null,
    };
    localStorage.setItem("accountSettings", JSON.stringify(dataToSave));
    alert("Data saved successfully!");
  };

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">First Name</FormLabel>
        <Input
          name="firstName"
          placeholder="Enter your first name"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Last Name</FormLabel>
        <Input
          name="lastName"
          placeholder="Enter your last name"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter your email"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Phone Number</FormLabel>
        <Input
          name="phone"
          placeholder="Enter your phone number"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">College</FormLabel>
        <ChakraSelect
          name="college"
          placeholder="Select your college"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={formData.college}
          onChange={handleChange}
          sx={{
            // Override select options styles 
            option: {
              bg: "gray.700",
              color: "white",
              _hover: {
                bg: "gray.600",
              },
              _focus: {
                bg: "gray.600",
              }
            }
          }}
        >
          {collegeOptions.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              style={{ backgroundColor: "#2D3748", color: "white" }}
            >
              {option.label}
            </option>
          ))}
        </ChakraSelect>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">City</FormLabel>
        <ChakraSelect
          name="city"
          placeholder="Select your city"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={formData.city}
          onChange={handleChange}
          sx={{
            // Override select options styles
            option: {
              bg: "gray.700",
              color: "white",
              _hover: {
                bg: "gray.600",
              },
              _focus: {
                bg: "gray.600",
              }
            }
          }}
        >
          {cityOptions.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              style={{ backgroundColor: "#2D3748", color: "white" }}
            >
              {option.label}
            </option>
          ))}
        </ChakraSelect>
      </FormControl>

      <FormControl mb={4}>
        <Button colorScheme="blue" fontSize="xl" height="40px" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </FormControl>
    </Grid>
  );
}

export default CompanySettings;