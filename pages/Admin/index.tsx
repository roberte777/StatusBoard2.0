import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { Container, CircularProgress, Button, Checkbox } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import FilledButton from "@/components/filledButton";
interface roleUser extends User {
  customClaims?: { admin?: boolean; employee: boolean };
}

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
    headerName: "Admin",
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
  const [selectionModel, setSelectionModel] = useState<User[]>([]);

  const editRole = async (remove: boolean, role: "admin" | "employee") => {
    setDataLoading(true);
    const resp = await (
      await fetch("/api/Roles", {
        method: "POST",
        body: JSON.stringify({ users: selectionModel, remove, role })
      })
    )
      .json()
      .then(() => {
        getData();
        setSelectionModel([]);
      });
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getData = async () => {
    setDataLoading(true);
    const resp = await (await fetch("/api/Users")).json();
    setUsers(resp);
    console.log(resp);
    setDataLoading(false);
  };

  useEffect(() => {
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
              const selectedRows: User[] = newSelectionModel.map(
                (model) =>
                  users.find((user) => user.email === model.toString())!
              );
              console.log(selectedRows);
              setSelectionModel(selectedRows);
            }}
            columns={columns}
            rows={users.map((user: roleUser) => {
              return {
                ...user,
                id: user.email,
                employee: user.customClaims?.employee,
                admin: user.customClaims?.admin
              };
            })}
            checkboxSelection
          />
        </div>
      </div>
      {selectionModel.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <FilledButton onClick={() => editRole(false, "admin")}>
            Add Admin
          </FilledButton>
          <FilledButton onClick={() => editRole(false, "employee")}>
            Add Employee
          </FilledButton>
          <FilledButton onClick={() => editRole(true, "admin")}>
            Remove Admin
          </FilledButton>
          <FilledButton onClick={() => editRole(true, "employee")}>
            Remove Employee
          </FilledButton>
          <FilledButton>Delete User(s)</FilledButton>
        </div>
      )}
    </div>
  );
}
index.title = "Admin";
index.auth = true;
