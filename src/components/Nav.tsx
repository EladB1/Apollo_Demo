import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="container-fluid bg-info">
            <div className="row">
                <nav className="navbar ps-5 pe-5">
                    <Link to="/" className="navbar-brand">Logo</Link>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/book" className="nav-link">Book</Link>
                </nav>
            </div>
        </div>
    );
};

export default Nav;