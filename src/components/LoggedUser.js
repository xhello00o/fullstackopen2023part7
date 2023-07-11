import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/loginReducer";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Navbar, Nav,Container,Button } from "react-bootstrap";

const LoggedUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => {
    return auth;
  });

  const handleLogout = (event) => {
    console.log("logout");
    window.localStorage.clear();
    dispatch(setUser({ user: null, error: null }));
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="secondary" variant="dark">
      <Container>
        
        <Navbar.Text>Welcome {auth.user.name}! </Navbar.Text>
          <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/users" eventKey={'users'}>
              Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/" eventKey={'blogs'}>
              Blogs
            </Nav.Link>
          </Nav.Item>
          </Nav>
      <Button variant="light" onClick={handleLogout}>Log out</Button>
      </Container>
      </Navbar>
     

      
    </div>
  );
};

export default LoggedUser;
