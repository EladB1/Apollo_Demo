import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

import Author from './Author';
import Book from './Book';
import ErrorPage from './ErrorPage';

export const createBook = gql`
    mutation CreateBook($id: ID!, $name: String!, $pageCount: Int!, $authorID: ID!) {
        createBook(id: $id, name: $name, pageCount: $pageCount, authorID: $authorID) {
            id,
            name,
            pageCount,
            author {
                id,
                firstName,
                lastName
            }
        }
    }
`;

export const createAuthor = gql`
    mutation CreateAuthor($id: ID!, $firstname: String!, $lastname: String!) {
        createAuthor(id: $id, firstName: $firstname, lastName: $lastname) {
            id,
            firstName,
            lastName
        }
    }
`;

const CreateForm = () => {
    const [selected, setSelected] = useState<string>('');
    const [runCreateBook, {loading: bookLoading, error: bookError, data: bookData}] = useMutation(createBook, {errorPolicy: 'all'});
    const [runCreateAuthor, {loading: authorLoading, error: authorError, data: authorData}] = useMutation(createAuthor, {errorPolicy: 'all'});
    
    const formSubmit = (event: any) => {
        event.preventDefault();
        let vars;
        if (selected === 'Book') {
            const {bookID, name, pages, authorID} = event.target.elements;
            vars = {
                variables: {
                    id: bookID.value,
                    name: name.value,
                    pageCount: pages.value,
                    authorID: authorID.value
                }
            };
            runCreateBook(vars);
        }
        else if (selected === 'Author') {
            const {authorID, first, last} = event.target.elements;
            vars = {
                variables: {
                    id: authorID.value,
                    firstname: first.value,
                    lastname: last.value
                }
            };
            runCreateAuthor(vars);
        }
    };
    
    return (
        <div className="container">
            <div className="row">
                <select className="form-select mb-3" onChange={(event: any) => setSelected(event.target.value)}>
                    <option className="dropdown-item" value="">Select Entity</option>
                    <option className="dropdown-item" value="Book">Book</option>
                    <option className="dropdown-item" value="Author">Author</option>
                </select>
            </div>
            <div className="row">
                {selected === '' ? 
                    <p className="help-block text-secondary">
                        Please use the dropdown to select an entity.
                    </p> :
                    <div><h2 className="text-center display-2">Create {selected}</h2>
                    <form className="w-50 border mx-auto bg-light p-2" onSubmit={formSubmit}>
                        {selected === 'Book' &&
                            <div>
                                <div className="form-group">
                                    <label htmlFor="bookID">Book ID:</label>
                                    <input className="form-control" type="text" name="bookID" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input className="form-control" type="text" name="name" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pages">Page Count:</label>
                                    <input className="form-control" type="text" name="pages" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="authorID">Author ID:</label>
                                    <input className="form-control" type="text" name="authorID" required/> 
                                </div>
                            </div>
                        }
                        {selected === 'Author' && 
                            <div>
                                <div className="form-group">
                                    <label htmlFor="authorID">Author ID:</label>
                                    <input className="form-control" type="text" name="authorID" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="first">First Name:</label>
                                    <input className="form-control" type="text" name="first" required/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last">Last Name:</label>
                                    <input className="form-control" type="text" name="last" required/> 
                                </div>
                            </div>
                        }
                        <input className="btn btn-warning mt-2" type="submit" value="Create" />
                    </form></div>
                }
            </div>
            <div className="row mt-3">
                {selected === 'Author' && 
                    <div>
                        {authorLoading && <p>Loading...</p>}
                        {authorError && 
                            <ErrorPage 
                                statusCode={authorError.toString().includes('Failed') ? 500 : 400} 
                                message={authorError.toString()} 
                            />
                        }
                        {authorData && <div>
                            <p className="text-success">Author created!</p>
                            <Author 
                                authorID={authorData.createAuthor.id} 
                                firstname={authorData.createAuthor.firstName}
                                lastname={authorData.createAuthor.lastName}
                            />
                        </div>}
                    </div>
                }
                {selected === 'Book' && 
                    <div>
                        {bookLoading && <p>Loading...</p>}
                        {bookError && 
                            <ErrorPage 
                                statusCode={bookError.toString().includes('Failed') ? 500 : 400} 
                                message={bookError.toString()} 
                            />
                        }
                        {bookData && <div>
                            <p className="text-success">Book created!</p>
                            <Book 
                                bookID={bookData.createBook.id}
                                name={bookData.createBook.name}
                                pageCount={bookData.createBook.pageCount}
                                authorID={bookData.createBook.author.id} 
                                authorFirstName={bookData.createBook.author.firstName}
                                authorLastName={bookData.createBook.author.lastName}
                            />
                        </div>}
                    </div>
                }
            </div>
        </div>
    );
};

export default CreateForm;