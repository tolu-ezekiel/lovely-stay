import axios from 'axios';

export const getDataFromUrl = async (url: string) => {
  return new Promise((resolve: any, reject: any) => {
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
