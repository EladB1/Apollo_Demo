import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="container-fluid bg-info mb-3">
            <div className="row">
                <nav className="navbar ps-5 pe-5">
                    <NavLink to="/" className="navbar-brand">Logo</NavLink>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/search/author" className="nav-link">Search Author</NavLink>
                    <NavLink to="/search/book" className="nav-link">Search Book</NavLink>
                    <NavLink to="/create" className="nav-link">Create</NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Nav;