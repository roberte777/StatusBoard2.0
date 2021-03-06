import React from "react";
import Link from "next/link";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";

const AvatarSection: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, loading] = useAuthState(getAuth());
  const open = Boolean(anchorEl);
  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : !user ? (
        <Link href="/Auth/login">
          <a style={{ textDecoration: "none" }}>SignIn</a>
        </Link>
      ) : (
        <>
          <IconButton
            aria-label="Avatar"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar>{user?.displayName?.charAt(0)}</Avatar>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                const auth = getAuth();
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                  })
                  .catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default AvatarSection;
