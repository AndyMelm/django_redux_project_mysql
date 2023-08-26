import axios from 'axios';

// Function to get the token from session storage and return it as a bearer token
const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

/**
 * Function to fetch all journal entries for a specific user.
 *
 * @param {number} userId - The ID of the user whose journal entries to fetch.
 * @returns {Promise<Array>} - A Promise that resolves with an array of journal entries if successful.
 */
export function getAll(userId: number) {
  const url = `http://127.0.0.1:8000/journal/${userId}/`;
  return axios.get(url, {
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => res.data);
}

/**
 * Function to create a new journal entry.
 *
 * @param {Object} entry - The journal entry data to create.
 * @returns {Promise<Object>} - A Promise that resolves with the newly created journal entry data if successful.
 */
export function createEntry(entry: any) {
  return axios.post('http://127.0.0.1:8000/journal/', entry, {
    headers: {
      Authorization: getToken(),
    },
  }).then((res) => res.data);
}

/**
 * Function to update an existing journal entry.
 *
 * @param {number} id - The ID of the journal entry to update.
 * @param {Object} updatedFields - The fields to update in the journal entry.
 * @returns {Promise<Object>} - A Promise that resolves with the updated journal entry data if successful.
 */
export function updateEntry(id: number, updatedFields: any) {
  const url = `http://127.0.0.1:8000/journal/${id}/`;
  const formData = new FormData();


  for (const field in updatedFields) {
    formData.append(field, updatedFields[field]);
  }

  return axios.put(url, formData, {
    headers: {
      Authorization: getToken(),
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
}

/**
 * Function to delete a journal entry.
 *
 * @param {number} entryId - The ID of the journal entry to delete.
 * @returns {Promise<void>} - A Promise that resolves if the deletion is successful.
 */
export function deleteEntry(entryId: number) {
  const url = `http://127.0.0.1:8000/journal/${entryId}/`;
  return axios.delete(url, {
    headers: {
      Authorization: getToken(),
    },
  });
}
