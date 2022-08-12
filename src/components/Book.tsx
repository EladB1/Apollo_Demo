import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Author from './Author';
import { BookProps } from '../interfaces/BookProps';

const Book = (props: BookProps) => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    const extractDetailsAndRoute = (event: any) => {
        const children = event.target.parentNode.nextSibling.children;
        console.log(children);
        const [id, name, pageCount, authorID] = [...children].map((child: HTMLElement) => {
            return child.innerText.split(': ')[1]; // remove the labels
        });
        const entity: any = {
            type: 'Book',
            bookid: id,
            name: name,
            pageCount: pageCount,
            authorid: authorID.split('\n')[0] // without this, data is malformed due to nesting components
        };
        navigate(`/update/`, {state: entity});
    };

    return (
        <div className="container mb-2">
            <div className="row border d-flex justify-content-between">
                <h1 className="w-25">Book</h1>
                <div className="w-25 p-3 nav-link" style={{cursor: 'pointer'}} onClick={extractDetailsAndRoute}>Update</div>
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