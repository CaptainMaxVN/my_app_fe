import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import React, { useContext } from 'react';
const NavBar = () => {
    const { user } = useContext(UserContext)
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><i className="fas fa-star" />My App</a>
                    {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            {user.accessToken ?
                                
                            }
                        </li>
                    </ul> */}
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {user.accessToken ?
                                    <Link to="/logout" className="nav-link" id="logout" title="Logout"><i className="fas fa-power-off" /></Link>
                                    :
                                    <Link to="/login" className="nav-link">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;