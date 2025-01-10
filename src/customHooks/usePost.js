import { useState, useEffect } from 'react';
import axios from 'axios';

const usePost = (url, saveData) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

      let isMounted = true;

      const fetchData = async () => {

        setIsLoading(true); // Set loading to true before making the request
        setError(null); // Reset error before each fetch

        try {

          const response = await  axios.post('/api/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
          })

          if(isMounted){
            setData(response.data); // Set data on successful response 
          }

        } catch (error) {

          console.error(error);
          
          if(isMounted){
            setIsLoading(false); // Set loading to false when the request completes
          }


        } finally {

          // always executed
          if(isMounted){
            setIsLoading(false); // Set loading to false when the request completes
          }

        }

      };

   
      // unmounting the component hook
    return () => {

      if(url){

        return fetchData(); // Only fetch if a URL is provided
  
      }
 
      isMounted = false; // Avoids state updates on unmounted component

    };

  }, [url]);

  return { data, error, isLoading }; // Return an object for better readability
};

export default usePost ;
