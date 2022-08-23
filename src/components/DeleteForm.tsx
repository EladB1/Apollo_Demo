import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

import ErrorPage from './ErrorPage';

export const deleteBook = gql`
    mutation DeleteBookById($id: ID!) {
        deleteBook(id: $id) {
            id,
            name
        }
    }
`;

export const deleteAuthor = gql`
    mutation DeleteAuthorById($id: ID!) {
        deleteAuthor(id: $id) {
            id,
            firstName,
            lastName
        }
    }
`;

const DeleteForm = () => {
    const { entity, id } = useParams();
    const [ clickedYes, setClickedYes ] = useState(false);
    const navigate = useNavigate();
    const [runDeleteBook, {loading: bookLoading, error: bookError, data: bookData}] = useMutation(deleteBook, {errorPolicy: 'all'});
    const [runDeleteAuthor, {loading: authorLoading, error: authorError, data: authorData}] = useMutation(deleteAuthor, {errorPolicy: 'all'});

    const deleteEntity = (event: any) => {
        setClickedYes(true);
        if (entity === 'book') {
            runDeleteBook({variables: {id: id}});
        }
        else if (entity === 'author') {
            runDeleteAuthor({variables: {id: id}});
        }

        setTimeout(() => {
            navigate('/');
        }, 5000);

    };

    return (
        <div className="container">
            {!clickedYes ? <div className="row">
                <p>Are you sure you want to delete {entity} with ID '{id}'?</p>
                <button className="w-25 btn btn-danger me-2" onClick={deleteEntity}>Yes</button>
                <button className="w-25 btn btn-primary" onClick={() => navigate('/')}>No</button>
            </div> :
            <p>Deleting {entity} with ID '{id}'...</p>
            }
            <div className="row">
                {bookLoading && <p>Loading...</p>}
                {bookError && 
                    <ErrorPage statusCode={bookError.toString().includes('Failed') ? 500: 400} message={bookError.toString()}/>
                }
                {bookData && 
                    <div>
                        <p className="display-4">Deleted Book</p>
                        <p><span className="fw-bold">ID: </span>{id}</p>
                        <p><span className="fw-bold">Name: </span>{bookData.deleteBook.name}</p>
                    </div> 
                }
            </div>
            <div className="row">
                {authorLoading && <p>Loading...</p>}
                {authorError && 
                    <ErrorPage statusCode={authorError.toString().includes('Failed') ? 500 : 400} message={authorError.toString()}/>
                }
                {authorData && 
                    <div>
                        <p className="display-4">Deleted Author</p>
                        <p><span className="fw-bold">ID: </span>{id}</p>
                        <p><span className="fw-bold">First Name: </span>{authorData.deleteAuthor.firstName}</p>
                        <p><span className="fw-bold">Last Name: </span>{authorData.deleteAuthor.lastName}</p>
                    </div> 
                }
            </div>
        </div>
    );
};

export default DeleteForm;