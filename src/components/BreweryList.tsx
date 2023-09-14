import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import BreweryItem from "./BreweryItem";
import { Brewery, BreweryProps } from "../types/interfaces";
import { getBreweries } from "../services/breweries";

const BreweryList = (props: BreweryProps) => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBreweries("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBreweries = async (params: string) => {
    try {
      props.setLoading(true);
      const data = await getBreweries(params);
      setBreweries(data);
      props.setLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      props.setError(error.message);
    }
  };

  const refetchBreweries = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const encodedSearch = search.replace(" ", "_");
    const searchParams = `?by_name=${encodedSearch}`;
    await fetchBreweries(searchParams);
    setSearch("");
  };

  return (
    <div>
      <div>
        <form onSubmit={refetchBreweries}>
          <input
            type="text"
            name="search"
            placeholder="search by name"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button type="submit">Find</button>
        </form>
      </div>
      {breweries.map((b) => (
        <BreweryItem key={b.id} brewery={b} />
      ))}
    </div>
  );
};

export default BreweryList;
