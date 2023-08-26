import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CryptoUSDConverter from './CryptoUSDConverter';
import { getCryptoPrice } from './CryptoUSDConverterAPI';

jest.mock('./CryptoUSDConverterAPI', () => ({
  getCryptoPrice: jest.fn(),
}));

type GetCryptoPriceMock = jest.Mock<Promise<number>, [string]>;

describe('CryptoUSDConverter', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    const getCryptoPriceMock = getCryptoPrice as GetCryptoPriceMock;
    getCryptoPriceMock.mockReset();
  });

  test('should display loading message when fetching cryptocurrency price', async () => {
    // Resolve the mocked API call
    const getCryptoPriceMock = getCryptoPrice as GetCryptoPriceMock;
    getCryptoPriceMock.mockResolvedValue(50000);

    render(<CryptoUSDConverter />);

    // Submit the form with a cryptocurrency symbol
    const inputElement = screen.getByLabelText('Enter Cryptocurrency Symbol');
    fireEvent.change(inputElement, { target: { value: 'BTC' } });

    const buttonElement = screen.getByText('Get Price');
    fireEvent.click(buttonElement);

    // Wait for the loading state to be false
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if the price is displayed
    expect(screen.getByText('Price in USD: $50000')).toBeInTheDocument();
  });

  test('should display the cryptocurrency price', async () => {
    // Resolve the mocked API call
    const getCryptoPriceMock = getCryptoPrice as GetCryptoPriceMock;
    getCryptoPriceMock.mockResolvedValue(50000);

    render(<CryptoUSDConverter />);

    // Submit the form with a cryptocurrency symbol
    const inputElement = screen.getByLabelText('Enter Cryptocurrency Symbol');
    fireEvent.change(inputElement, { target: { value: 'BTC' } });

    const buttonElement = screen.getByText('Get Price');
    fireEvent.click(buttonElement);

    // Wait for the price to be displayed
    await waitFor(() => {
      expect(screen.getByText('Price in USD: $50000')).toBeInTheDocument();
    });
  });

  test('should handle error when fetching cryptocurrency price', async () => {
    // Reject the mocked API call with an error
    const getCryptoPriceMock = getCryptoPrice as GetCryptoPriceMock;
    getCryptoPriceMock.mockRejectedValue(new Error('Cryptocurrency not found'));

    render(<CryptoUSDConverter />);

    // Submit the form with an invalid cryptocurrency symbol
    const inputElement = screen.getByLabelText('Enter Cryptocurrency Symbol');
    fireEvent.change(inputElement, { target: { value: 'INVALID' } });

    const buttonElement = screen.getByText('Get Price');
    fireEvent.click(buttonElement);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Cryptocurrency not found')).toBeInTheDocument();
    });
  });
});
