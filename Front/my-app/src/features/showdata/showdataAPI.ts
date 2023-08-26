import axios from 'axios';
import { Journal } from '../../Models/Journal';

/**
 * Function to fetch all journal data for a given user ID.
 * @function
 * @param {number} userId - The ID of the user for whom to fetch the journal data.
 * @returns {Promise<Journal[]>} A promise that resolves to an array of Journal objects.
 */
export async function getAlldata(userId: number): Promise<Journal[]> {
  const url = `http://127.0.0.1:8000/journal/${userId}/`;
  const token = sessionStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get<Journal[]>(url, { headers });
  return response.data;
}
