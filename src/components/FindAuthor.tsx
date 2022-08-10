import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

import Author from './Author';

const getAuthor = gql`
    query AuthorByID($id: ID!) {
        authorById(id: $id) {
            id,
            firstName,
            lastName
        }
    }
`;

const FindAuthor = () => {
    const [authorID, setAuthorID] = useState('');
    const { loading, error, data } = useQuery(getAuthor, {variables: {id: authorID}});
    console.log(`Loading: ${loading}`);
    console.log(`Error: ${error}`);
    console.log(`Data: ${JSON.stringify(data)}`);

    const searchAuthor = (event: any) => {
        event.preventDefault();
        setAuthorID(event.target.elements.authorID.value);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <form className="d-flex flex-row flex-wrap align-items-center" onSubmit={searchAuthor}>
                    <div className="form-group me-2">
                        <label htmlFor="authorID" className="me-2">AuthorID:</label>
                        <input type="text" name="authorID" placeholder="author-11"/>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Search" />
                </form>
            </div>
            <div className="row mt-5">
                <hr />
                {authorID === '' ? <></> : <div className="mt-5">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error.toString()}</p>}
                    {data && 
                        <Author 
                            authorID={authorID} 
                            firstname={data.authorById.firstName} 
                            lastname={data.authorById.lastName}/
                        >
                    }
                
                </div>}
            </div>
        </div>
    );
};

export default FindAuthor;