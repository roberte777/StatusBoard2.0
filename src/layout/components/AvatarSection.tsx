import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

const AvatarSection: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <>
            <IconButton
                aria-label="Avatar"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <Avatar>H</Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button"
                }}
            >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                    My account
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default AvatarSection;
