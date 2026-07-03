import "./Navbar.scss";
import { HiSparkles } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../../auth/hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        handleLogout
    } = useAuth();

    const logout = async () => {
        await handleLogout();
        navigate("/login");
    };

    return (

        <header className="navbar">

            <div
                className="logo"
                onClick={() => navigate("/")}
            >

                <HiSparkles className="logo-icon"/>

                <span>InterviewAI</span>

            </div>

            <nav className="nav-links">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>

                {user && (

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        All Reports
                    </NavLink>

                )}

            </nav>

            <div className="auth-section">

                {!user ? (

                    <>

                        <button
                            className="secondary-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>

                    </>

                ) : (

                    <>

                        <span className="user-name">
                            Hello, {user.username}
                        </span>

                        <button
                            className="primary-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </header>

    );

}