import PropTypes from 'prop-types';
import React from 'react';

import ListingCard from '../components/ListingCard';
import CreateListingModal from '../components/CreateListingModal';

const HostingListing = (props) => {
  const [hostedListing, setHostedListing] = React.useState([]);
  const ownerEmail = localStorage.getItem('ownerEmail');

  const [bookingsList, setBookingsList] = React.useState([]);

  const deleteListing = async (listingId) => {
    const response = await fetch('http://localhost:5005/listings/' + listingId, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      fetchListings();
    }
  }

  const unpublishListing = async (listingId) => {
    const response = await fetch('http://localhost:5005/listings/unpublish/' + listingId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      fetchListings();
    }
  }
  const fetchHostedInfomation = async (listingId) => {
    const response = await fetch('http://localhost:5005/listings/' + listingId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setHostedListing(prevArray => [...prevArray, { hostedListingId: listingId, hostedData: data }]);
    }
  }
  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    setBookingsList(data);
  }
  const fetchListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();

    setHostedListing([]);
    for (const list of data.listings) {
      if (list.owner === ownerEmail) {
        await fetchHostedInfomation(list.id);
      }
    }
  }

  React.useEffect(() => {
    fetchListings();
    fetchBookings();
  }, []);

  const flexBoxChildrenStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 15
  }

  return (
    <div style={{ height: '1000px' }}>
      <hr />
      <h1>Hosted listing:</h1>
      <br />
      <div style={ flexBoxChildrenStyle }>
        {hostedListing.map((listing, idx) => {
          let bookingAvailable = false;
          for (const booking of bookingsList.bookings) {
            if (Number(booking.listingId) === Number(listing.hostedListingId)) {
              bookingAvailable = true;
            }
          }
          const hostedListing = listing.hostedData.listing;
          return (
            <ListingCard
              editTest="clickEditForTest"
              unpublishTest="clickUnpublishForTest"
              publishTest="clickPublishForTest"
              publishListingTest="listingPublishedTest"
              key={listing.hostedListingId}
              hostedListing={hostedListing}
              unpublishListing={unpublishListing}
              deleteListing={deleteListing}
              bookingAvailable={bookingAvailable}
              listingId={Number(listing.hostedListingId)}
              token={props.token}
            />
          )
        })}
      </div>
      <br />
      <hr />
      <CreateListingModal id='openListingModalTest' token={props.token} fetchListings={fetchListings}/>
      <br />
      <br />
    </div>
  );
}

export default HostingListing;

HostingListing.propTypes = {
  token: PropTypes.string
};
