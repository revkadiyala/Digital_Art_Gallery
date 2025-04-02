/** @format */

import * as React from "react";
import { IconButton } from "@mui/material";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import CategoryIcon from "@mui/icons-material/Category";



export default function NestedList() {
 
  
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, backgroundColor: "#5a2d82" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <DashboardIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/users" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PeopleIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/arts" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <ArtTrackIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Art" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/category" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <CategoryIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Category" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>

      <Link to="/login" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <LogoutIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>

     
    </List>
  );
}
