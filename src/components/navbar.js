import React from "react";
import { UserContext } from "../context/UserContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
        setAnchorEl(null);
      };

    function onLogout() {
        handleMenuClose();
        window.location = process.env.REACT_APP_LOGOUT_PATH;
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem href="/logout" onClick={onLogout}>LOG OUT</MenuItem>
        </Menu>
    );

    const renderLoginAndLogoutElement = user => {
        if (user.accessToken) {
            return (
                <>
                    <Button color="inherit" size="large" edge="end" onClick={handleProfileMenuOpen} startIcon={<AccountCircle/>}> {user.username}</Button>
                </>
            )
        }
        else {
            return <Button href="/login" color="inherit" size="large" edge="end">Login</Button>
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
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {renderLoginAndLogoutElement(user)}
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                </Box>
            }
        </UserContext.Consumer>
    )
}

export default NavBar;