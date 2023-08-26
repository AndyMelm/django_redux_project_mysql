import axios, { AxiosError } from 'axios';

/**
 * Represents the response structure of the error.
 */
interface ErrorResponse {
  message: string;
}

/**
 * Performs user registration by making an HTTP POST request.
 * @function
 * @param {any} user - The user data to be registered.
 * @returns {Promise<{ data: any }>} A Promise that resolves with the response data on successful registration.
 * @throws {Error} Rejects with an error containing the error message if the registration fails.
 */
export function register(user: any) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/register/", user)
      .then(res => resolve({ data: res.data }))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = (error.response.data as ErrorResponse).message;
          reject(new Error(errorMessage));
        } else {
          reject(error);
        }
      });
  });
}
