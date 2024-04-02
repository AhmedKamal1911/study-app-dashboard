import { useEffect, useState } from "react";
import fetchFromAPI from "../utils/constans/fetchFromApi";

const useFetchOnAutoCompleteOpen = (endPointSlug = "/instructors") => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearOptions = () => setOptions([]);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchFromAPI({
          url: endPointSlug,
          signal: abortController.signal,
        });
        setOptions(data);
        setError(null);
      } catch (error) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (open) fetchData();
    return () => {
      abortController.abort("unmount");
    };
  }, [open, endPointSlug]);
  return { open, setOpen, options, clearOptions, loading, error };
};
export default useFetchOnAutoCompleteOpen;
