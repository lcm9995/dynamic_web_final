import "./HeaderBar.css";
import { Link } from "react-router-dom";

export default function HeaderBar(props) {
    const {currentUser} = props;
    return (
        <header className="header-bar">

        <h1 className="header-title">Roommate Dashboard</h1>

        <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/lists">Lists</Link>
            <Link to="/calendar">Calendar</Link>
        </nav>

        {currentUser && (
            <div className="header-user">
            Logged in as <span>{currentUser.name}</span>
            </div>
        )}

        </header>
    );
}
