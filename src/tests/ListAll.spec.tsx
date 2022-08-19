import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import ListAll, { getAllAuthors, getAllBooks } from '../components/ListAll';

describe('Test ListAll feature', () => {
    it('No option selected', () => {
        render(<ListAll />, {wrapper: MockedProvider});
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const first: any = options[0]; // need this to check the first option is selected
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('List');
        expect(first.selected).toBe(true);
        expect(options[1]).toHaveTextContent('Books');
        expect(options[2]).toHaveTextContent('Authors');
        expect(dropdown).toBeInTheDocument();
        expect(screen.queryAllByText('Book')).toHaveLength(0);
        expect(screen.queryAllByText('Author')).toHaveLength(0);
    });

    it('Books selected no data', async () =>  {
        const mock = [{
            request: {
                query: getAllBooks
            },
            result: {
                data: {
                    allBooks: []
                }
            }
        }];
        render(
            <MockedProvider mocks={mock}>
                <ListAll />
            </MockedProvider>
        );
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const second: any = options[1];
        userEvent.selectOptions(dropdown, second);
        expect(second).toHaveTextContent('Books');
        expect(second.selected).toBe(true);
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        expect(screen.queryAllByText('Book')).toHaveLength(0);
        expect(screen.queryAllByText('Author')).toHaveLength(0);
    });

    it('Books selected with data', async () => {
        const mock = [{
            request: {
                query: getAllBooks
            },
            result: {
                data: {
                    allBooks: [
                        {
                            "id": "book-3",
                            "name": "Shadow Over Innsmouth",
                            "pageCount": 512,
                            "author": {
                                "id": "author-3",
                                "firstName": "HP",
                                "lastName": "Lovecraft"
                            }
                        },
                        {
                            "id": "book-2",
                            "name": "Invisible Man",
                            "pageCount": 487,
                            "author": {
                                "id": "author-1",
                                "firstName": "Ralph",
                                "lastName": "Ellison"
                            }
                        }
                    ]
                }
            }
        }];
        render(
            <MockedProvider mocks={mock}>
                <ListAll />
            </MockedProvider>, {wrapper: MemoryRouter}
        );
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const second: any = options[1];
        userEvent.selectOptions(dropdown, second);
        expect(second).toHaveTextContent('Books');
        expect(second.selected).toBe(true);
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        expect(screen.queryAllByText('Book')).toHaveLength(2);
        expect(screen.queryAllByText('Author')).toHaveLength(2);
    });

    it('Handle Error', async() => {
        // Should work the same for both Book and Author
        const mock = [{
            request: {
                query: getAllBooks
            },
            error: new Error("Some error")
        }];
        render(
            <MockedProvider mocks={mock}>
                <ListAll />
            </MockedProvider>
        );
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const second: any = options[1];
        userEvent.selectOptions(dropdown, second);
        expect(second).toHaveTextContent('Books');
        expect(second.selected).toBe(true);
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        expect(screen.queryAllByText('Book')).toHaveLength(0);
        expect(screen.queryAllByText('Author')).toHaveLength(0);
        expect(screen.getByText(500)).toBeInTheDocument();
        expect(screen.getByText('Error: Some error')).toBeInTheDocument();
    });

    it('Authors selected no data', async () => {
        const mock = [{
            request: {
                query: getAllAuthors
            },
            result: {
                data: {
                    allAuthors: []
                }
            }
        }];
        render(
            <MockedProvider mocks={mock}>
                <ListAll />
            </MockedProvider>
        );
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const second: any = options[2];
        userEvent.selectOptions(dropdown, second);
        expect(second).toHaveTextContent('Authors');
        expect(second.selected).toBe(true);
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        expect(screen.queryAllByText('Book')).toHaveLength(0);
        expect(screen.queryAllByText('Author')).toHaveLength(0);
    });

    it('Authors selected with data', async () => {
        const mock = [{
            request: {
                query: getAllAuthors
            },
            result: {
                data: {
                    allAuthors: [
                        {
                            "id": "author-6",
                            "firstName": "Margaret",
                            "lastName": "Atwood"
                        },
                        {
                            "id": "author-17",
                            "firstName": "Franz",
                            "lastName": "Fafka"
                        }   
                    ]
                }
            }
        }];
        render(
            <MockedProvider mocks={mock}>
                <ListAll />
            </MockedProvider>, {wrapper: MemoryRouter}
        );
        const options = screen.getAllByRole('option');
        const dropdown = screen.getByRole('combobox');
        const second: any = options[2];
        userEvent.selectOptions(dropdown, second);
        expect(second).toHaveTextContent('Authors');
        expect(second.selected).toBe(true);
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        expect(screen.queryAllByText('Book')).toHaveLength(0);
        expect(screen.queryAllByText('Author')).toHaveLength(2);
    });
});