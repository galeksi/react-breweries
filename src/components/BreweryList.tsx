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
  const [type, setType] = useState("");

  useEffect(() => {
    fetchBreweries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, type]);

  const fetchBreweries = async () => {
    try {
      props.setLoading(true);
      const data = await getBreweries(setParams());
      setBreweries(data);
      props.setLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      props.setError(error.message);
    }
  };

  const searchBreweries = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setPage(1);
    await fetchBreweries();
  };

  const filterBreweries = async (params: string) => {
    setType(params);
    setPage(1);
    await fetchBreweries();
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const setParams = () => {
    let paramString = `?page=${page}&per_page=${perPage}`;
    if (search) paramString += `&by_name=${search}`;
    if (type) paramString += `&by_type=${type}`;
    return paramString;
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
            onChange={({ target }) => setSearch(target.value.replace(" ", "_"))}
          />
          <button type="submit">Find</button>
          <button onClick={clearSearch}>Clear search</button>
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
        <label>
          Filter by type:
          <select
            value={type}
            onChange={(e) => filterBreweries(e.target.value)}
          >
            <option value={""}>select</option>
            <option value={"micro"}>Micro</option>
            <option value={"nano"}>Nano</option>
            <option value={"regional"}>Regional</option>
            <option value={"brewpub"}>Brewpub</option>
            <option value={"large"}>Large</option>
            <option value={"planning"}>Planning</option>
            <option value={"bar"}>Bar</option>
            <option value={"contract"}>Contract</option>
            <option value={"proprietor"}>Proprietor</option>
            <option value={"closed"}>Closed</option>
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
