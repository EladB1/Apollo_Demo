import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import App from '../components/App';

test('renders navbar', () => {
    render(<MemoryRouter>
        <App />
    </MemoryRouter>, {wrapper: MockedProvider});
    const linkElement = screen.getByText(/logo/i);
    expect(linkElement).toBeInTheDocument();
});
