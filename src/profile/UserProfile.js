// import { Box } from "@mui/system";
// import React, { Fragment, useEffect, useState } from "react";
// import {
//   deleteBooking,
//   getUserBooking,
//   getUserDetails,
// } from "../api-helpers/api-helpers";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import {
//   Button,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// const UserProfile = () => {
//   const [bookings, setBookings] = useState();
//   const [user, setUser] = useState();
//   useEffect(() => {
//     getUserBooking()
//       .then((res) => setBookings(res.bookings))
//       .catch((err) => console.log(err));

//     getUserDetails()
//       .then((res) => setUser(res.user))
//       .catch((err) => console.log(err));
//   }, []);
//   const handleDelete = (id) => {
//     deleteBooking(id)
//       // .then(
//       //   (res) => console.log(res),
//       //   toast.success("Movie deleted successfully")
//       // )
//       .then((res) => {
//         // Filter out the deleted booking from the state
//         const updatedBookings = bookings.filter(
//           (booking) => booking._id !== id
//         );
//         setBookings(updatedBookings);
//         toast.success("Movie deleted successfully");
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <Box width={"100%"} display="flex">
//       <Fragment>
//         {" "}
//         {user && (
//           <Box
//             flexDirection={"column"}
//             justifyContent="center"
//             alignItems={"center"}
//             width={"30%"}
//             padding={3}
//           >
//             <AccountCircleIcon
//               sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
//             />
//             <Typography
//               padding={1}
//               width={"auto"}
//               textAlign={"center"}
//               border={"1px solid #ccc"}
//               borderRadius={6}
//             >
//               Name: {user.name}
//             </Typography>
//             <Typography
//               mt={1}
//               padding={1}
//               width={"auto"}
//               textAlign={"center"}
//               border={"1px solid #ccc"}
//               borderRadius={6}
//             >
//               Email: {user.email}
//             </Typography>
//           </Box>
//         )}
//         {bookings && (
//           <Box width={"70%"} display="flex" flexDirection={"column"}>
//             <Typography
//               variant="h3"
//               fontFamily={"verdana"}
//               textAlign="center"
//               padding={2}
//             >
//               Bookings
//             </Typography>
//             <Box
//               margin={"auto"}
//               display="flex"
//               flexDirection={"column"}
//               width="80%"
//             >
//               {bookings.length === 0 ? (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     flexDirection: "col",
//                     alignItems:'center'
//                   }}
//                 >
//                   <Typography>No movies added </Typography>
//                   <img
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkD0SEUlXCxMlaPRg2apd5_9FUsaHZiP_rFmj6Tc2&s"
//                     alt="no-movie-found"
//                   />
//                   <Button LinkComponent={Link} to={"/"}>
//                     Add some Movies
//                   </Button>
//                 </Box>
//               ) : (
//                 <List>
//                   {bookings.map((booking, index) => (
//                     <ListItem
//                       sx={{
//                         bgcolor: "#39535b",
//                         color: "white",
//                         textAlign: "center",
//                         margin: 1,
//                       }}
//                     >
//                       <ListItemText
//                         sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                       >
//                         Movie: {booking.movie.title}
//                       </ListItemText>
//                       <ListItemText
//                         sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                       >
//                         Seat: {booking.seatNumber}
//                       </ListItemText>
//                       <ListItemText
//                         sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                       >
//                         Date: {new Date(booking.date).toDateString()}
//                       </ListItemText>
//                       <IconButton
//                         onClick={() => handleDelete(booking._id)}
//                         color="warning"
//                       >
//                         <DeleteForeverIcon sx={{ fontSize: "2rem" }} />
//                       </IconButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Fragment>
//     </Box>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        const updatedBookings = bookings.filter(
          (booking) => booking._id !== id
        );
        setBookings(updatedBookings);
        toast.success("Movie deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-wrap">
      {user && (
        <div className="w-full md:w-1/3 p-4 m-auto  flex items-center justify-evenly">
          <div className=" p-4 mt-4">
            <div className="text-center mb-2 font-bold">Name: {user.name}</div>
            <div className="text-center font-semibold">Email: {user.email}</div>
          </div>
        </div>
      )}

      <div className="w-full md:w-2/3 p-4 flex flex-col gap-3 flex-wrap">
        <div>
          <h3 className="text-2xl text-center font-bold">Bookings</h3>
        </div>
        <div className="mx-auto w-4/5">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-xl font-mono">No movies Found</p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkD0SEUlXCxMlaPRg2apd5_9FUsaHZiP_rFmj6Tc2&s"
                alt="no-movie-found"
                className="w-[40%]"
              />
              <Link to={"/"} className="btn mt-4">
                <button className="bg-orange-300 p-3 rounded-lg font-semibold text-xl">
                  Add some Movies
                </button>
              </Link>
            </div>
          ) : (
            <ul className="text-white rounded-md p-4">
              {bookings.map((booking, index) => (
                <li
                  key={index}
                  className="bg-blue-200 rounded p-2 my-2 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-black font-bold">
                      Movie: {booking.movie.title}
                    </span>
                    <span className="text-black">
                      Seat: {booking.seatNumber}
                    </span>
                    <span className="text-black font-serif">
                      Date: {new Date(booking.date).toDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="text-red-600"
                  >
                    <DeleteForeverIcon className="text-2xl" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
