import Author from './Author';

import { BookProps } from '../interfaces/BookProps';

const Book = (props: BookProps) => {
    return (
        <div className="container">
            <div className="row border">
                <h1>Book</h1>
            </div>
            <div className="row border bg-light">
                <p><span className="fw-bold">BookID:</span> {props.bookID}</p>
                <p><span className="fw-bold">Name:</span> {props.name}</p>
                <p><span className="fw-bold">pageCount:</span> {props.pageCount}</p>
                <div className="p-2">
                    <Author 
                        authorID={props.authorID}
                        firstname={props.authorFirstName}
                        lastname={props.authorLastName}
                    />
                </div>
            </div>
        </div>
    );
};

export default Book;