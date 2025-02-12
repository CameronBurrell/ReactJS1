import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import 'date-fns';

import dayjs from 'dayjs';
import DetailsOfListing from '../components/DetailsOfListing';
import DashBoardSearchCard from '../components/DashBoardSearchCard';
import BigButton from '../components/BigButton';
import ShowStatus from '../components/ShowStatus';
import ReviewHover from '../components/ReviewHover';

import {
  Link,
} from 'react-router-dom';

const Dashboard = (props) => {
  const [listings, setListings] = React.useState([]);
  const ownerEmail = localStorage.getItem('ownerEmail');
  const [searchString, setSearchString] = React.useState('');
  const [listingsFiltered, setListingsFiltered] = React.useState([]);

  const [maxPrice, setMaxPrice] = React.useState(Infinity);
  const [priceRange, setPriceRange] = React.useState([0, maxPrice]);

  const [maxBedrooms, setMaxBedrooms] = React.useState(Infinity);
  const [bedroomRange, setBedroomRange] = React.useState([0, maxBedrooms]);

  const [startDate, setStartDate] = React.useState(dayjs('2022-11-21'));
  const [endDate, setEndDate] = React.useState(dayjs('2022-11-25'));

  const [isDateSearch, setIsDateSearch] = React.useState(false);
  const [toggleSearchButton, setToggleSearchButton] = React.useState(false);

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

  const fetchListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET'
    });
    const data = await response.json();
    const newdata = await Promise.all(data.listings.map(async (listing) => ({ id: listing.id, ...await DetailsOfListing(listing.id) })))
    setListings(newdata);
  }

  React.useEffect(() => {
    fetchListings();
    if (props.token) {
      fetchBookings();
    }
  }, [props.token]);

  React.useEffect(() => {
    setListingsFiltered(JSON.parse(JSON.stringify(listings)));
    searchWithFilters();
    let highestPrice = 0;
    let mostBedrooms = 0;
    for (let i = 0; i < listings.length; i++) {
      if (Number(listings[i].price) > highestPrice) {
        highestPrice = Number(listings[i].price)
      }
      if (Number(listings[i].metadata.bedrooms.numOfBedrooms) > mostBedrooms) {
        mostBedrooms = Number(listings[i].metadata.bedrooms.numOfBedrooms)
      }
    }
    setMaxPrice(highestPrice)
    setMaxBedrooms(mostBedrooms)
  }, [listings]);

  const matchString = (subString, titleToMatch, cityToMatch, listingPrice, listing) => {
    const listingNumBedrooms = Number(listing.metadata.bedrooms.numOfBedrooms)
    const regex = new RegExp(subString.toLowerCase())
    const matchTitle = titleToMatch.toLowerCase().match(regex);
    const matchCity = cityToMatch.toLowerCase().match(regex);
    if ((matchTitle !== null || matchCity !== null) && listingPrice >= priceRange[0] && listingPrice <= priceRange[1] && listingNumBedrooms >= bedroomRange[0] && listingNumBedrooms <= bedroomRange[1] && listing.published) {
      const inputStartDate = new Date(startDate)
      const inputEndDate = new Date(endDate)

      let withinDates = false
      if (isDateSearch) {
        for (let i = 0; i < listing.availability.length; i++) {
          const utcIsoStringStart = new Date(listing.availability[i].start)
          const utcIsoStringEnd = new Date(listing.availability[i].end)
          if ((inputStartDate >= utcIsoStringStart && inputStartDate <= utcIsoStringEnd) && (inputEndDate >= utcIsoStringStart && inputEndDate <= utcIsoStringEnd)) {
            withinDates = true
          }
        }
        return withinDates
      }
      return true
    }
    return false
  }

  const searchWithFilters = () => {
    const filterListing =
      detailListing => {
        return matchString(searchString, detailListing.title, detailListing.address.city, Number(detailListing.price), detailListing);
      }

    let filteredDetailListings
    if (props.token) {
      filteredDetailListings = listings.filter(filterListing).sort((la, lb) => {
        const aBookings = viewBookingsList.filter((booking) => Number(booking.listingId) === Number(la.id) && ownerEmail === booking.owner)
        const bBookings = viewBookingsList.filter((booking) => Number(booking.listingId) === Number(lb.id) && ownerEmail === booking.owner)
        // note: aBooking and bBooking can be undefined
        if (aBookings && bBookings) {
          const aHasAcceptedOrPending = aBookings.some((booking) => booking.status === 'accepted' || booking.status === 'pending');
          const bHasAcceptedOrPending = bBookings.some((booking) => booking.status === 'accepted' || booking.status === 'pending');
          if (aHasAcceptedOrPending !== bHasAcceptedOrPending) {
            if (aHasAcceptedOrPending && !bHasAcceptedOrPending) {
              return -1;
            } else {
              return 1;
            }
          }
        }
        return la.title.localeCompare(lb.title);
      })
    } else {
      filteredDetailListings = listings.filter(filterListing).sort((la, lb) => {
        return la.title.localeCompare(lb.title);
      });
    }
    setListingsFiltered(filteredDetailListings)
  }

  const flexBoxChildrenStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 15
  }

  return (
    <div style={{ height: '1000px' }}>
       <br />
      You Must Click The <SearchIcon /> Icon To Either Search By String Or With Filters
      {toggleSearchButton
        ? <DashBoardSearchCard
          searchString={searchString}
          setSearchString={setSearchString}
          searchWithFilters={searchWithFilters}
          bedroomRange={bedroomRange}
          setBedroomRange={setBedroomRange}
          maxBedrooms={maxBedrooms}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={maxPrice}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setIsDateSearch={setIsDateSearch}
          isDateSearch={isDateSearch}
          setListingsFiltered={setListingsFiltered}
          listingsFiltered={listingsFiltered}
        />
        : false
      }
      < br />
      <BigButton onClick={() => setToggleSearchButton(!toggleSearchButton)}>Toggle Search</BigButton>

      <br />
      <hr />
      <h1><b>Viewing All Listings:</b></h1>
      <br />
      <div style={ flexBoxChildrenStyle }>
        {listingsFiltered.length === 0
          ? (<> No Matches with filters/No available listings</>)
          : listingsFiltered.map((listing, idx) => {
            const amountOfNights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
            const embeddedUrl = 'https://www.youtube.com/embed/' + listing.metadata.url.slice(32)
            const acceptedBooking = viewBookingsList.find((booking) => Number(booking.listingId) === Number(listing.id) && booking.owner === ownerEmail && (booking.status === 'accepted' || booking.status === 'pending'))
            const value = 'bookListingTest' + idx;
            return (
              <div style={{ backgroundColor: '#F5CBA7', borderRadius: 10 }} key={listing.id}>
                <Link id={value.toString()}to={{ pathname: `/listing/viewlisting/${listing.id}`, state: { isDateSearch, amountOfNights } }}>
                  <h1 style={{ backgroundColor: '#DC7633', margin: 0, borderRadius: 5, width: 320 }}>{listing.title}</h1>
                  <br />
                  {listing.metadata.url === ''
                    ? <img style={{ width: 320, height: 320, borderRadius: 20 }} src={listing.thumbnail} />
                    : <iframe style={{ width: 320, height: 320, borderRadius: 20 }} src={embeddedUrl}></iframe>
                  }
                </Link>
                <br />
                Rating: <ReviewHover reviews={listing.reviews} title={listing.title}></ReviewHover>
                <br />
                <u>Price (Per night): ${listing.price}</u><br />
                City: {listing.address.city}<br />
                Number of reviews: {listing.reviews.length}<br />
                Bedrooms: {listing.metadata.bedrooms.numOfBedrooms}
                <br />
                <br />
                <br />
                <br />
                <br />
                {acceptedBooking
                  ? <div>
                    <ShowStatus textMessage='BookingAccept/Pending' textColour='yellow'/>
                    <br />
                    <hr />
                  </div>
                  : null
                }
              <br />
              </div>
            )
          })
          }
      </div>
      <br />
      <br />
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  token: PropTypes.string
};
