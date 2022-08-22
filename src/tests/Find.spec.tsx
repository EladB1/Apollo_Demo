import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

import Find, { getAuthor, getBook } from '../components/Find';

describe('Search structure and functionality', () => {
    it('Verify page structure', () => {
        // doesn't matter if it's Book or Author for this test
        render(<Find type="Book"/>, {wrapper: MockedProvider});
        const header = screen.getByText('Find Book');
        const label = screen.getByText('BookID:');
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        expect(header).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(searchbox).toBeInTheDocument();
        expect(button).toHaveValue('Search');
    });

    it('Failed search - No input', () => {
        render(<Find type="Author"/>, {wrapper: MockedProvider});
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        userEvent.click(button);
        
        
        expect(searchbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        const error = screen.queryByText('Error: Failed to fetch');
        expect(error).not.toBeInTheDocument(); // search not valid. no action taken
    });

    it('Failed search - API Error', async () => {
        const mock = [
            {
                request: {
                    query: getAuthor,
                    variables: {id: 'author-12'}
                },
                error: new Error('Failed to fetch')
            }
        ];
        render(
            <MockedProvider mocks={mock} >
                <Find type="Author"/>
            </MockedProvider>
        );
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        userEvent.type(searchbox, 'author-12');
        userEvent.click(button);
        
        
        expect(searchbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
        const error = screen.getByText('Error: Failed to fetch');
        expect(error).toBeInTheDocument();
    });

    it('Failed search - no results', async () => {
        // Same for book and author 
        const id = 'author-12';
        const errorMsg = `Could not find author with ID '${id}'`;
        const mock = [
            {
                request: {
                    query: getAuthor,
                    variables: {id: id}
                },
                error: new Error(errorMsg)
            }
        ];
        render(
            <MockedProvider mocks={mock} >
                <Find type="Author"/>
            </MockedProvider>
        );
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        userEvent.type(searchbox, 'author-12');
        userEvent.click(button);
        
        
        expect(searchbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
        const error = screen.getByText(`Error: ${errorMsg}`);
        expect(error).toBeInTheDocument();
    });

    it('Successful search - Author', async () => {
        const mock = [
            {
                request: {
                    query: getAuthor,
                    variables: {id: 'author-12'}
                },
                result: {
                    data: {
                        authorById: {
                            id: 'author-12',
                            firstName: 'Isaac',
                            lastName: 'Asimov'
                        }
                    }
                } 
            }
        ];
        render(
            <MockedProvider mocks={mock} >
                <Find type="Author"/>
            </MockedProvider>,
            {wrapper: MemoryRouter}
        );
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        userEvent.type(searchbox, 'author-12');
        userEvent.click(button);
        
        
        expect(searchbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('author-12')).toBeInTheDocument();
        expect(screen.getByText('Isaac')).toBeInTheDocument();
        expect(screen.getByText('Asimov')).toBeInTheDocument();
    });

    it('Successful search - Book', async () => {
        const mock = [
            {
                request: {
                    query: getBook,
                    variables: {id: 'book-7'}
                },
                result: {
                    data: {
                        bookById: {
                            id: 'book-7',
                            name: 'Brave New World',
                            pageCount: '327',
                            author: {
                                id: 'author-4',
                                firstName: 'Aldous',
                                lastName: 'Huxley'
                            }
                        }
                    }
                } 
            }
        ];
        render(
            <MockedProvider mocks={mock} >
                <Find type="Book"/>
            </MockedProvider>,
            {wrapper: MemoryRouter}
        );
        const searchbox = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        userEvent.type(searchbox, 'book-7');
        userEvent.click(button);
        
        
        expect(searchbox).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
        expect(screen.getByText('Book')).toBeInTheDocument();
        expect(screen.getByText('book-7')).toBeInTheDocument();
        expect(screen.getByText('Brave New World')).toBeInTheDocument();
        expect(screen.getByText(327)).toBeInTheDocument();
        expect(screen.getByText('author-4')).toBeInTheDocument();
        expect(screen.getByText('Aldous')).toBeInTheDocument();
        expect(screen.getByText('Huxley')).toBeInTheDocument();
    })
});