import axios from 'axios';

export const getDataFromUrl = async <T>(url: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.status === 404) {
          resolve(null);
        }
        reject(error);
      });
  });
};
