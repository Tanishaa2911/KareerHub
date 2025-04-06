import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import AccountSettings from "./AccountSettings";
import Actions from "./Actions";
import CompanySettings from "./CompanySettings";
import Notifictions from "./Notifications";

const Content = () => {
  const tabs = ["Account Settings", "Experience/Skills", "Resume"];

  return (
    <Box
      as="main"
      flex={3}
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bgColor="gray.900" // Dark mode background
      borderRadius="md"
      borderWidth={1}
      borderColor="gray.700" // Darker border for contrast
      transform="translateY(-100px)"
      minHeight="400px"
      color="white" // Text in white
    >
      <Tabs>
        <TabList px={5} borderBottom="1px solid gray.700">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontSize="2xl"
              fontWeight="bold"
              color="gray.400" // Light gray for unselected text
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{
                color: "white", // Selected tab text in white
                borderColor: "blue.400",
                borderBottomWidth: "2px",
                transition: "all 0.2s ease",
              }}
              _hover={{ color: "white", bg: "transparent" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
          <TabPanel>
            <CompanySettings />
          </TabPanel>
          <TabPanel>
            <Notifictions />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Actions />
    </Box>
  );
};

export default Content;
