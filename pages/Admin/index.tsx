import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { Box, Tabs, Tab } from "@mui/material";
import TabPanel from "@/components/TabPanel";
export default function index() {
  const [users, setUsers] = useState<[] | User[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  useEffect(() => {
    const getData = async () => {
      setDataLoading(true);
      const resp = await (await fetch("/api/Users")).json();
      setUsers(resp);
      setDataLoading(false);
    };
    getData();
  }, []);
  return (
    <div>
      {users.map((e) => (
        <div key={e.uid}>{e.displayName}</div>
      ))}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}
index.title = "Admin";
index.auth = true;
