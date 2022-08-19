import { screen, render } from '@testing-library/react';

import ErrorPage from '../components/ErrorPage';

describe('Test example error', () => {
    it('Validate component structure', () => {
        const msg = 'Could not find /api endpoint'
        render(<ErrorPage statusCode={404} message={msg} />);
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText(msg)).toBeInTheDocument();

    });
});