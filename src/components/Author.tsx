import { useQuery, gql } from '@apollo/client';
//import { useState } from 'react';

const getAuthor = gql`
    query AuthorByID($id: ID!) {
        authorById(id: $id) {
            id,
            firstName,
            lastName
        }
    }
`;

const Author = (props: AuthorProps) => {
    const { loading, error, data } = useQuery(getAuthor, {variables: {id: props.authorID}});
    console.log(`Loading: ${loading}`);
    console.log(`Error: ${error}`);
    console.log(`Data: ${JSON.stringify(data)}`);
    //console.log(data.authorById.firstName);
    return (
        <div className="container">
            <div className="row border mt-1 bg-secondary">
                <h1>Author</h1>
            </div>
            <div className="row border bg-light">
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching author</p>}
                {data && (<div>
                    <p><span className="fw-bold">ID:</span> {props.authorID}</p>
                    <p><span className="fw-bold">First name:</span> {data.authorById.firstName}</p>
                    <p><span className="fw-bold">Last name:</span> {data.authorById.lastName}</p>
                </div>)}
            </div>
        </div>
    );
};

interface AuthorProps {
    authorID: string,
    firstname?: string,
    lastname?: string
};

export default Author;