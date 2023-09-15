import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import BreweryItem from "./BreweryItem";
import { Brewery, BreweryProps } from "../types/interfaces";
import { getBreweries } from "../services/breweries";

const BreweryList = (props: BreweryProps) => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);

  useEffect(() => {
    fetchBreweries("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    paginateBreweries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

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

  const searchBreweries = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const encodedSearch = search.replace(" ", "_");
    const searchParams = `?by_name=${encodedSearch}`;
    await fetchBreweries(searchParams);
  };

  const paginateBreweries = async () => {
    await fetchBreweries(`?page=${page}&per_page=${perPage}`);
  };

  return (
    <div>
      <div>
        <form onSubmit={searchBreweries}>
          <input
            type="text"
            name="search"
            placeholder="search by name"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button type="submit">Find</button>
          <button onClick={() => setSearch("")}>Clear search</button>
        </form>
      </div>
      <div>
        <button
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          back
        </button>
        <button onClick={() => setPage(page + 1)}>forward</button>
        <div>Current page: {page}</div>
        <label>
          Items per Page:
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </label>
      </div>
      {breweries.map((b) => (
        <BreweryItem key={b.id} brewery={b} />
      ))}
    </div>
  );
};

export default BreweryList;
