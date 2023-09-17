// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   FormLabel,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// const labelStyle = { mt: 1, mb: 1 };
// const AuthForm = ({ onSubmit, isAdmin }) => {
//   const [inputs, setInputs] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [isSignup, setIsSignup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (inputs.email.trim() === "" || inputs.password.trim() === "") {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     // For signup, also check the name field
//     if (!isAdmin && isSignup && inputs.name.trim() === "") {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     onSubmit({ inputs, signup: isAdmin ? false : isSignup });
//   };
//   return (
//     <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
//       <Box sx={{ ml: "auto", padding: 1 }}>
//         <IconButton LinkComponent={Link} to="/">
//           <CloseRoundedIcon />
//         </IconButton>
//       </Box>
//       <Typography variant="h4" textAlign={"center"}>
//         {isSignup ? "Signup" : "Login"}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Box
//           padding={6}
//           display={"flex"}
//           justifyContent={"center"}
//           flexDirection="column"
//           width={400}
//           margin="auto"
//           alignContent={"center"}
//         >
//           {!isAdmin && isSignup && (
//             <>
//               {" "}
//               <FormLabel sx={labelStyle}>Name*</FormLabel>
//               <TextField
//                 value={inputs.name}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="standard"
//                 type={"text"}
//                 name="name"
//               />
//             </>
//           )}
//           <FormLabel sx={labelStyle}>Email*</FormLabel>
//           <TextField
//             value={inputs.email}
//             onChange={handleChange}
//             margin="normal"
//             variant="standard"
//             type={"email"}
//             name="email"
//           />
//           <FormLabel sx={labelStyle}>Password*</FormLabel>
//           <TextField
//             value={inputs.password}
//             onChange={handleChange}
//             margin="normal"
//             variant="standard"
//             type={"password"}
//             name="password"
//           />
//           <Button
//             sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
//             type="submit"
//             fullWidth
//             variant="contained"
//             // onClick={toast.success(isSignup?"signup":"login")}
//           >
//             {/* {isSignup ? "Signup" : "Login"} */}
//             {loading ? (
//               <CircularProgress size={24} />
//             ) : isSignup ? (
//               "Signup"
//             ) : (
//               "Login"
//             )}
//           </Button>
//           {!isAdmin && (
//             <Button
//               onClick={() => setIsSignup(!isSignup)}
//               sx={{ mt: 2, borderRadius: 10 }}
//               fullWidth
//             >
//               Switch To {isSignup ? "Login" : "Signup"}
//             </Button>
//           )}
//           <Typography>
//             <Typography component={"span"} sx={{ color: "red" }}>
//               *
//             </Typography>
//             mark are mandatory
//           </Typography>
//         </Box>
//       </form>
//     </Dialog>
//   );
// };

// export default AuthForm;




import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isAdmin && isSignup && inputs.name.trim() === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-end">
          <Link to="/">
            <CloseRoundedIcon />
          </Link>
        </div>
        <h2 className="text-2xl text-center">
          {isSignup ? "Signup" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {!isAdmin && isSignup && (
            <div className="mb-4">
              <label className="block mb-1">Name*</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="text"
                name="name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1">Email*</label>
            <input
              value={inputs.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password*</label>
            <input
              value={inputs.password}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="password"
              name="password"
            />
          </div>
          <button
            className="bg-blue-700 text-white rounded-full px-6 py-3 w-full"
            type="submit"
          >
            {loading ? "Loading..." : isSignup ? "Signup" : "Login"}
          </button>
          {!isAdmin && (
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="mt-4 text-blue-700 hover:underline"
              type="button"
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </button>
          )}
          <p className="mt-2">
            <span className="text-red-500">*</span> Marked fields are mandatory
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
