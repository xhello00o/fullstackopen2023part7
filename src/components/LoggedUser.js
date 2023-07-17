import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useUser, useUserDispatch } from "../UserContext";
import { AppBar, Toolbar,Menu, MenuItem,Button, Box, Typography } from "@mui/material";




const LoggedUser = () => {
  const navigate = useNavigate();
  const auth = useUser()
  console.log("🚀 ~ file: LoggedUser.js:9 ~ LoggedUser ~ auth:", auth)
  
  const userDispatch = useUserDispatch()

  const handleLogout = (event) => {
    console.log("logout");
    window.localStorage.clear();
    userDispatch({type:'setUser',payload:null})
    navigate("/");
  };

  return (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Box sx={{flexGrow:1}}>
                <Button color="inherit" key={'users'} component={Link} to={"/users"}>
                        Users
                    </Button>
                    <Button color='inherit' key={'blogs'} component={Link} to={"/"}>
                        Blogs
                    </Button>
                </Box>
                <Box sx={{flexGrow:1}}>
                    <Typography>
                        Welcome {auth.name}
                    </Typography>
                </Box>
                
                <Button color='inherit' key={'logout'} onClick={handleLogout} > Log Out </Button>
                           
            </Toolbar>

        </AppBar>
     

      
    </div>
  );
};

export default LoggedUser;
