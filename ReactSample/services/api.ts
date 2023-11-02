// This file contains the API calls

// Define an asynchronous function to get addresses based on the provided searchTerm
export async function getAdresses(serchTerm: string): Promise<any> {
  // Build the API endpoint URL
  const url = `https://api-adresse.data.gouv.fr/search/?q=${serchTerm}&limit=10`;
  const response = await fetch(url); // Make the API call

  // Check if the response is okay, else throw an error
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  // Parse the JSON response
  const data = await response.json();
  return data.features;
}
