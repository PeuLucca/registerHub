// Core
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Style
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Layout
import LogOff from '../layout/LogOff';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";

const TopBar = () => {
    const navigate = useNavigate();  

    // Style
    const linkStyle = {
        fontSize: '17px',
    };

    const logoffLinkStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    const handleLogoff = async () => {
        try{
            await signOut(auth);
            navigate("/");
        }catch(e){
            console.error(e);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" style={{ marginBottom: '1em', padding: '25px' }}>
            <Container>
                <Navbar.Brand>
                    <h2>Register Hub</h2>
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <Nav.Link as={NavLink} to="/cadastro" style={linkStyle}>
                        Cadastro
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/lista" style={linkStyle}>
                        Lista de pessoas
                    </Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link onClick={handleLogoff} style={logoffLinkStyle}>
                        <LogOff style={{ fontSize: "25px" }} />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default TopBar;