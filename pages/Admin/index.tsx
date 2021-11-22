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
  GridCellParams,
  GridCellValue,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel
} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const columns: GridColDef[] = [
  { field: "email", headerName: "Email", width: 300 },
  { field: "displayName", headerName: "Name", width: 200 },
  {
    field: "employee",
    headerName: "Employee",
    type: "boolean",
    renderCell: (params: GridCellParams) =>
      params.value ? (
        <CheckIcon color="success" />
      ) : (
        <ClearIcon color="warning" />
      )
  },
  {
    field: "admin",
    headername: "Admin",
    type: "boolean",
    renderCell: (params: GridCellParams) =>
      params.value ? (
        <CheckIcon color="success" />
      ) : (
        <ClearIcon color="warning" />
      )
  }
];

export default function index() {
  const [users, setUsers] = useState<[] | User[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
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
      <div
        style={{
          display: "flex",
          height: "50vh",
          width: "100%"
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            columns={columns}
            rows={users.map((user, idx) => {
              return {
                ...user,
                id: idx,
                employee: user.customClaims?.employee,
                admin: user.customClaims?.admin
              };
            })}
          />
        </div>
      </div>
      {selectionModel.map((e) => JSON.stringify(e))}
    </div>
  );
}
index.title = "Admin";
index.auth = true;
