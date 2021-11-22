import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import {
  Box,
  Tabs,
  Tab,
  Container,
  CircularProgress,
  Button
} from "@mui/material";
import {
  DataGrid,
  GridApi,
  GridCellValue,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import TabPanel from "@/components/TabPanel";
const generateButton = (role: "admin" | "employee") => {
  return {
    field: role,
    headerName: `Add ${role.charAt(0).toUpperCase()}`,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const onClick = async (e: any) => {
        e.stopPropagation(); // don't select this row after clicking

        const resp = await (
          await fetch("/api/Roles", {
            method: "POST",
            body: JSON.stringify({
              uid: params.row.uid,
              role: role,
              remove: false
            })
          })
        ).json();
      };
    }
  };
};
// const generateColumns: GridColDef[] = (
//   type: "all" | "admin" | "employee" | "noRole"
// ) => {
//   return [
//     { field: "email", headerName: "Email", width: 150 },
//     { field: "displayName", headerName: "Name", width: 150 }
//   ];
// };
const columns: GridColDef[] = [
  { field: "email", headerName: "Email" },
  { field: "displayName", headerName: "Name" },
  { field: "employee", headerName: "Employee" },
  { field: "admin", headername: "Admin" }
];

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
  if (dataLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <div>
      {users.map((e) => (
        <div key={e.uid}>{e.displayName}</div>
      ))}
      <Box sx={{ width: "100%" }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
        {/* <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Employee" {...a11yProps(1)} />
            <Tab label="Admin" {...a11yProps(2)} />
            <Tab label="No Role" {...a11yProps(3)} />
          </Tabs> */}
        {/* </Box> */}
        {/* <TabPanel value={value} index={0}> */}
        <DataGrid
          columns={columns}
          rows={users.map((user, idx) => {
            return {
              ...user,
              id: idx,
              employee: user.customClaims?.employee,
              admin: user.customClaims?.admin
            };
          })}
          // checkboxSelection
        />
        {/* </TabPanel> */}
      </Box>
    </div>
  );
}
index.title = "Admin";
index.auth = true;
