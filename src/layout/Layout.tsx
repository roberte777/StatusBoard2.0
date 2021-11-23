import React, { useContext } from "react";
import AvatarSection from "./components/avatarSection";
import { ColorModeContext } from "./Providers/ThemeProviders";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FormGroup,
  Toolbar,
  Typography,
  FormControlLabel,
  IconButton,
  Drawer,
  CssBaseline,
  Box,
  AppBar
} from "@mui/material";
import Sidebar from "./components/sidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DarkModeSwitch from "./components/darkModeSwitch";

type Breakpoint = "xs" | "sm" | "md" | "lg";

const drawerWidth = 240;

export default function ResponsiveDrawer(props: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { window, children, title, noPadding } = props;
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [desktopDrawerOpen, setDesktopDrawerOpen] = React.useState(true);
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const breakpoint: Breakpoint = "md"; //This is the point at which it swaps from hamburger to perm side menu

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* topbar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            [breakpoint]: desktopDrawerOpen
              ? `calc(100% - ${drawerWidth}px)`
              : "100%"
          },
          ml: {
            [breakpoint]: desktopDrawerOpen ? 0 : `${drawerWidth}px`
          }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={
              matches
                ? () => setDesktopDrawerOpen(true)
                : handleMobileDrawerToggle
            }
            sx={{
              mr: 2,
              display: {
                [breakpoint]:
                  matches && desktopDrawerOpen ? "none" : "inline-block"
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <DarkModeSwitch toggleColorMode={toggleColorMode} mode={mode} />
              }
              label={""}
            />
          </FormGroup>
          <AvatarSection />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: {
            [breakpoint]: desktopDrawerOpen ? drawerWidth : 0
          },
          flexShrink: { [breakpoint]: 0 }
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", [breakpoint]: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          <Sidebar setDrawerOpen={setMobileDrawerOpen} />
        </Drawer>
        {/* desktop drawer */}
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", [breakpoint]: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open={desktopDrawerOpen}
        >
          <Sidebar setDrawerOpen={setDesktopDrawerOpen} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: noPadding ? 0 : 3
        }}
        className="test"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
