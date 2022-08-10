import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

import Author from './Author';
import Book from './Book';

const getAuthor = gql`
    query AuthorByID($id: ID!) {
        authorById(id: $id) {
            id,
            firstName,
            lastName
        }
    }
`;

const getBook = gql`
    query BookByID($id: ID!) {
        bookById(id: $id) {
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

const Find = (props: any) => {
    const [ID, setID] = useState('');

    const query = props.type === 'Author' ? getAuthor : getBook;
    const { loading, error, data } = useQuery(query, {variables: {id: ID}});

    const search = (event: any) => {
        event.preventDefault();
        setID(event.target.elements.ID.value);
    };

    useEffect(() => {
        setID(''); // need to do this when navigating between search pages to clear out errors
    }, [props.type]);

    return (
        <div className="container">
            <div className="row">
                <h2 className="display-2 text-center">Find {props.type}</h2>
            </div>
            <div className="row mt-5">
                <form className="d-flex flex-row flex-wrap align-items-center" onSubmit={search}>
                    <div className="form-group me-2">
                        <label htmlFor="ID" className="me-2">{`${props.type}ID:`}</label>
                        <input type="text" name="ID" placeholder={`${props.type.toLowerCase()}-11`}/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Search" />
                </form>
            </div>
            <div className="row mt-5">
                <hr />
                {ID === '' ? <></> : <div className="mt-5">
                    {loading && <p>Loading...</p>}
                    {error && <pre className="text-danger fs-3">{error.toString()}</pre>}
                    {data && (props.type === 'Author' ?
                        <Author 
                            authorID={ID} 
                            firstname={data.authorById.firstName} 
                            lastname={data.authorById.lastName}
                        /> :
                        <Book 
                            bookID={ID}
                            name={data.bookById.name}
                            pageCount={data.bookById.pageCount}
                            authorID={data.bookById.author.id}
                            authorFirstName={data.bookById.author.firstName}
                            authorLastName={data.bookById.author.lastName}
                        />
                    )}
                </div>
                }
            </div>
        </div>
    );
};

export default Find;