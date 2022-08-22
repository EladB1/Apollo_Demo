import { useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import Author from './Author';
import Book from './Book';
import ErrorPage from './ErrorPage';

export const updateAuthor = gql`
    mutation UpdateAuthor($id: ID!, $firstname: String, $lastname: String) {
        updateAuthor(id: $id, firstName: $firstname, lastName: $lastname) {
            id,
            firstName,
            lastName
        }
    }
`;

export const updateBook = gql`
    mutation UpdateBook($id: ID!, $name: String, $pageCount: Int, $authorID: ID) {
        updateBook(id: $id, name: $name, pageCount: $pageCount, authorID: $authorID) {
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

const UpdateForm = () => {
    const location = useLocation();
    const data: any = location.state;
    const [runUpdateAuthor, {loading: authorLoading, error: authorError, data: authorData}] = useMutation(updateAuthor, {errorPolicy: 'all'});
    const [runUpdateBook, {loading: bookLoading, error: bookError, data: bookData}] = useMutation(updateBook, {errorPolicy: 'all'});
    
    if (data == null)
        return <ErrorPage 
            statusCode={500} 
            message={'Could not find data; you may have imporperly routed here. Please contact an administrator'} 
        />;

    const handleAuthorUpdate = (event: any) => {
        event.preventDefault();
        //console.log(event.target.elements);
        const vars = {variables: {
            id: event.target.elements.authorID.value,
            firstname: event.target.elements.first.value,
            lastname: event.target.elements.last.value,

        }};
        runUpdateAuthor(vars);
    };

    const handleBookUpdate = (event: any) => {
        event.preventDefault();
        //console.log(event.target.elements);
        const vars = {variables: {
            id: event.target.elements.bookID.value,
            name: event.target.elements.name.value,
            pageCount: event.target.elements.pages.value,
            authorID: event.target.elements.authorID.value,

        }};
        runUpdateBook(vars);
    };

    return (
        <div className="container">
            <div className="row">
                <h3 className="display-3 text-center">Update {data.type}</h3>
                <hr />
            </div>
            <div className="row">
                {data.type === 'Author' && <div>
                    <form onSubmit={handleAuthorUpdate}>
                        <div className="form-group">
                            <label htmlFor="authorID">Author ID: </label>
                            <input type="text" name="authorID" className="form-control" defaultValue={data.authorid} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="first">First name: </label>
                            <input type="text" name="first" className="form-control" defaultValue={data.firstname} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last">Last name: </label>
                            <input type="text" name="last" className="form-control" defaultValue={data.lastname} required/>
                        </div>
                        <input type="submit" className="btn btn-dark mt-3" value="Update" />
                    </form>
                </div>}
                {data.type === 'Book' && <div>
                    <form onSubmit={handleBookUpdate}>
                        <div className="form-group">
                            <label htmlFor="bookID">Book ID: </label>
                            <input type="text" name="bookID" className="form-control" defaultValue={data.bookid} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" className="form-control" defaultValue={data.name} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pages">Page Count: </label>
                            <input type="text" name="pages" className="form-control" defaultValue={data.pageCount} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="authorID">Author ID: </label>
                            <input type="text" name="authorID" className="form-control" defaultValue={data.authorid} required/>
                        </div>
                        <input type="submit" className="btn btn-dark mt-3" value="Update" />
                    </form>
                </div>}
            </div>
            <div className="row mt-3">
                {authorLoading && <p>Loading...</p>}
                {authorError && 
                    <ErrorPage 
                        statusCode={authorError.toString().includes('Failed') ? 500 : 400} 
                        message={authorError.toString()} 
                    />
                }
                {authorData && <div>
                    <p className="text-success fs-3">Author Updated</p>
                    <Author 
                        authorID={authorData.updateAuthor.id}
                        firstname={authorData.updateAuthor.firstName}
                        lastname={authorData.updateAuthor.lastName}
                    />
                </div>}
            </div>
            <div className="row mt-3">
                {bookLoading && <p>Loading...</p>}
                {bookError && 
                    <ErrorPage 
                        statusCode={bookError.toString().includes('Failed') ? 500 : 400} 
                        message={bookError.toString()} 
                    />
                }
                {bookData && <div>
                    <p className="text-success fs-3">Book Updated</p>
                    <Book 
                        bookID={bookData.updateBook.id}
                        name={bookData.updateBook.name}
                        pageCount={bookData.updateBook.pageCount}
                        authorID={bookData.updateBook.author.id}
                        authorFirstName={bookData.updateBook.author.firstName}
                        authorLastName={bookData.updateBook.author.lastName}
                    />
                </div>}
            </div>
        </div>
    );
};

export default UpdateForm;