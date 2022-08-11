import { useState } from 'react';
import { Link } from 'react-router-dom';

import Author from './Author';
import { BookProps } from '../interfaces/BookProps';

const Book = (props: BookProps) => {
    const [visible, setVisible] = useState(true);

    return (
        <div className="container mb-2">
            <div className="row border d-flex justify-content-between">
                <h1 className="w-25">Book</h1>
                <Link className="w-25 p-3 nav-link" to={`/update/book/${props.bookID}`}>Update</Link>
                <Link className="w-25 p-3 nav-link" to={`/delete/book/${props.bookID}`}>Delete</Link>
                <div 
                    className="fw-bold fs-1 w-25 text-end minimizer"
                    onClick={() => setVisible(!visible)}
                >-</div>
            </div>
            <div className={`row border bg-light ${visible ? 'visible' : 'collapse'}`}>
                <p><span className="fw-bold">BookID:</span> {props.bookID}</p>
                <p><span className="fw-bold">Name:</span> {props.name}</p>
                <p><span className="fw-bold">pageCount:</span> {props.pageCount}</p>
                <div className="p-2">
                    <Author
                        key={`${props.authorID}.${props.bookID}`}
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