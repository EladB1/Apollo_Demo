import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

import DeleteForm, { deleteBook, deleteAuthor } from '../components/DeleteForm';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Test delete functionality', () => {
    describe('Delete Author', () => {
        it('Delete form layout - Author', () => {
            render(
                <MemoryRouter initialEntries={['/delete/author/author-24']}>
                    <MockedProvider>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const question = 'Are you sure you want to delete author with ID \'author-24\'?';
            const prompt = screen.getByText(question);
            const buttons = screen.getAllByRole('button');
            expect(prompt).toBeInTheDocument();
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
        });

        it('Delete choice - No', () => {
            // works the same for book; no need to test again
            render(
                <MemoryRouter initialEntries={['/delete/author/author-24']}>
                    <MockedProvider>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[1]);
            expect(mockNavigate).toHaveBeenCalled();
        });

        it('Delete choice - Yes - API Error', async () => {
            // works the same for book; no need to test again
            const mock: any = [{
                request: {
                    query: deleteAuthor,
                    variables: {
                        id: 'author-24'
                    }
                },
                result: {
                    errors: [new Error('Failed to fetch')]
                }
            }];
            render(
                <MemoryRouter initialEntries={['/delete/author/author-24']}>
                    <MockedProvider mocks={mock}>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Deleting author with ID \'author-24\'...')).toBeInTheDocument();
            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });

        it('Delete choice - Yes - Not found', async () => {
            const mock: any = [{
                request: {
                    query: deleteAuthor,
                    variables: {
                        id: 'author-24'
                    }
                },
                result: {
                    errors: [new Error('Could not find author with ID \'author-24\'')]
                }
            }];
            render(
                <MemoryRouter initialEntries={['/delete/author/author-24']}>
                    <MockedProvider mocks={mock}>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Deleting author with ID \'author-24\'...')).toBeInTheDocument();
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText('Error: Could not find author with ID \'author-24\'')).toBeInTheDocument();
        });

        it ('Delete choice - Yes - success', async () => {
            const mock: any = [{
                request: {
                    query: deleteAuthor,
                    variables: {
                        id: 'author-24'
                    }
                },
                result: {
                    data: {
                        deleteAuthor: {
                            id: 'author-24',
                            firstName: 'William',
                            lastName: 'Golding'
                        }
                    }
                }
            }];
            render(
                <MemoryRouter initialEntries={['/delete/author/author-24']}>
                    <MockedProvider mocks={mock}>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Deleting author with ID \'author-24\'...')).toBeInTheDocument();
            expect(screen.getByText('Deleted Author')).toBeInTheDocument();
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('First Name:')).toBeInTheDocument();
            expect(screen.getByText('Last Name:')).toBeInTheDocument();
            expect(screen.getByText('William')).toBeInTheDocument();
            expect(screen.getByText('Golding')).toBeInTheDocument();
        });
    });

    describe('Delete Book', () => {
        it('Delete form layout - Book', () => {
            render(
                <MemoryRouter initialEntries={['/delete/book/book-50']}>
                    <MockedProvider>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const question = 'Are you sure you want to delete book with ID \'book-50\'?';
            const prompt = screen.getByText(question);
            const buttons = screen.getAllByRole('button');
            expect(prompt).toBeInTheDocument();
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
        });

        it('Delete choice - Yes - Not found', async () => {
            const mock: any = [{
                request: {
                    query: deleteBook,
                    variables: {
                        id: 'book-50'
                    }
                },
                result: {
                    errors: [new Error('Could not find book with ID \'book-50\'')]
                }
            }];
            render(
                <MemoryRouter initialEntries={['/delete/book/book-50']}>
                    <MockedProvider mocks={mock}>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Deleting book with ID \'book-50\'...')).toBeInTheDocument();
            expect(screen.getByText('400')).toBeInTheDocument();
            expect(screen.getByText('Error: Could not find book with ID \'book-50\'')).toBeInTheDocument();
        });

        it ('Delete choice - Yes - success', async () => {
            const mock: any = [{
                request: {
                    query: deleteBook,
                    variables: {
                        id: 'book-50'
                    }
                },
                result: {
                    data: {
                        deleteBook: {
                            id: 'book-50',
                            name: 'Lord of the Flies'
                        }
                    }
                }
            }];
            render(
                <MemoryRouter initialEntries={['/delete/book/book-50']}>
                    <MockedProvider mocks={mock}>
                        <Routes>
                            <Route 
                                path='/delete/:entity/:id' 
                                element={<DeleteForm />}
                            />
                        </Routes>
                    </MockedProvider>
                </MemoryRouter>
            );
            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(2);
            expect(buttons[0]).toHaveTextContent('Yes');
            expect(buttons[1]).toHaveTextContent('No');
            userEvent.click(buttons[0]);
            await waitFor(() => {
                expect(screen.queryByText('Loading...')).toBeNull();
            });
            expect(screen.getByText('Deleting book with ID \'book-50\'...')).toBeInTheDocument();
            expect(screen.getByText('Deleted Book')).toBeInTheDocument();
            expect(screen.getByText('ID:')).toBeInTheDocument();
            expect(screen.getByText('Name:')).toBeInTheDocument();
            expect(screen.getByText('Lord of the Flies')).toBeInTheDocument();
        });
    });
});