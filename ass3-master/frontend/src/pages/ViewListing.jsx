import PropTypes from 'prop-types';
import React from 'react';

import {
  useLocation,
  useParams,
} from 'react-router-dom';

import MakeBookingModalPopup from '../components/MakeBookingModalPopup';
import ReviewListingModal from '../components/ReviewListingModal'
import ShowStatus from '../components/ShowStatus'
import StarRating from '../components/StarRating';

const ViewListing = (props) => {
  const ownerEmail = localStorage.getItem('ownerEmail');
  const { id } = useParams();
  const linkProps = useLocation().state

  const [listingInfo, setListingInfo] = React.useState({});
  const [viewBookingsList, setViewBookingsList] = React.useState([]);

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    setViewBookingsList(data.bookings);
  }

  const getListingInfo = async () => {
    const response = await fetch('http://localhost:5005/listings/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setListingInfo(data);
    }
  };
  const getAllAmenities = (amenitiesData) => {
    let amenities = '';
    for (let i = 0; i < amenitiesData.length; i++) {
      if (i !== 0) {
        amenities = amenities + ', ' + amenitiesData[i];
      } else {
        amenities = amenities + ' ' + amenitiesData[i];
      }
    }
    return amenities;
  }
  const getNumOfBeds = (numOfBedsData) => {
    let numOfBeds = 0;
    for (let i = 0; i < numOfBedsData.length; i++) {
      numOfBeds += Number(numOfBedsData[i]);
    }
    return numOfBeds;
  }

  React.useEffect(() => {
    getListingInfo();
    if (props.token) {
      fetchBookings();
    }
  }, []);

  // this is to wait to the object to populate
  if (!listingInfo.listing) {
    return (
      <div>
        ......Loading......
      </div>
    );
  }

  const showPropertyPhotos = () => {
    const allPhotos = listingInfo.listing.metadata.propertyPhotos
    if (listingInfo.listing.metadata.propertyPhotos.length === 0) {
      return (
        <>
          This listing has no property photos
        </>
      )
    }
    return (
      allPhotos.map((image, idx) => {
        return (
          <img key={'Picture' + idx} style={{ margin: 1, width: 300, height: 300, borderRadius: 20 }} src={image} />
        )
      })
    )
  }

  const showRating = () => {
    let rating = 0;
    for (let i = 0; i < listingInfo.listing.reviews.length; i++) {
      rating += listingInfo.listing.reviews[i].starRating
    }
    if (listingInfo.listing.reviews.length === 0) {
      return 0;
    }
    const average = rating / listingInfo.listing.reviews.length;
    return average;
  }

  const showPrice = () => {
    if (linkProps.isDateSearch) {
      return (
        <>
          Price per stay [{linkProps.amountOfNights} Nights]: ${linkProps.amountOfNights * listingInfo.listing.price}
        </>
      )
    } else {
      return (
        <>
        Price (Per Night): ${listingInfo.listing.price}
        </>
      )
    }
  }

  const showReviews = () => {
    if (listingInfo.listing.reviews.length === 0) {
      return (
        <>
          This listing has no reviews yet
        </>
      )
    }
    return (
      listingInfo.listing.reviews.map((reviews, idx) => {
        return (
          <div key={idx}>
            {reviews.reviewText} <br />
          </div>
        )
      })
    )
  }

  let acceptedBooking = null
  if (props.token) {
    acceptedBooking = viewBookingsList.find((booking) => Number(booking.listingId) === Number(id) && booking.owner === ownerEmail && booking.status === 'accepted');
  }
  const embeddedUrl = 'https://www.youtube.com/embed/' + listingInfo.listing.metadata.url.slice(32)

  const showListings = () => {
    return (
      <><br />
      <h1 style={{ margin: 0 }}>Title: {listingInfo.listing.title}</h1>
      Address: {listingInfo.listing.address.street.toString()}, {listingInfo.listing.address.city.toString()}, {listingInfo.listing.address.state.toString()}, {listingInfo.listing.address.postcode.toString()}, {listingInfo.listing.address.country.toString()}
      <br />
      {listingInfo.listing.metadata.url === ''
        ? <img style={{ width: 320, height: 320, borderRadius: 30 }} src={listingInfo.listing.thumbnail} />
        : <iframe style={{ width: 320, height: 320, borderRadius: 30 }} src={embeddedUrl}></iframe>
      }
      < br />
      Rating: <StarRating averageRating={showRating()} /> <br />
      Reviews: {showReviews()}

      <br />
      <br />
      Property Photos:
      <br />
      {showPropertyPhotos()}
      <br />
      <br />
      Amenities: {getAllAmenities(listingInfo.listing.metadata.amenities)} <br />
      {showPrice()} <br />
      PropertyType: {listingInfo.listing.metadata.propertyType.toString()} <br />
      Number of bedrooms: {listingInfo.listing.metadata.bedrooms.numOfBedrooms} <br />
      Number of beds: {getNumOfBeds(listingInfo.listing.metadata.bedrooms.bedroomBeds)} <br />
      Number of bathrooms: {listingInfo.listing.metadata.numOfBathrooms}
      <br /></>
    )
  }

  if (!props.token) {
    showListings()
  }

  return (
    <>
    {showListings()}
    {/* https://edstem.org/au/courses/9853/discussion/1105212 lecturer says dont need to check if dates are valid */}
    {/* if the user is logged in can make a booking else booking button will not show */}
    <br />
    <hr />
    {viewBookingsList.map((bookings, idx) => {
      if (Number(bookings.listingId) === Number(id) && bookings.owner === ownerEmail) {
        let colour = 'green';
        if (bookings.status === 'pending') {
          colour = 'yellow';
        }
        if (bookings.status === 'declined') {
          colour = 'red';
        }
        return (
          <div key={bookings.id}>
            Booking Id: {bookings.id}<br />
            Price: ${bookings.totalPrice}<br />
            startDate: {new Date(bookings.dateRange.start).toUTCString()}<br />
            startEnd: {new Date(bookings.dateRange.end).toUTCString()}<br />
            <br />
            <ShowStatus textMessage={bookings.status} textColour={colour}/>
            <br />
            <br />
            <hr />
          </div>
        );
      } else {
        return null;
      }
    })}
    {acceptedBooking
      ? <div>
        <ReviewListingModal refreshViewing={getListingInfo} modalTitle='Leave Review' modalListingId={Number(acceptedBooking.listingId)} modalBookingId={Number(acceptedBooking.id)} modalToken={props.token}> Leave A Review </ReviewListingModal>
        <br />
        <hr />
      </div>
      : null
    }
    { props.token
      ? <MakeBookingModalPopup makeBookingModalPopupTest='makeBookingModalPopupTest' makeBookingTest='makeBookingTest' modalTitle='Make Booking' modalListingId={Number(id)} modalToken={props.token} price={Number(listingInfo.listing.price)} booking={fetchBookings}/>
      : <> <br /> <br /> Please Sign In To Make Booking </>
    }
    </>
  );
}

export default ViewListing;

ViewListing.propTypes = {
  token: PropTypes.string
};
