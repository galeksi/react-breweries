import axios from "axios";
import { useState, useEffect } from "react";

import BreweryItem from "./BreweryItem";

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string;
  address_3: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}

const BreweryList = () => {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBreweries("");
  }, []);

  const fetchBreweries = async (params: string) => {
    const response = await axios.get(
      `https://api.openbrewerydb.org/v1/breweries${params}`
    );
    setBreweries(response.data);
  };

  const refetchBreweries = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const searchParams = `?by_name=${search}`;
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
      {breweries &&
        breweries.map((b) => <BreweryItem key={b.id} brewery={b} />)}
    </div>
  );
};

export default BreweryList;
