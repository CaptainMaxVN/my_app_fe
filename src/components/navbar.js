import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const NavBar = () => {


    const renderLoginAndLogoutElement = user => {
        if (user.accessToken) {
            return (
                <>
                    <li className="nav-item">
                        <span className="navbar-text">
                            {user.username}
                        </span>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/logout" className="nav-link" id="logout" title="Logout"><i className="fas fa-power-off" /></NavLink>
                    </li>
                </>
            )
        }
        else {
            return <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
        }
    }

    return (
        <UserContext.Consumer>
            {({ user }) =>
                <div>
                    <nav className="navbar navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/"><i className="fas fa-star" />My App</a>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    {user.accessToken ? <NavLink to="/todo" className="nav-link">To Do</NavLink> : ''}
                                </li>
                            </ul>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {renderLoginAndLogoutElement(user)}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            }
        </UserContext.Consumer>
    )
}

export default NavBar;