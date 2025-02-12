const DetailsOfListing = async (id) => {
  const fetchMetaData = async (listingId) => {
    const response = await fetch('http://localhost:5005/listings/' + listingId, {
      method: 'GET',
    });
    const data = await response.json();
    return data
  }
  const dataOfListing = await fetchMetaData(id)
  return dataOfListing.listing;
}

export default DetailsOfListing;
