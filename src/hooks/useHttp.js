// Function call and fetch HTTP && payload if required!
// Function call and fetch HTTP && payload if required!
// Function call and fetch HTTP && payload if required!
import { useCallback, useEffect, useState } from "react";

async function sentHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}



export default function useHttp(url, config, initialData) {
  //loading
  const [isLoading, setIsLoading] = useState(false);
  //Error
  const [error, setError] = useState();
  //Data
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sentHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config)
      sendRequest();
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
