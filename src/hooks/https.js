import { useState, useEffect } from "react";

export const useHttps = (url, idArray, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    if (dependencies[0] === true) {
      setIsLoading(true);
      Promise.all(
        idArray.map(async (id) => {
          try {
            const response = await fetch(`${url}${id[0]}`);
            if (!response.ok) {
              throw new Error("Failed to fetch.");
            }
            const data = await response.json();
            return data;
          } catch (err) {
            console.log(err);
          }
        })
      ).then((data) => {
        setFetchedData(data);
        setIsLoading(false);
      });
    }
  }, dependencies);
  return [isLoading, fetchedData];
};
