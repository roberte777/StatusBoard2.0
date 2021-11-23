import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import FilledButton from "@/components/filledButton";
import Loading from "@/components/Loading";
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
      ),
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
      ),
  },
];

export default function index() {
  const [users, setUsers] = useState<[] | User[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState<User[]>([]);

  const editRole = async (remove: boolean, role: "admin" | "employee") => {
    setDataLoading(true);
    const resp = await (
      await fetch("/api/Roles", {
        method: "POST",
        body: JSON.stringify({ users: selectionModel, remove, role }),
      })
    )
      .json()
      .then(() => {
        getData();
        setSelectionModel([]);
      });
  };
  const deleteUsers = async (users: User[]) => {
    setDataLoading(true);
    await (
      await fetch("/api/Users", {
        method: "DELETE",
        body: JSON.stringify({
          users,
        }),
      })
    ).json();
    getData();
  };

  const getData = async () => {
    setDataLoading(true);
    const resp = await (await fetch("/api/Users")).json();
    setUsers(resp);
    setDataLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (dataLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "50vh",
          width: "100%",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            onSelectionModelChange={(newSelectionModel) => {
              const selectedRows: User[] = newSelectionModel.map(
                (model) =>
                  users.find((user) => user.email === model.toString())!
              );
              setSelectionModel(selectedRows);
            }}
            columns={columns}
            rows={users.map((user: roleUser) => {
              return {
                ...user,
                id: user.email,
                employee: user.customClaims?.employee,
                admin: user.customClaims?.admin,
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
            justifyContent: "space-evenly",
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
          <FilledButton onClick={() => deleteUsers(selectionModel)}>
            Delete User(s)
          </FilledButton>
        </div>
      )}
    </div>
  );
}
index.title = "Admin";
index.auth = true;
