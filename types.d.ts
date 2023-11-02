// Define the shape of an Address object
export interface Address {
  id: string;
  street_name: string;
  street_number: string;
  postcode: string;
  city: string;
}

// Define the shape of the HelloWorld component's props
export interface IHelloWorldProps {
  address: Address;
  // callback function to update the address. It's the link between the HelloWorld component and the ReactSample component
  onChangeAddress: (address: Address) => void;
}
