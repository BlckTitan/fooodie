import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

      const fetchData = async () => {
        setIsLoading(true); // Set loading to true before making the request
        setError(null); // Reset error before each fetch
        try {
          const response = await axios.get(url);
          setData(response.data); // Set data on successful response
        } catch (err) {
          setError(err); // Capture and set error
        } finally {
          setIsLoading(false); // Set loading to false when the request completes
        }
      };

    if(url){
      return fetchData(); // Only fetch if a URL is provided
    }

  }, [url]);

  return { data, error, isLoading }; // Return an object for better readability
};

export default useFetch;
