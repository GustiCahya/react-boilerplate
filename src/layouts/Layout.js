import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar
} from "@mui/material";
import { AddCircleOutline, SubjectOutlined } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";

const drawerWidth = 240;
const styles = {
  root: {
    display: "flex",
  },
  page: {
    my: 4,
    background: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  },
  active: {
    background: "#f4f4f4",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  }
};

export default function Layout({ children }) {
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutline color="secondary" />,
      path: "/create",
    },
  ];
  return (
    <Box>
      {/* app bar */}
      <AppBar
        sx={styles.appBar}
        elevation={0}
      >
        <Toolbar>
          <Typography sx={{flexGrow: 1}}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>
            Mario
          </Typography>
          <Avatar sx={{marginLeft: 2}} src="/logo512.png"/>
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Box sx={styles.root}>
        <Drawer sx={styles.drawer} variant="permanent" anchor="left">
          <Box sx={{py: 2, px: 2}}>
            <Typography variant="h5">Notes</Typography>
          </Box>
          {/* list / links */}
          <List>
            {menuItems.map((item) => {
              return (
                <ListItem
                  sx={location.pathname === item.path ? styles.active : null}
                  key={item.text}
                  button
                  onClick={() => history.push(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        {/* content */}
        <Box sx={styles.page}>
          <Box sx={{height: (theme) => theme.mixins.toolbar}}></Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
