import axios from 'axios';

// API URL for getting cryptocurrency price used in django
const apiUrl = 'http://localhost:8000/get_crypto_price/';

// Function to get the token from session storage and return it as a bearer token
const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

/**
 * Function to fetch the price of a cryptocurrency.
 *
 * @param {string} cryptoSymbol - The symbol of the cryptocurrency to fetch the price for.
 * @returns {Promise<number>} - A Promise that resolves with the price of the cryptocurrency if successful, or throws an error if the cryptocurrency is not found or fetching fails.
 */
export const getCryptoPrice = (cryptoSymbol: string) => {
  const config = {
    params: { crypto_symbol: cryptoSymbol },
    headers: { Authorization: getToken() },
  };

  return axios
    .get(apiUrl, config)
    .then((response) => {
      if ('price' in response.data) {
        return response.data.price;
      } else {
        throw new Error('Cryptocurrency not found.');
      }
    })
    .catch((error) => {
      throw new Error('Failed to fetch cryptocurrency data. Please check the symbol.');
    });
};
