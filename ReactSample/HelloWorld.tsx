import * as React from "react";

import { Address, IHelloWorldProps } from "../types";

import { getAdresses } from "./services/api";

import { ComboBox, IComboBoxOption } from "@fluentui/react";

export const HelloWorld = (props: IHelloWorldProps) => {
  const [searchTerm, setSearchTerm] = React.useState("" as string);
  const [addresses, setAdresses] = React.useState([] as Address[]);

  // Function to call the API to get the addresses based on the searchterm and call the function to transform the response
  const receiveAddresses = async (serchTerm: string) => {
    const result = await getAdresses(serchTerm);
    populateAdresses(result);
  };

  // Function to transform the API response to the desired format, get desired data and set the stateof addresses
  const populateAdresses = (addresses: Address[]): void => {
    const result = addresses.map((address: any) => {
      return {
        id: address.properties.id,
        street_name: address.properties.name,
        street_number: address.properties.housenumber,
        postcode: address.properties.postcode,
        city: address.properties.city,
      };
    });
    setAdresses(result);
  };

  // Function to get the addresses based on the searchterm
  const searchAddresses = (searchTerm: string) => receiveAddresses(searchTerm);

  // Function to get the chosen address from the combobox and call the function to set the state of the chosen address
  const chosenAddress = (option: IComboBoxOption) => {
    const address = addresses.find((address) => address.id === option.key);
    props.onChangeAddress(address!);
  };

  // Transform the addresses to the desired format for the combobox
  const addresseOptionsList: IComboBoxOption[] = addresses.map(
    (address: Address) => {
      return {
        key: address.id,
        text: address.street_name + " " + address.city + " " + address.postcode,
      };
    }
  );

  React.useEffect(() => {
    // Call the function to get the addresses based on the searchterm if the searchterm is longer than 2 characters
    searchTerm.length > 2 && searchAddresses(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <ComboBox
        placeholder="Search for an address"
        useComboBoxAsMenuWidth={true}
        allowFreeform={true}
        openOnKeyboardFocus={true}
        autoComplete="on"
        onPendingValueChanged={(option, idx, value) => {
          value && setSearchTerm(value);
        }}
        options={addresseOptionsList}
        onItemClick={(e, option) => {
          option && chosenAddress(option);
        }}
        onChange={(e, option) => {
          option && chosenAddress(option);
        }}
      />
    </>
  );
};
