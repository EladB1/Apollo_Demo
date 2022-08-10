import { AuthorProps } from '../interfaces/AuthorProps';

const Author = (props: AuthorProps) => {
    return (
        <div className="container">
            <div className="row border mt-1 bg-secondary">
                <h1>Author</h1>
            </div>
            <div className="row border bg-light">
                <p><span className="fw-bold">ID:</span> {props.authorID}</p>
                <p><span className="fw-bold">First name:</span> {props.firstname}</p>
                <p><span className="fw-bold">Last name:</span> {props.lastname}</p>
            </div>
        </div>
    );
};

export default Author;