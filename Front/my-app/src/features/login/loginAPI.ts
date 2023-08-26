import axios from 'axios';

/**
 * Function to log in a user with the provided credentials.
 * @param {Object} user1 - An object containing the user's credentials (username and password).
 * @returns {Promise} A promise that resolves to the response data on successful login.
 * @throws {Error} Throws an error with a message for incorrect username or password on login failure.
 */
export async function login(user1: any) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/login/", user1);
    return { data: response.data };
  } catch (error: any) {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      throw new Error('Incorrect username or password');
    } else {
      throw error;
    }
  }
}

/**
 * Function to get the user ID using a valid authentication token.
 * @param {string} token - The authentication token for the user.
 * @returns {Promise<string>} A promise that resolves to the user ID on successful retrieval.
 * @throws {Error} Throws an error if there's an issue with the API request or authentication.
 */
export async function getUserId(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get('http://127.0.0.1:8000/get_user_id/', config);
    const userId = response.data.user_id;
    return userId;
  } catch (error: any) {
    throw error;
  }
}
