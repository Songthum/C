// import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Typography
// } from '@mui/material';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import useScriptRef from 'hooks/useScriptRef';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';

// const FirebaseLogin = ({ onLoginSuccess, setUsername, ...others }) => {
//   const theme = useTheme();
//   const scriptedRef = useScriptRef();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleClickShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const onSubmit = async (values, { setErrors, setSubmitting }) => {
//     try {
//       const response = await axios.post("http://localhost:9999/auth/login", {
//         username: values.username,
//         password: values.password,
//       });
  
//       if (response && response.data) {
//         const { api_status, api_message, userInfo } = response.data;
  
//         if (api_status === "success") {
//           console.log("Login successful:", userInfo);
          

//           //
//           const payload = {
//             S_id: userInfo.username,
//             S_name: userInfo.displayname,
//             st_firstname_en: userInfo.firstname_en,
//             st_lastname_en: userInfo.lastname_en,
//             st_email: userInfo.email,
//             st_account_type: userInfo.account_type,
//             st_status: true,
//           };

//           //รอแก้




//           await axios.post("http://localhost:9999/students", payload);
//           // Redirect to the specified URL
//           window.location.href = "http://localhost:3000/free/studen/";
  
//           // Optional: Call onLoginSuccess if you still want to execute it
//           if (typeof onLoginSuccess === 'function') {
//             onLoginSuccess(); 
//           }
//         } else if {

//         }
        
//         else {
//           setError(api_message);
//         }
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrors({ submit: "Invalid username or password" });
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
  

//   return (
//     <>
//       <Grid container direction="column" justifyContent="center" spacing={2}>
//         <Grid item xs={12} container alignItems="center" justifyContent="center">
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">Sign in Icit Account</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Formik
//         initialValues={{
//           username: '', // Change email to username
//           password: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().max(255).required('Username is required'), // Update validation for username
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={onSubmit}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} {...others}>
//             <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel> {/* Change label to Username */}
//               <OutlinedInput
//                 id="outlined-adornment-username-login" // Change ID to reflect username
//                 value={values.username} // Change value to username
//                 name="username" // Change name to username
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 label="Username"
//               />
//               {touched.username && errors.username && (
//                 <FormHelperText error id="standard-weight-helper-text-username-login">
//                   {errors.username}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password-login"
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                       size="large"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//               {touched.password && errors.password && (
//                 <FormHelperText error id="standard-weight-helper-text-password-login">
//                   {errors.password}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             {errors.submit && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText error>{errors.submit}</FormHelperText>
//               </Box>
//             )}

//             <Box sx={{ mt: 2 }}>
//               <AnimateButton>
//                 <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
//                   Sign in
//                 </Button>
//               </AnimateButton>
//             </Box>
//             <Typography
//               component="a"
//               href="https://account.kmutnb.ac.th/web/recovery/index"
//               target="_blank"
//               rel="noopener noreferrer"
//               sx={{ mt: 2, display: 'block', color: '#EB6725', fontWeight: 'bold', textAlign: 'center' }}
//             >
//               Forgot ICIT Account Password
//             </Typography>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default FirebaseLogin;





// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Typography, Button, Box, TextField } from '@mui/material';

// // const FirebaseLogin = ({ onLoginSuccess }) => {
// //     const [username, setUsername] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, setError] = useState("");

// //     const onSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post("http://localhost:9999/auth/login", {
// //                 username,
// //                 password,
// //             });

// //             if (response && response.data) {
// //                 const { api_status, api_message, userInfo } = response.data;

// //                 if (api_status === "success") {
// //                     console.log("Login successful:", userInfo);
                    
// //                     // Call the onLoginSuccess prop to navigate
// //                     onLoginSuccess(); // This line calls the function passed from App component
// //                 } else {
// //                     setError(api_message);
// //                 }
// //             }
// //         } catch (error) {
// //             console.error("Error logging in:", error);
// //             setError("Invalid username or password");
// //         }
// //     };

// //     return (
// //         <Box
// //             sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 height: '100vh',
// //                 backgroundColor: '#f5f5f5',
// //             }}
// //         >
// //             <Box
// //                 sx={{
// //                     width: 300,
// //                     padding: 3,
// //                     backgroundColor: 'white',
// //                     borderRadius: 2,
// //                     boxShadow: 3,
// //                 }}
// //             >
// //                 <Typography variant="h5" gutterBottom align="center">
// //                     Login
// //                 </Typography>
// //                 <form onSubmit={onSubmit}>
// //                     <TextField
// //                         fullWidth
// //                         label="ICIT Account"
// //                         variant="outlined"
// //                         margin="normal"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                     />
// //                     <TextField
// //                         fullWidth
// //                         label="Password"
// //                         variant="outlined"
// //                         margin="normal"
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                     />
// //                     <Button
// //                         fullWidth
// //                         type="submit"
// //                         variant="contained"
// //                         color="primary"
// //                         sx={{ mt: 2 }}
// //                     >
// //                         Sign in
// //                     </Button>
// //                     {error && <Typography sx={{ mt: 2, color: 'red' }}>{error}</Typography>}
// //                 </form>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default FirebaseLogin;

// import { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Typography
// } from '@mui/material';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import useScriptRef from 'hooks/useScriptRef';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';

