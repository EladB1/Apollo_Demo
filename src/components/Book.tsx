import Author from './Author';

const Book = () => {
    return (
        <div className="container mt-5">
            <div className="row border">
                <h1>Book</h1>
            </div>
            <div className="row border bg-light">
                <p><span className="fw-bold">BookID:</span> book-1</p>
                <p><span className="fw-bold">Name:</span> Crime and Punishment</p>
                <p><span className="fw-bold">pageCount:</span> 300</p>
                <div className="p-2">
                    <Author authorID="author-1" firstname="Fyodor" lastname="Dostoevsky" />
                </div>
            </div>
        </div>
    );
};

export default Book;