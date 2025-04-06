import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Textarea,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

function CompanySettings() {
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [domain, setDomain] = useState("");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("companySettings"));
    if (savedData) {
      setExperience(savedData.experience || "");
      setSkills(savedData.skills || []);
      setDomain(savedData.domain || "");
    }
  }, []);

  // Save data to localStorage
  const handleSaveChanges = () => {
    const formData = { experience, skills, domain };
    localStorage.setItem("companySettings", JSON.stringify(formData));
    alert("Data saved successfully!");
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
      {/* Experience Section */}
      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Experience</FormLabel>
        <Textarea
          placeholder="Describe your previous work experience..."
          fontSize="xl"
          height="150px" // Increased height for better experience with textarea
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </FormControl>

      {/* Skills Section */}
      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Skills</FormLabel>
        <HStack spacing={2} wrap="wrap" mb={2}>
          {skills.map((skill, index) => (
            <Tag size="lg" key={index} variant="solid" colorScheme="blue" height="40px">
              <TagLabel>{skill}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
            </Tag>
          ))}
        </HStack>
        <HStack>
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add a skill"
            fontSize="xl"
            height="40px"
            bg="gray.700"
            color="white"
            borderColor="gray.600"
          />
          <Button onClick={handleAddSkill} colorScheme="blue" height="40px" fontSize="xl">Add</Button>
        </HStack>
      </FormControl>

      {/* Domain of Expertise */}
      <FormControl mb={4}>
        <FormLabel fontSize="2xl" color="white">Domain of Expertise</FormLabel>
        <Select
          placeholder="Select your domain"
          fontSize="xl"
          height="40px"
          bg="gray.700"
          color="white"
          borderColor="gray.600"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
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
          {[
            "Software Development", 
            "Data Science", 
            "Cybersecurity", 
            "Artificial Intelligence", 
            "Cloud Computing", 
            "DevOps", 
            "Blockchain", 
            "Game Development", 
            "UI/UX Design"
          ].map((option) => (
            <option 
              key={option} 
              value={option}
              style={{ backgroundColor: "#2D3748", color: "white" }}
            >
              {option}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Save Button */}
      <FormControl mb={4}>
        <Button colorScheme="blue" fontSize="xl" height="40px" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </FormControl>
    </Grid>
  );
}

export default CompanySettings;