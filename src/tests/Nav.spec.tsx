import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Nav from '../components/Nav';

describe('Check structure of navbar', () => {
    it('Validate links', () => {
        render(<Nav />, {wrapper: MemoryRouter});
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(5);
        expect(links[0]).toHaveTextContent('Logo');
        expect(links[1]).toHaveTextContent('Home');
        expect(links[2]).toHaveTextContent('Search Author');
        expect(links[3]).toHaveTextContent('Search Book');
        expect(links[4]).toHaveTextContent('Create');
    });
});