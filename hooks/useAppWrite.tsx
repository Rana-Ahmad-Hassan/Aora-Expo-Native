import { useEffect, useState } from "react";

interface HooksFunctionProps<T> {
  fn: () => Promise<T>;
}

const useAppWrite = <T,>({ fn }: HooksFunctionProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      if (res) {
        setData(res);
      } else {
        console.warn("No data found");
        setData(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
};

export default useAppWrite;
