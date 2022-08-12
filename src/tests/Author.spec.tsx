import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Author from '../components/Author';

describe('Author properly renders', () => {
    it('Check structure', () => {
        render(
            <Author 
                authorID='author-1'
                firstname='Mary'
                lastname='Shelley'
            />,
            { wrapper: MemoryRouter }
        );
        const links = screen.getAllByRole('link');
        expect(screen.getByText('Author')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveTextContent(/Delete/);
        expect(screen.getByText(/author-1/i)).toBeInTheDocument();
        expect(screen.getByText('Mary')).toBeInTheDocument();
        expect(screen.getByText('Shelley')).toBeInTheDocument();
    });
});