import React from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp';
import Link from '@mui/material/Link';
const NavBar = () => {

    const renderLoginAndLogoutElement = user => {
        if (user.accessToken) {
            return (
                <>
                    <span >
                        {user.username}
                    </span>
                    <Button href="/logout" color="inherit">Logout</Button>
                </>
            )
        }
        else {
            return <Button href="/login" color="inherit">Login</Button>
        }
    }

    return (
        <UserContext.Consumer>
            {({ user }) =>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                href="/"
                                startIcon={<StarBorderPurple500SharpIcon />}
                            >
                                Home
                            </Button>
                            <Button href="/todo" color="inherit">To Do</Button>
                            {renderLoginAndLogoutElement(user)}
                        </Toolbar>
                    </AppBar>
                </Box>
            }
        </UserContext.Consumer>
    )
}

export default NavBar;