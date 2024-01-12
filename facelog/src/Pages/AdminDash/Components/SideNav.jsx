import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import PolicyTwoToneIcon from "@mui/icons-material/PolicyTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useNavigate } from "react-router-dom";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import listItemButtonStyles from "./css/ListItemButtonStyles";
import ListItemIconCss from "./css/ListItemIcon";
import AdminCss from "./css/AdminCss";
import Swal from "sweetalert2";
import axios from "axios"; // Import Axios

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Logout",
        text: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#16344F",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        // Make API request to log out
        const response = await axios.get("http://localhost:3001/LogOut");

        setTimeout(() => {
          navigate("/");
        }, 222);

        console.log("API Response:", response.data);
        Swal.fire(
          "Logged Out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire("Logout Failed", "An error occurred during logout.", "error");
    }
  };

  return (
    <Box style={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open} style={{ background: "#16344F" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div style={AdminCss}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <CalendarMonthTwoToneIcon /> */}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ paddingLeft: "16px" }}
              >
                <span
                  style={{
                    fontSize: "1.5em",
                    fontFamily: "Bad Script, cursive",
                  }}
                >
                  {" "}
                  FaceLog
                </span>
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ paddingRight: "16px", paddingTop: "9.2px" }}
              >
                <span
                  style={{
                    fontFamily: "Bad Script, cursive",
                    fontSize: "1.5em",
                  }}
                >
                  Welcome Admin
                </span>
              </Typography>
              <PermIdentityTwoToneIcon />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* home start */}
        <List>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              {/* ... your component JSX */}

              <ListItemIcon sx={ListItemIconCss(open)}>
                <HomeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Home" style={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* home end */}
          {/* employee reg start */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/RegisterEmployee");
            }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <HowToRegTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register Employee"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* employee reg end */}
          {/* coadmin reg start */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/RegisterCoAdmin");
            }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <SupervisorAccountTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register Co Admin"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            {/* co admin reg end */}

            {/* settimeinterval start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetTimeInterval");
            }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <AccessTimeTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Set Time Interval"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            {/* settimeinterval end */}

            {/* setdays start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetDays");
            }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <CalendarMonthTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Set Days"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* setdays end */}
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigate("/SetSalaryPolicy");
            }}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <PolicyTwoToneIcon />
              </ListItemIcon>
              {/* setsalarypolicy start */}
              <ListItemText
                primary="Set Salary Policy"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            {/* setsalarypolicy end */}

            {/* logout start */}
          </ListItem>
          <ListItem
            disablePadding
            style={{ display: "block", marginBottom: "10px" }}
            onClick={handleLogout}
          >
            <ListItemButton sx={listItemButtonStyles(open)}>
              <ListItemIcon sx={ListItemIconCss(open)}>
                <LogoutTwoToneIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                style={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* logout end */}
        </List>
      </Drawer>
    </Box>
  );
}
