import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';
import InputText from '../components/InputText';
import FileToData from '../components/FileToData';
import InputDynamicNumber from '../components/InputDynamicNumber';
import InputDynamicString from '../components/InputDynamicString';
import {
  Link,
  useParams,
} from 'react-router-dom';
// session storage
const ListingEdit = (props) => {
  const [updateTitle, setUpdateTitle] = React.useState('');
  const [updateAddressStreet, setUpdateAddressStreet] = React.useState('');
  const [updateAddressCity, setUpdateAddressCity] = React.useState('');
  const [updateAddressState, setUpdateAddressState] = React.useState('');
  const [updateAddressPostcode, setUpdateAddressPostcode] = React.useState('');
  const [updateAddressCountry, setUpdateAddressCountry] = React.useState('');
  const [updatePropertyType, setUpdatePropertyType] = React.useState('');
  const [updateNumOfBathrooms, setUpdateNumOfBathrooms] = React.useState('');

  const [updateNumOfBedrooms, setUpdateNumOfBedrooms] = React.useState(0);
  const [updateNumOfBeds, setUpdateNumOfBeds] = React.useState([]);

  const [updateAmenities, setUpdateAmenities] = React.useState([]);

  // This needs to be added later a loop through all the files
  const [updateListingPrice, updateNewListingPrice] = React.useState('');
  const [newListingThumbnail, setNewListingThumbnail] = React.useState('');

  const { id } = useParams();
  const [listingDetails, setListingdetails] = React.useState([])

  const [updateListingUrl, setUpdateListingUrl] = React.useState('');

  const updateHostedListingInfo = async (info) => {
    const response = await fetch('http://localhost:5005/listings/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // console.log('hello you have updated');
    }
  };

  const fetchListingDetails = async () => {
    const response = await fetch('http://localhost:5005/listings/' + id, {
      method: 'GET',
    });
    const data = await response.json();
    setListingdetails([data])
  }

  React.useEffect(() => {
    fetchListingDetails()
  }, []);

  const [allPropertyPhotos, setPropertyPhotos] = React.useState([])
  const uploadPropertyPhotos = () => {
    const eachFile = document.getElementById('new-property-photos').files
    for (let i = 0; i < eachFile.length; i++) {
      FileToData(eachFile[i]).then((data) => { setPropertyPhotos((allPropertyPhotos) => [...allPropertyPhotos, data]) })
    }
  }
  return (
    <>
      {listingDetails.map((listingInfo, idx) => {
        return <div key={'Title' + listingInfo.title}>
          <h1>Editing AirBrB Listing: {listingInfo.listing.title}</h1>
          <br />
          <InputText id="updateTitleTest"value={listingInfo.listing.title} inputType='text' setState={setUpdateTitle} lableTitle='Edit Title:'></InputText>
          <br />
          Address:
          <br />
          <InputText value={listingInfo.listing.address.street} inputType='text' setState={setUpdateAddressStreet} lableTitle='Edit Listing Address Street:'></InputText>
          <InputText value={listingInfo.listing.address.city} inputType='text' setState={setUpdateAddressCity} lableTitle='Edit Listing Address City:'></InputText>
          <InputText value={listingInfo.listing.address.state} inputType='text' setState={setUpdateAddressState} lableTitle='Edit Listing Address State:'></InputText>
          <InputText value={listingInfo.listing.address.postcode} inputType='text' setState={setUpdateAddressPostcode} lableTitle='Edit Listing Address Postcode:'></InputText>
          <InputText value={listingInfo.listing.address.country} inputType='text' setState={setUpdateAddressCountry} lableTitle='Edit Listing Address Country:'></InputText>
          <br />
          <InputText value={listingInfo.listing.price} inputType='number' setState={updateNewListingPrice} lableTitle='Edit Listing Price:'></InputText>
          <br />
          <InputText value={listingInfo.listing.metadata.propertyType} inputType='text' setState={setUpdatePropertyType} lableTitle='Edit Property Type:'></InputText>
          <br />
          Edit Bed And Bedrooms:
          <br />
          <InputDynamicNumber setStateInputAmount={setUpdateNumOfBedrooms} setState={setUpdateNumOfBeds} numOfInputs={listingInfo.listing.metadata.bedrooms.numOfBedrooms} bedrooms={listingInfo.listing.metadata.bedrooms.bedroomBeds}></InputDynamicNumber>
          <br />
          <InputText value={listingInfo.listing.metadata.numOfBathrooms} inputType='number' setState={setUpdateNumOfBathrooms} lableTitle='Edit Number of Bathrooms:'></InputText>
          <br />
          <InputDynamicString setAmenities={setUpdateAmenities} amenities={listingInfo.listing.metadata.amenities}></InputDynamicString>
          <br />
          Upload new thumbnail:
          <br />
          <input id="list-new-listing-thumbnail" type="file" onChange={() => FileToData(document.getElementById('list-new-listing-thumbnail').files[0]).then((data) => { setNewListingThumbnail(data) })}/>
          <br />
          <br />
          Upload new property photos:
          <br />
          <input id="new-property-photos" multiple="multiple" type="file" onChange={ uploadPropertyPhotos }/>
          <br />
          <br />
          <InputText required={false} value={listingInfo.listing.metadata.url} inputType='text' setState={setUpdateListingUrl} lableTitle='Edit Youtube Url Thumbnail:'></InputText>
          <br />
          <Link to={'/listing/hostinglisting'}>
            <BigButton id="updateInfoButtonTest" onClick={() => updateHostedListingInfo({
              title: updateTitle,
              address: {
                street: updateAddressStreet,
                city: updateAddressCity,
                state: updateAddressState,
                postcode: updateAddressPostcode,
                country: updateAddressCountry
              },
              price: updateListingPrice,
              thumbnail: newListingThumbnail,
              metadata: {
                url: updateListingUrl,
                propertyPhotos: allPropertyPhotos,
                propertyType: updatePropertyType,
                bedrooms: {
                  numOfBedrooms: updateNumOfBedrooms,
                  bedroomBeds: updateNumOfBeds
                },
                numOfBathrooms: updateNumOfBathrooms,
                amenities: updateAmenities
              }
            })}>Save Updates</BigButton>
          </Link>
        </div>
      })}
    </>
  );
}

export default ListingEdit;

ListingEdit.propTypes = {
  token: PropTypes.string
};
