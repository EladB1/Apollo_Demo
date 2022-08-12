import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Book from '../components/Book';

describe('Author properly renders', () => {
    it('Check structure', () => {
        render(
            <Book
                bookID='book-1'
                name='Frankenstein'
                pageCount={255}
                authorID='author-1'
                authorFirstName='Mary'
                authorLastName='Shelley'
            />,
            { wrapper: MemoryRouter }
        );
        const links = screen.getAllByRole('link');
        expect(screen.getByText('Book')).toBeInTheDocument();
        expect(screen.getAllByText('Update')).toHaveLength(2);
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(/Delete/);
        expect(screen.getByText(/book-1/i)).toBeInTheDocument();
        expect(screen.getByText('Frankenstein')).toBeInTheDocument();
        expect(screen.getByText(255)).toBeInTheDocument();
        expect(screen.getByText(/author-1/i)).toBeInTheDocument();
        expect(screen.getByText('Mary')).toBeInTheDocument();
        expect(screen.getByText('Shelley')).toBeInTheDocument();
    });
});