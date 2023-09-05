import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon sx={{color:'#fff'}} />
            {/* <span style={{color:"#fff",fontWeight:"700"}}>MovieBooking</span> */}
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Multiple Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" LinkComponent={Link} to="/admin" />
                <Tab label="Auth" LinkComponent={Link} to="/auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" LinkComponent={Link} to="/user" />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" LinkComponent={Link} to="/add" />
                <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Autocomplete,
//   IconButton,
//   Tab,
//   Tabs,
//   TextField,
//   Toolbar,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import MovieIcon from "@mui/icons-material/Movie";
// import { Box } from "@mui/system";
// import { getAllMovies } from "../api-helpers/api-helpers";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminActions, userActions } from "../store";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
//   const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const [value, setValue] = useState();
//   const [movies, setMovies] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   useEffect(() => {
//     getAllMovies()
//       .then((data) => setMovies(data.movies))
//       .catch((err) => console.log(err));
//   }, []);

//   const toggleDrawer = (open) => {
//     setDrawerOpen(open);
//   };

//   const logout = (isAdmin) => {
//     dispatch(isAdmin ? adminActions.logout() : userActions.logout());
//   };

//   const handleChange = (e, val) => {
//     const movie = movies.find((m) => m.title === val);
//     console.log(movie);
//     if (isUserLoggedIn) {
//       navigate(`/booking/${movie._id}`);
//     }
//   };

//   return (
//     <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
//       <Toolbar>
//         <Box width={"20%"}>
//           <IconButton
//             sx={{ display: { xs: "block", sm: "none" } }}
//             onClick={() => toggleDrawer(true)}
//             color="inherit"
//             edge="start"
//           >
//             <MenuIcon />
//           </IconButton>
//           <IconButton LinkComponent={Link} to="/">
//             <MovieIcon sx={{ color: "#fff" }} />
//           </IconButton>
//         </Box>
//         <Box width={"30%"} margin="auto">
//           <Autocomplete
//             onChange={handleChange}
//             freeSolo
//             options={movies && movies.map((option) => option.title)}
//             renderInput={(params) => (
//               <TextField
//                 sx={{ input: { color: "white" } }}
//                 variant="standard"
//                 {...params}
//                 placeholder="Search Across Multiple Movies"
//               />
//             )}
//           />
//         </Box>
//         <Box display={"flex"}>
//           <Tabs
//             textColor="inherit"
//             indicatorColor="secondary"
//             value={value}
//             onChange={(e, val) => setValue(val)}
//           >
//             <Tab LinkComponent={Link} to="/movies" label="Movies" />
//             {!isAdminLoggedIn && !isUserLoggedIn && (
//               <>
//                 <Tab label="Admin" LinkComponent={Link} to="/admin" />
//                 <Tab label="Auth" LinkComponent={Link} to="/auth" />
//               </>
//             )}
//             {isUserLoggedIn && (
//               <>
//                 <Tab label="Profile" LinkComponent={Link} to="/user" />
//                 <Tab
//                   onClick={() => logout(false)}
//                   label="Logout"
//                   LinkComponent={Link}
//                   to="/"
//                 />
//               </>
//             )}
//             {isAdminLoggedIn && (
//               <>
//                 <Tab label="Add Movie" LinkComponent={Link} to="/add" />
//                 <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
//                 <Tab
//                   onClick={() => logout(true)}
//                   label="Logout"
//                   LinkComponent={Link}
//                   to="/"
//                 />
//               </>
//             )}
//           </Tabs>
//         </Box>
//       </Toolbar>

//       {/* Drawer menu */}
//       <Drawer  anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)} >
//         <List>
//           {isAdminLoggedIn || isUserLoggedIn ? (
//             <>
//               {isAdminLoggedIn ? (
//                 <>
//                   <ListItem button component={Link} to="/add">
//                     <ListItemText primary="Add Movie" />
//                   </ListItem>
//                   <ListItem button component={Link} to="/user-admin">
//                     <ListItemText primary="Profile" />
//                   </ListItem>
//                   <ListItem button onClick={() => logout(true)}>
//                     <ListItemText primary="Logout" />
//                   </ListItem>
//                 </>
//               ) : (
//                 <>
//                   <ListItem button component={Link} to="/user">
//                     <ListItemText primary="Profile" />
//                   </ListItem>
//                   <ListItem button onClick={() => logout(false)}>
//                     <ListItemText primary="Logout" />
//                   </ListItem>
//                 </>
//               )}
//             </>
//           ) : (
//             <>
//               <ListItem button component={Link} to="/admin">
//                 <ListItemText primary="Admin" />
//               </ListItem>
//               <ListItem button component={Link} to="/auth">
//                 <ListItemText primary="Auth" />
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </AppBar>
//   );
// };

// export default Header;
