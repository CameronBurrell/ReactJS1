import PropTypes from 'prop-types';
import React from 'react';

import {
  useParams,
} from 'react-router-dom';
import BigButton from '../components/BigButton';
import ShowStatus from '../components/ShowStatus'

const ViewBookings = (props) => {
  const { id } = useParams();
  const [viewBookingsList, setViewBookingsList] = React.useState([]);
  const [listingInfo, setListingInfo] = React.useState({});
  const ownerEmail = localStorage.getItem('ownerEmail');
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

  const fetchListingInfo = async () => {
    const response = await fetch('http://localhost:5005/listings/' + id, {
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
      setListingInfo(data);
    }
  }
  // https://edstem.org/au/courses/9853/discussion/1116536
  // calculate all if starting this year
  const bookingProfitCalc = () => {
    let profit = 0
    const currentYear = new Date().getFullYear();
    viewBookingsList.map((bookings, idx) => {
      const startDateYear = new Date(bookings.dateRange.start).getFullYear();
      if (Number(bookings.listingId) === Number(id) && startDateYear === currentYear && bookings.status === 'accepted') {
        profit += bookings.totalPrice;
      }
      return null;
    });
    return (
      <>
        Total Profit This Year For This Listing: ${profit} <br />
      </>
    )
  }

  const bookingDaysCalc = () => {
    const currentYear = new Date().getFullYear();
    let numOfDays = 0;
    viewBookingsList.map((bookings, idx) => {
      const startDateYear = new Date(bookings.dateRange.start).getFullYear();
      if (Number(bookings.listingId) === Number(id) && startDateYear === currentYear && bookings.status === 'accepted') {
        const startDate = new Date(bookings.dateRange.start);
        const endDate = new Date(bookings.dateRange.end);
        const amountOfNights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        numOfDays += amountOfNights;
      }
      return null;
    });
    return (
      <>
        Number of Days This Year Property Has Been Booked: {numOfDays} Days
      </>
    )
  }
  // https://edstem.org/au/courses/9853/discussion/1131246
  const timeListingOnline = () => {
    const currentDate = new Date();
    const publishedDate = new Date(listingInfo.listing.postedOn);
    const amountOfNights = Math.floor((currentDate - publishedDate) / (1000 * 60 * 60 * 24));
    return (
      <>
        Number of Days Online: {amountOfNights}
      </>
    )
  }
  const bookingAccept = async (bookingId) => {
    const response = await fetch('http://localhost:5005/bookings/accept/' + bookingId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      fetchBookings();
    }
  }

  const bookingDecline = async (bookingId) => {
    const response = await fetch('http://localhost:5005/bookings/decline/' + bookingId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      fetchBookings();
    }
  }
  React.useEffect(() => {
    fetchBookings();
    fetchListingInfo();
  }, []);

  // this is to wait to the object to populate
  if (!listingInfo.listing) {
    return (
      <div>
        ......Loading......
      </div>
    );
  }
  const statusColour = (status) => {
    if (status === 'accepted') {
      return (
        <div>
          <br />
          <ShowStatus textMessage={status} textColour='green'/>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <ShowStatus textMessage={status} textColour='red'/>
        </div>
      )
    }
  }
  return (
    <>
      <hr />
      {timeListingOnline()}
      <hr />
      BOOKING HISTORY
      <br />
      <br />
      {viewBookingsList.map((bookings, idx) => {
        if (Number(bookings.listingId) === Number(id) && (bookings.status === 'accepted' || bookings.status === 'declined')) {
          return (
            <div key={bookings.id}>
              Booking Request For: {listingInfo.listing.title} <br />
              By: {ownerEmail} <br />
              StartDate: {new Date(bookings.dateRange.start).toUTCString()} <br />
              EndDate: {new Date(bookings.dateRange.end).toUTCString()} <br />
              Status: {statusColour(bookings.status)}
              <br />
              <br />
            </div>
          );
        } else {
          return null;
        }
      })}
      {bookingProfitCalc()}
      {bookingDaysCalc()}
      <hr />
      <br />
      {viewBookingsList.map((bookings, idx) => {
        if (Number(bookings.listingId) === Number(id) && bookings.status === 'pending') {
          return (
            <div key={bookings.id}>
              Booking Request for: {listingInfo.listing.title} <br />
              By: {ownerEmail} <br />

              StartDate: {bookings.dateRange.start} <br />
              EndDate: {bookings.dateRange.end} <br />
              <br />
              <BigButton onClick={() => bookingAccept(bookings.id)}> Accept </BigButton>
              <BigButton onClick={() => bookingDecline(bookings.id)}> Decline </BigButton>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  )
}

export default ViewBookings;

ViewBookings.propTypes = {
  token: PropTypes.string
};
