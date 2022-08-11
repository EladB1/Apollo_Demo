import { useLazyQuery, gql } from '@apollo/client';
import { useState } from 'react';

import Author from './Author';
import Book from './Book';

const getAllAuthors = gql`
    query {
        allAuthors {
            id,
            firstName,
            lastName
        }
    }
`;

const getAllBooks = gql`
    query {
        allBooks {
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

const ListAll = () => {
    const [selected, setSelected] = useState<string>('');
    const [listBooks, {loading: bookLoading, error: bookError, data: bookData}] = useLazyQuery(getAllBooks);
    const [listAuthors, {loading: authorLoading, error: authorError, data: authorData}] = useLazyQuery(getAllAuthors);


    const selectOption = async (event: any) => {
        const value = event.target.value;
        setSelected(value);
        if (value === 'Books') {
            listBooks();
        }
        else if (value === 'Authors') {
            listAuthors();
        }
    };

    
    return (
        <div className="container">
            <div className="row mb-5">
                <div className="dropdown">
                    <select onChange={selectOption} className="form-select bg-primary text-white w-50">
                        <option className="dropdown-item" value="">List</option>
                        <option className="dropdown-item" value="Books">Books</option>
                        <option className="dropdown-item" value="Authors">Authors</option>
                    </select>
                </div>
            </div>
            {selected === 'Books' && <div className="row mt-5 text-wrap word-break">
                {bookLoading && <p>Loading...</p>}
                {bookError && <p>{bookError.toString()}</p>}
                {bookData && 
                    <div>{
                        bookData.allBooks.map((data: any) => {
                            return <div className="mb-1">
                                <Book 
                                    key={data.id}
                                    bookID={data.id}
                                    name={data.name}
                                    pageCount={data.pageCount} 
                                    authorID={data.author.id} 
                                    authorFirstName={data.author.firstName} 
                                    authorLastName={data.author.lastName}
                                />
                            </div>
                        })
                    }</div>
                }
            </div>}
            {selected === 'Authors' && <div className="row mt-5 text-wrap word-break">
                {authorLoading && <p>Loading...</p>}
                {authorError && <p>{authorError.toString()}</p>}
                {authorData && 
                    <div>{ 
                        authorData.allAuthors.map((data: any) => {
                            return <div className="mb-1">
                                <Author 
                                key={data.id} 
                                authorID={data.id} 
                                firstname={data.firstName} 
                                lastname={data.lastName} 
                                />
                            </div>;
                        })
                    }</div>
                }
            </div>}
        </div>
    );
};

export default ListAll;