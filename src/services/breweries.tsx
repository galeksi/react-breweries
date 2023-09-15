import axios, { AxiosResponse } from "axios";
import { Brewery } from "../types/interfaces";

const baseUrl = "https://api.openbrewerydb.org/v1/breweries";

export const getBreweries = async (params: string) => {
  const response = await axios.get<any, AxiosResponse<Brewery[]>>(
    `${baseUrl}${params}`
  );
  return response.data;
};

export const getBrewery = async (params: string | undefined) => {
  const response = await axios.get<any, AxiosResponse<Brewery>>(
    `${baseUrl}/${params}`
  );
  return response.data;
};
