import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthorProps } from '../interfaces/AuthorProps';

const Author = (props: AuthorProps) => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    const extractDetailsAndRoute = (event: any) => {
        const children = event.target.parentNode.nextSibling.children;
        const [id, first, last] = [...children].map((child: HTMLElement) => {
            return child.innerText.split(': ')[1]; // remove the labels
        });
        const entity: any = {
            type: 'Author',
            authorid: id,
            firstname: first,
            lastname: last
        };
        navigate(`/update/`, {state: entity});
    };

    return (
        <div className="container">
            <div className="row border mt-1 bg-secondary justify-content-between">
                <h1 className="w-25">Author</h1>
                <div className="w-25 p-3 nav-link" style={{cursor: 'pointer'}} onClick={extractDetailsAndRoute}>Update</div>
                <Link className="w-25 p-3 nav-link" to={`/delete/author/${props.authorID}`}>Delete</Link>
                <div 
                    className="fw-bold fs-1 w-25 text-end minimizer"
                    onClick={() => setVisible(!visible)}
                >-</div>
            </div>
            <div className={`row border bg-light ${visible ? 'visible' : 'collapse'}`}>
                <p><span className="fw-bold">ID:</span> {props.authorID}</p>
                <p><span className="fw-bold">First name:</span> {props.firstname}</p>
                <p><span className="fw-bold">Last name:</span> {props.lastname}</p>
            </div>
        </div>
    );
};

export default Author;