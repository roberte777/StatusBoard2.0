import React, { useEffect, useState } from "react";
import { User } from "@firebase/auth";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import FilledButton from "@/components/filledButton";
import Loading from "@/components/Loading";
import {
  alpha,
  Box,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@mui/material";
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

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: theme.palette.secondary.main,
    // color: theme.palette.primary.main,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.action.active,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.secondary.main, 1),
      },
    },
  },
}));

export default function index() {
  const [users, setUsers] = useState<[] | User[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectionModel, setSelectionModel] = useState<User[]>([]);
  const [adminElement, setAdminElement] = useState<null | HTMLElement>(null);
  const [employeeElement, setEmployeeElement] = useState<null | HTMLElement>(
    null
  );

  const handleClose = (setElement: React.Dispatch<null | HTMLElement>) => {
    setElement(null);
  };
  const handleMenuButton = (
    event: React.MouseEvent<HTMLElement>,
    setElement: React.Dispatch<null | HTMLElement>
  ) => {
    setElement(event.currentTarget);
  };
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
        <Box
          sx={{
            float: "right",
            "& button": {
              margin: "10px",
            },
          }}
        >
          <FilledButton
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              handleMenuButton(e, setAdminElement)
            }
          >
            Admin
          </FilledButton>
          <FilledButton
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              handleMenuButton(e, setEmployeeElement);
            }}
          >
            Employee
          </FilledButton>
          <FilledButton onClick={() => deleteUsers(selectionModel)}>
            Delete User(s)
          </FilledButton>

          <StyledMenu
            open={Boolean(adminElement)}
            anchorEl={adminElement}
            onClose={() => handleClose(setAdminElement)}
          >
            <MenuItem
              onClick={() => {
                handleClose(setAdminElement);
                editRole(false, "admin");
              }}
            >
              <AddIcon />
              <ListItemText>Add Admin</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose(setAdminElement);
                editRole(true, "admin");
              }}
            >
              <RemoveIcon />
              Remove Admin
            </MenuItem>
          </StyledMenu>

          <StyledMenu
            open={Boolean(employeeElement)}
            anchorEl={employeeElement}
            onClose={() => handleClose(setEmployeeElement)}
          >
            <MenuItem
              onClick={() => {
                handleClose(setEmployeeElement);
                editRole(false, "employee");
              }}
            >
              <AddIcon />
              <ListItemText>Add Employee</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose(setEmployeeElement);
                editRole(true, "employee");
              }}
            >
              <RemoveIcon />
              Remove Employee
            </MenuItem>
          </StyledMenu>
        </Box>
      )}
    </div>
  );
}
index.title = "Admin";
index.auth = true;
