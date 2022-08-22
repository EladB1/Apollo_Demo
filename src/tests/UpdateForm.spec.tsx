import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

import UpdateForm, { updateBook, updateAuthor } from '../components/UpdateForm';

const mockAuthorLocation = {
    pathname: '/update/',
    search: '',
    hash: '',
    state: {
        type: 'Author',
        authorid: 'author-5',
        firstname: 'Gabriel',
        lastname: 'Garcia Marquez'
    }
};

const mockBookLocation = {
    pathname: '/update/',
    search: '',
    hash: '',
    state: {
        type: 'Book',
        bookid: 'book-5',
        name: '100 Years of Solitude',
        pageCount: '100',
        authorid: 'author-5',
    }
};

describe('Update Form', () => {
    describe('Author update', () => {
        it('Form layout and data loading', () => {
            render(
                <MemoryRouter initialEntries={[mockAuthorLocation]}>
                    <MockedProvider>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            expect(screen.getByText('Update Author')).toBeInTheDocument();
            expect(screen.getByText('Author ID:')).toBeInTheDocument();
            expect(screen.getByText('First name:')).toBeInTheDocument();
            expect(screen.getByText('Last name:')).toBeInTheDocument();
            expect(inputs).toHaveLength(3);
            expect(inputs[0]).toHaveValue('author-5');
            expect(inputs[1]).toHaveValue('Gabriel');
            expect(inputs[2]).toHaveValue('Garcia Marquez');
            expect(button).toHaveValue('Update');
        });

        it('Update submit - invalid', async () => {
            const errorMsg = 'Could not find author with ID \'author-51\'';
            const mock: any = [{
                request: {
                    query: updateAuthor,
                    variables: {
                        id: 'author-51',
                        firstname: 'Gabriel',
                        lastname: 'Garcia Marquez'
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockAuthorLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], '1');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(inputs[0]).toHaveValue('author-51');
            expect(inputs[1]).toHaveValue('Gabriel');
            expect(inputs[2]).toHaveValue('Garcia Marquez');
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });

        it('Update submit - API Error', async () => {
            // Would be the same for book so no need to test there
            const mock: any = [{
                request: {
                    query: updateAuthor,
                    variables: {
                        id: 'author-5',
                        firstname: 'Gabriel',
                        lastname: 'Garcia Marquez'
                    }
                },
                result: {
                    errors: [new Error('Failed to fetch')]
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockAuthorLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });

        it('Update submit - valid', async () => {
            const mock: any = [{
                request: {
                    query: updateAuthor,
                    variables: {
                        id: 'author-5',
                        firstname: 'Miguel',
                        lastname: 'de Cervantes'
                    }
                },
                result: {
                    data: {
                        updateAuthor: {
                            id: 'author-5',
                            firstName: 'Miguel',
                            lastName: 'de Cervantes'
                        }
                    }
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockAuthorLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.clear(inputs[1]);
            userEvent.type(inputs[1], 'Miguel')
            userEvent.clear(inputs[2]);
            userEvent.type(inputs[2], 'de Cervantes');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(inputs[0]).toHaveValue('author-5');
            expect(inputs[1]).toHaveValue('Miguel');
            expect(inputs[2]).toHaveValue('de Cervantes');
            expect(screen.getByText('Author Updated')).toBeInTheDocument();
        });
    });

    describe('Book update', () => {
        it('Form layout and data loading', () => {
            render(
                <MemoryRouter initialEntries={[mockBookLocation]}>
                    <MockedProvider>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            expect(screen.getByText('Update Book')).toBeInTheDocument();
            expect(screen.getByText('Book ID:')).toBeInTheDocument();
            expect(screen.getByText('Name:')).toBeInTheDocument();
            expect(screen.getByText('Page Count:')).toBeInTheDocument();
            expect(screen.getByText('Author ID:')).toBeInTheDocument();
            expect(inputs).toHaveLength(4);
            expect(inputs[0]).toHaveValue('book-5');
            expect(inputs[1]).toHaveValue('100 Years of Solitude');
            expect(inputs[2]).toHaveValue('100');
            expect(inputs[3]).toHaveValue('author-5');
            expect(button).toHaveValue('Update');
        });

        it('Update submit - invalid book ID', async () => {
            const errorMsg = 'Could not find book with ID \'book-51\'';
            const mock: any = [{
                request: {
                    query: updateBook,
                    variables: {
                        id: 'book-51',
                        name: '100 Years of Solitude',
                        pageCount: '100',
                        authorID: 'author-5'
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockBookLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[0], '1');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(inputs[0]).toHaveValue('book-51');
            expect(inputs[1]).toHaveValue('100 Years of Solitude');
            expect(inputs[2]).toHaveValue('100');
            expect(inputs[3]).toHaveValue('author-5');
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });

        it('Update submit - invalid author ID', async () => {
            const errorMsg = 'Could not find author with ID \'author-51\'';
            const mock: any = [{
                request: {
                    query: updateBook,
                    variables: {
                        id: 'book-5',
                        name: '100 Years of Solitude',
                        pageCount: '100',
                        authorID: 'author-51'
                    }
                },
                result: {
                    errors: [new Error(errorMsg)]
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockBookLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.type(inputs[3], '1');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(inputs[0]).toHaveValue('book-5');
            expect(inputs[1]).toHaveValue('100 Years of Solitude');
            expect(inputs[2]).toHaveValue('100');
            expect(inputs[3]).toHaveValue('author-51');
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
        });

        it('Update submit - valid', async () => {
            const mock: any = [{
                request: {
                    query: updateBook,
                    variables: {
                        id: 'book-5',
                        name: 'Strange Pilgrims',
                        pageCount: '593',
                        authorID: 'author-5'
                    }
                },
                result: {
                    data: {
                        updateBook: {
                            id: 'book-5',
                            name: 'Strange Pilgrims',
                            pageCount: '593',
                            author: {
                                id: 'author-5',
                                firstName: 'Gabriel',
                                lastName: 'Garcia Marquez'

                            }
                        }
                    }
                }
            }];
            render(
                <MemoryRouter initialEntries={[mockBookLocation]}>
                    <MockedProvider mocks={mock}>
                        <UpdateForm />
                    </MockedProvider>
                </MemoryRouter>
            );
            const button = screen.getByRole('button');
            const inputs = screen.getAllByRole('textbox');
            userEvent.clear(inputs[1]);
            userEvent.type(inputs[1], 'Strange Pilgrims')
            userEvent.clear(inputs[2]);
            userEvent.type(inputs[2], '593');
            userEvent.click(button);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(inputs[0]).toHaveValue('book-5');
            expect(inputs[1]).toHaveValue('Strange Pilgrims');
            expect(inputs[2]).toHaveValue('593');
            expect(inputs[3]).toHaveValue('author-5');
            expect(screen.getByText('Book Updated')).toBeInTheDocument();
        });
    });
});