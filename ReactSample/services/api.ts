// This file contains the API calls

// Define an asynchronous function to get addresses based on the provided searchTerm
export async function getAdresses(searchTerm: string): Promise<any> {
  // Build the API endpoint URL
  // Change the api address to your own api address
  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${searchTerm}&limit=10`;
    const response = await fetch(url); // Make the API call
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Parse the JSON response
    const data = await response.json();
    // Change : .feature is spectific to the api used.
    return data.features;
  } catch (error) {
    console.error(error);
  }
  // Check if the response is okay, else throw an error
}