// const FirebaseLogin = ({ onLoginSuccess, setUsername, ...others }) => {
//   const theme = useTheme();
//   const scriptedRef = useScriptRef();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleClickShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const onSubmit = async (values, { setErrors, setSubmitting }) => {
//     try {
//       const response = await axios.post("http://localhost:9999/auth/login", {
//         username: values.username,
//         password: values.password,
//       });

//       if (response && response.data) {
//         const { api_status, api_message, userInfo } = response.data;

//         if (api_status === "success") {
//           console.log("Login successful:", userInfo);

//           // เก็บ username ใน Local Storage
//           localStorage.setItem("username", values.username);

//           // Redirect to the specified URL
//           window.location.href = "http://localhost:3000/free/studen/";

//           // Optional: Call onLoginSuccess if you still want to execute it
//           if (typeof onLoginSuccess === 'function') {
//             onLoginSuccess();
//           }
//         } else {
//           setError(api_message);
//         }
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrors({ submit: "Invalid username or password" });
//     } finally {
//       setSubmitting(false);
//     }
//   };




//   return (
//     <>
//       <Grid container direction="column" justifyContent="center" spacing={2}>
//         <Grid item xs={12} container alignItems="center" justifyContent="center">
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">Sign in Icit Account</Typography>
//           </Box>
//         </Grid>
//       </Grid>

//       <Formik
//         initialValues={{
//           username: '', // Change email to username
//           password: '',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().max(255).required('Username is required'), // Update validation for username
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={onSubmit}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit} {...others}>
//             <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel> {/* Change label to Username */}
//               <OutlinedInput
//                 id="outlined-adornment-username-login" // Change ID to reflect username
//                 value={values.username} // Change value to username
//                 name="username" // Change name to username
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 label="Username"
//               />
//               {touched.username && errors.username && (
//                 <FormHelperText error id="standard-weight-helper-text-username-login">
//                   {errors.username}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
//               <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password-login"
//                 type={showPassword ? 'text' : 'password'}
//                 value={values.password}
//                 name="password"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                       size="large"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//               {touched.password && errors.password && (
//                 <FormHelperText error id="standard-weight-helper-text-password-login">
//                   {errors.password}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             {errors.submit && (
//               <Box sx={{ mt: 3 }}>
//                 <FormHelperText error>{errors.submit}</FormHelperText>
//               </Box>
//             )}

//             <Box sx={{ mt: 2 }}>
//               <AnimateButton>
//                 <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
//                   Sign in
//                 </Button>
//               </AnimateButton>
//             </Box>
//             <Typography
//               component="a"
//               href="https://account.kmutnb.ac.th/web/recovery/index"
//               target="_blank"
//               rel="noopener noreferrer"
//               sx={{ mt: 2, display: 'block', color: '#EB6725', fontWeight: 'bold', textAlign: 'center' }}
//             >
//               Forgot ICIT Account Password
//             </Typography>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default FirebaseLogin;


import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Link, Box } from "@mui/material";

const FirebaseLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/auth/login", {
        username,
        password,
      });

      if (response && response.data) {
        const { api_status, api_message, userInfo } = response.data;

        if (api_status === "success") {
          console.log("Login successful:", userInfo);
          
          // ตัด "s" ออกจาก S_id
          const S_id = userInfo.username.startsWith("s") ? userInfo.username.substring(1) : userInfo.username;
          console.log("Modified S_id: ", S_id);
          
          // บันทึก username ลงใน localStorage
          localStorage.setItem("username", userInfo.username); 

          if (userInfo.account_type === "students") {
            const studentPayload = {
              S_status: true, // กำหนด S_status ให้เป็น true
            };
          
            // เรียก API PUT เพื่ออัปเดตสถานะนักเรียนที่มีอยู่
            await axios.put(`http://localhost:9999/students/${S_id}/status`, studentPayload);
            localStorage.setItem("S_id", S_id); // จัดเก็บ S_id ที่ถูกตัดลงใน localStorage
            if (typeof onLoginSuccess === 'function') {
              onLoginSuccess();
            }
            window.location.href = "http://localhost:3000/free/studen/";
          }
           else if (userInfo.account_type === "admin") {
            const AdminPayload = {
              A_id: userInfo.username,
              A_name: userInfo.displayname,
            };

            await axios.post("http://localhost:9999/admins", AdminPayload);
            localStorage.setItem("A_id", userInfo.username);
            window.location.href = "http://localhost:3000/free/staff/";
          } else if (userInfo.account_type === "teachers") {
            const TeacherPayload = {
              T_id: userInfo.username,
              T_name: userInfo.displayname,
            };

            await axios.post("http://localhost:9999/teachers", TeacherPayload);
            localStorage.setItem("T_id", userInfo.username);
            window.location.href = "http://localhost:3000/free/teacher/";
          }

        } else {
          setError(api_message);
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <center>
      <Box
        sx={{
          width: 300,
          marginTop: "2rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={onSubmit}>
          <Typography variant="h6" gutterBottom>
            ICIT Account Login
          </Typography>
          <TextField
            fullWidth
            label="ICIT Account"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Link
            href="https://account.kmutnb.ac.th/web/recovery/index"
            target="_blank"
            underline="hover"
            sx={{
              color: "#EB6725",
              fontWeight: "bold",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Forgot ICIT Account Password
          </Link>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign in
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </center>
  );
};

export default FirebaseLogin;
