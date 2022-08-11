import { useState } from 'react';

import { AuthorProps } from '../interfaces/AuthorProps';

const Author = (props: AuthorProps) => {
    const [visible, setVisible] = useState(true);

    return (
        <div className="container">
            <div className="row border mt-1 bg-secondary justify-content-between">
                <h1 className="w-25">Author</h1>
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