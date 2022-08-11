import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="container-fluid bg-info mb-3">
            <div className="row">
                <nav className="navbar ps-5 pe-5">
                    <Link to="/" className="navbar-brand">Logo</Link>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/search/author" className="nav-link">Search Author</Link>
                    <Link to="/search/book" className="nav-link">Search Book</Link>
                    <Link to="/create" className="nav-link">Create</Link>
                    <Link to="/update" className="nav-link">Update</Link>
                    <Link to="/delete" className="nav-link">Delete</Link>
                </nav>
            </div>
        </div>
    );
};

export default Nav;