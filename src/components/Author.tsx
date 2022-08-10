const Author = () => {
    let authorID = 'author-1';
    let firstname = 'Fyodor';
    let lastname = 'Dostoevsky';
    return (
        <div className="container">
            <div className="row border mt-1 bg-secondary">
                <h1>Author</h1>
            </div>
            <div className="row border bg-light">
                <p><span className="fw-bold">ID:</span> {authorID}</p>
                <p><span className="fw-bold">First name:</span>{firstname}</p>
                <p><span className="fw-bold">Last name:</span> {lastname}</p>
            </div>
        </div>
    );
};

export default Author;