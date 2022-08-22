import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import CreateForm, { createAuthor, createBook } from '../components/CreateForm';
import { MemoryRouter } from 'react-router-dom';

describe('Create form tests', () => {
    it('Contains dropdown', () => {
        render(<CreateForm />, {wrapper: MockedProvider});
        const dropdown = screen.getByRole('combobox');
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('Select Entity');
        expect(options[1]).toHaveTextContent('Book');
        expect(options[2]).toHaveTextContent('Author');
        expect(dropdown).toBeInTheDocument();
    });

    describe('Author tests', () => {
        it('Form layout', () => {
            render(<CreateForm />, {wrapper: MockedProvider});
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Author');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            expect(dropdown).toBeInTheDocument();
            expect(screen.getByText('Create Author')).toBeInTheDocument();
            expect(screen.getByText('Author ID:')).toBeInTheDocument();
            expect(screen.getByText('First Name:')).toBeInTheDocument();
            expect(screen.getByText('Last Name:')).toBeInTheDocument();
            expect(inputs).toHaveLength(3);
            expect(button).toHaveValue('Create');
        });

        it('Form submit unsuccessful - existing author', async () => {
            const id = 'author-3';
            const errorMsg = `Author with id: '${id}' already exists`;
            const mock: any = [{
                request: {
                    query: createAuthor,
                    variables: {
                        id: id,
                        firstname: 'Harper',
                        lastname: 'Lee'
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Author');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'author-3');
            userEvent.type(inputs[1], 'Harper');
            userEvent.type(inputs[2], 'Lee');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Author')).toBeInTheDocument();
            expect(inputs).toHaveLength(3);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });

        it('Form submit unsuccessful - API Error', async () => {
            // should work the same for book so no need to test it there
            const mock: any = [{
                request: {
                    query: createAuthor,
                    variables: {
                        id: 'author-3',
                        firstname: 'Harper',
                        lastname: 'Lee'
                    }
                },
                result: {
                    errors: [new Error('Failed to fetch')]
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Author');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'author-3');
            userEvent.type(inputs[1], 'Harper');
            userEvent.type(inputs[2], 'Lee');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Author')).toBeInTheDocument();
            expect(inputs).toHaveLength(3);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });


        it('Form submit successful', async () => {
            const mock = [{
                request: {
                    query: createAuthor,
                    variables: {
                        id: 'author-3',
                        firstname: 'Harper',
                        lastname: 'Lee'
                    }
                },
                result: {
                    data: {
                        createAuthor: {
                            id: 'author-3',
                            firstName: 'Harper',
                            lastName: 'Lee'
                        }
                    }
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Author');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'author-3');
            userEvent.type(inputs[1], 'Harper');
            userEvent.type(inputs[2], 'Lee');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Author')).toBeInTheDocument();
            expect(inputs).toHaveLength(3);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('Author created!')).toBeInTheDocument();
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('First name:')).toBeInTheDocument();
            expect(screen.getByText('Last name:')).toBeInTheDocument();
        });
    });

    describe('Book tests', () => {
        it('Form layout', () => {
            render(<CreateForm />, {wrapper: MockedProvider});
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Book');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            expect(dropdown).toBeInTheDocument();
            expect(screen.getByText('Create Book')).toBeInTheDocument();
            expect(screen.getByText('Book ID:')).toBeInTheDocument();
            expect(screen.getByText('Name:')).toBeInTheDocument();
            expect(screen.getByText('Page Count:')).toBeInTheDocument();
            expect(screen.getByText('Author ID:')).toBeInTheDocument();
            expect(inputs).toHaveLength(4);
            expect(button).toHaveValue('Create');
        });

        it('Form submit unsuccessful - existing book', async () => {
            const id = 'book-6';
            const errorMsg = `Book with id: '${id}' already exists`;
            const mock: any = [{
                request: {
                    query: createBook,
                    variables: {
                        id: id,
                        name: 'To Kill a Mockingbird',
                        pageCount: '365',
                        authorID: 'author-3'
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Book');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'book-6');
            userEvent.type(inputs[1], 'To Kill a Mockingbird');
            userEvent.type(inputs[2], '365');
            userEvent.type(inputs[3], 'author-3');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Book')).toBeInTheDocument();
            expect(inputs).toHaveLength(4);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });

        it('Form submit unsuccessful - invalid authorID', async () => {
            const id = 'author-5';
            const errorMsg = `Book with id: '${id}' already exists`;
            const mock: any = [{
                request: {
                    query: createBook,
                    variables: {
                        id: 'book-6',
                        name: 'To Kill a Mockingbird',
                        pageCount: '365',
                        authorID: id
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Book');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'book-6');
            userEvent.type(inputs[1], 'To Kill a Mockingbird');
            userEvent.type(inputs[2], '365');
            userEvent.type(inputs[3], 'author-5');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Book')).toBeInTheDocument();
            expect(inputs).toHaveLength(4);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });


        it('Form submit successful', async () => {
            const mock = [{
                request: {
                    query: createBook,
                    variables: {
                        id: 'book-6',
                        name: 'To Kill a Mockingbird',
                        pageCount: '365',
                        authorID: 'author-3'
                    }
                },
                result: {
                    data: {
                        createBook: {
                            id: 'book-6',
                            name: 'To Kill a Mockingbird',
                            pageCount: 365,
                            author: {
                                id: 'author-3',
                                firstName: 'Harper',
                                lastName: 'Lee'
                            }
                        }
                    }
                }
            }];
            render(
                <MockedProvider mocks={mock}>
                    <CreateForm />
                </MockedProvider>,
                {wrapper: MemoryRouter}
            );
            const dropdown = screen.getByRole('combobox');
            userEvent.selectOptions(dropdown, 'Book');
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], 'book-6');
            userEvent.type(inputs[1], 'To Kill a Mockingbird');
            userEvent.type(inputs[2], '365');
            userEvent.type(inputs[3], 'author-3');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Create Book')).toBeInTheDocument();
            expect(inputs).toHaveLength(4);
            expect(button).toBeInTheDocument();
            expect(screen.getByText('Book created!')).toBeInTheDocument();
            expect(screen.getByText('BookID:')).toBeInTheDocument();
            expect(screen.getAllByText('Name:')).toHaveLength(2); // in form and in result
            expect(screen.getByText('pageCount:')).toBeInTheDocument();
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('First name:')).toBeInTheDocument();
            expect(screen.getByText('Last name:')).toBeInTheDocument();
        });

    });
});