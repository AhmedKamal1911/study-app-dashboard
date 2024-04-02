import { useEffect, useState } from "react";
import fetchFromAPI from "../utils/constans/fetchFromApi";

const useFetch = (fetchOptions) => {
  console.log("component-rendered");
  const toStringifiedFetchOptions = JSON.stringify(fetchOptions);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log("run useEffect");
    const abortSignal = new AbortController();
    const executeRequestHandler = async () => {
      try {
        setIsLoading(true);
        console.log("before await set state to true");
        const response = await fetchFromAPI({
          ...fetchOptions,
          signal: abortSignal.signal,
        });
        console.log(response);
        setResponseData(response);
      } catch (e) {
        console.log(e, "error from catch");
        if (e !== "canceled") setError(e);
      } finally {
        console.log("set state to false in finally");
        if (error !== "canceled") {
          setIsLoading(false);
        }
      }
    };
    executeRequestHandler();
    return () => {
      console.log("run useEffect cleanup");
      abortSignal.abort("changed");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toStringifiedFetchOptions, error]);
  return { responseData, isLoading, error };
};
export default useFetch;
