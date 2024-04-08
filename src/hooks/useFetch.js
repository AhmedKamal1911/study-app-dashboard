import { useEffect, useState } from "react";
import fetchFromAPI from "../services/api";
import { isCancel } from "axios";

const useFetch = (fetchOptions) => {
  const toStringifiedFetchOptions = JSON.stringify(fetchOptions);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetch, setIsRefetch] = useState(false);
  const refetch = () => {
    setIsRefetch((prevRefetchValue) => !prevRefetchValue);
  };
  useEffect(() => {
    const abortSignal = new AbortController();
    const executeRequestHandler = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFromAPI({
          ...fetchOptions,
          signal: abortSignal.signal,
        });
        setResponseData(response);
        setIsLoading(false);
      } catch (e) {
        if (!isCancel(e)) {
          setError(e);
          setIsLoading(false);
        }
      }
    };
    executeRequestHandler();
    return () => {
      abortSignal.abort("unmount");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toStringifiedFetchOptions, isRefetch]);
  return { responseData, isLoading, error, refetch };
};
export default useFetch;
