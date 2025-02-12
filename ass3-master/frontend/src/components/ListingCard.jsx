import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';
import ReviewHover from '../components/ReviewHover';
import GoLiveModalPopup from '../components/GoLiveModalPopup';
import ProfitsModal from '../components/ProfitsModal';

import {
  Link,
} from 'react-router-dom';

const ListingCard = (props) => {
  const { hostedListing, token, deleteListing, unpublishListing, bookingAvailable, listingId } = props;
  const [published, setPublished] = React.useState(hostedListing.published);
  let numberOfBeds = 0
  for (let i = 0; i < hostedListing.metadata.bedrooms.bedroomBeds.length; i++) {
    numberOfBeds += Number(hostedListing.metadata.bedrooms.bedroomBeds[i]);
  }

  const embeddedUrl = 'https://www.youtube.com/embed/' + hostedListing.metadata.url.slice(32)
  return (
    <div style={{ backgroundColor: '#F5CBA7', borderRadius: 10 }}>
      <Link id={props.editTest} to={`/listing/edit/${listingId}`}>
      <h1 style={{ backgroundColor: '#DC7633', margin: 0, borderRadius: 5, width: 320 }}>{hostedListing.title}</h1>
      <br />
      {hostedListing.metadata.url === ''
        ? <img style={{ width: 320, height: 320, borderRadius: 20 }} src={hostedListing.thumbnail} />
        : <iframe style={{ width: 320, height: 320, borderRadius: 20 }} src={embeddedUrl}></iframe>
      }
      </Link><br />
      <ReviewHover reviews={hostedListing.reviews} title={hostedListing.title}></ReviewHover>
      <br />
      Property Type: {hostedListing.metadata.propertyType}
      <br />
      Number of Beds: {numberOfBeds}
      <br />
      Number of Bathrooms: {hostedListing.metadata.numOfBathrooms}
      <br />
      Price (per night): ${hostedListing.price}
      <br />
      Number of total reviews: {hostedListing.reviews.length}
      <br />
      <br />
      {bookingAvailable
        ? <Link to={`/listing/viewbookings/${listingId}`}> <BigButton> view bookings </BigButton> </Link>
        : <BigButton> No Bookings Pending </BigButton>
      }
      <br />
      <br />
      <ProfitsModal title={hostedListing.title} token={token} listingId={listingId}></ProfitsModal>
      <br />
      {published
        ? <BigButton id={props.unpublishTest} onClick={() => unpublishListing(listingId)}>unpublish Listing</BigButton>
        : <GoLiveModalPopup publishListingTest={props.publishListingTest} publishTest={props.publishTest} modalTitle='GO LIVE' modalHostedListingId={listingId} modalToken={token} setPublished={setPublished} />
      }
      <BigButton id="deleteListing" onClick={() => deleteListing(listingId)}>Delete</BigButton>
    </div>
  )
}

ListingCard.propTypes = {
  editTest: PropTypes.string,
  unpublishTest: PropTypes.string,
  publishTest: PropTypes.string,
  publishListingTest: PropTypes.string,
  hostedListing: PropTypes.object,
  token: PropTypes.string,
  unpublishListing: PropTypes.func,
  deleteListing: PropTypes.func,
  bookingAvailable: PropTypes.bool,
  listingId: PropTypes.number,
};

export default ListingCard;
