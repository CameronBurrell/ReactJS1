
import React from 'react';
import BigButton from './BigButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputText from './InputText';
import FileToData from './FileToData';
import PropTypes from 'prop-types';

const CreateListingModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formRef = React.useRef();

  const [newListingTitle, setNewListingTitle] = React.useState('');
  const [newListingAddressStreet, setNewListingAddressStreet] = React.useState('');
  const [newListingAddressCity, setNewListingAddressCity] = React.useState('');
  const [newListingAddressState, setNewListingAddressState] = React.useState('');
  const [newListingAddressPostcode, setNewListingAddressPostcode] = React.useState('');
  const [newListingAddressCountry, setNewListingAddressCountry] = React.useState('');

  const [newListingPrice, setNewListingPrice] = React.useState('');

  const [newListingThumbnail, setNewListingThumbnail] = React.useState('');

  const [newListingType, setNewListingType] = React.useState('');
  const [newListingBathrooms, setNewListingBathrooms] = React.useState('');

  const [newListingUrl, setNewListingUrl] = React.useState('');

  const newListing = async (args) => {
    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(args),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.fetchListings();
      setOpen(false)
    }
  }

  const [newListingNumBedrooms, setNewListingNumBedrooms] = React.useState(0);
  const [allBedrooms, setAllBedrooms] = React.useState([]);

  const addBedroom = () => {
    setNewListingNumBedrooms(newListingNumBedrooms + 1)
    const allBedroomsCopy = [...allBedrooms]
    allBedroomsCopy.push(0)
    setAllBedrooms(allBedroomsCopy)
  }

  const removeBedroom = () => {
    setNewListingNumBedrooms(newListingNumBedrooms - 1)
    const allBedroomsCopy = [...allBedrooms]
    allBedroomsCopy.pop()
    setAllBedrooms(allBedroomsCopy)
  }

  const [newListingNumAmenities, setNewListingNumAmenities] = React.useState(0);
  const [allAmenities, setAllAmenities] = React.useState([]);
  const addAmenities = () => {
    setNewListingNumAmenities(newListingNumAmenities + 1)
    const allAmenitiesCopy = [...allAmenities]
    allAmenitiesCopy.push('')
    setAllAmenities(allAmenitiesCopy)
  }

  const removeAmenities = () => {
    setNewListingNumAmenities(newListingNumAmenities - 1)
    const allAmenitiesCopy = [...allAmenities]
    allAmenitiesCopy.pop()
    setAllAmenities(allAmenitiesCopy)
  }

  const photoOnChange = () => {
    FileToData(document.getElementById('list-new-listing-thumbnail').files[0]).then((data) => { setNewListingThumbnail(data) })
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '30em',
    width: '20em',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
  }

  const validateInfo = () => {
    if (formRef.current.reportValidity()) {
      newListing({
        title: newListingTitle,
        address: {
          street: newListingAddressStreet,
          city: newListingAddressCity,
          state: newListingAddressState,
          postcode: newListingAddressPostcode,
          country: newListingAddressCountry
        },
        price: newListingPrice,
        thumbnail: newListingThumbnail,
        metadata: {
          url: newListingUrl,
          propertyPhotos: [],
          propertyType: newListingType,
          bedrooms: {
            numOfBedrooms: newListingNumBedrooms,
            bedroomBeds: allBedrooms
          },
          numOfBathrooms: newListingBathrooms,
          amenities: allAmenities
        }
      })
    }
  }
  // https://stackoverflow.com/questions/23344776/how-to-access-data-of-uploaded-json-file
  const acceptJson = (file) => {
    const parseJsonFile = (file) => {
      const reader = new FileReader();
      const dataPromise = new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = event => resolve(JSON.parse(event.target.result))
      });
      reader.readAsText(file)
      return dataPromise;
    }

    parseJsonFile(document.getElementById('json-upload').files[0]).then((data) => {
      const jsonListingInfo = Object.values(data)[0]

      let bedrooms = 0
      let beds = []
      if (jsonListingInfo.metadata.bedrooms.bedroomBeds.length !== 0) {
        bedrooms = jsonListingInfo.metadata.bedrooms.numOfBedrooms
        beds = jsonListingInfo.metadata.bedrooms.bedroomBeds
      }

      let amenity = []
      if (jsonListingInfo.metadata.amenities !== 0) {
        amenity = jsonListingInfo.metadata.amenities
      }

      newListing({
        title: jsonListingInfo.title,
        address: {
          street: jsonListingInfo.address.street,
          city: jsonListingInfo.address.city,
          state: jsonListingInfo.address.state,
          postcode: jsonListingInfo.address.postcode,
          country: jsonListingInfo.address.country
        },
        price: jsonListingInfo.price,
        thumbnail: jsonListingInfo.thumbnail,
        metadata: {
          url: jsonListingInfo.metadata.url,
          propertyPhotos: jsonListingInfo.metadata.propertyPhotos,
          propertyType: jsonListingInfo.metadata.propertyType,
          bedrooms: {
            numOfBedrooms: bedrooms,
            bedroomBeds: beds
          },
          numOfBathrooms: jsonListingInfo.metadata.numOfBathrooms,
          amenities: amenity
        }
      })
      setOpen(false)
    })
  }

  return (
    <>
      <div>
      <BigButton id={props.id} onClick={handleOpen}>Create New Listing</BigButton>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
        <h1 style={{ margin: 0 }}>Listing new Airbnb!</h1> <br />
        <form ref={formRef}>
        <InputText id="titleTestCreate" inputType='text' state={newListingTitle} setState={setNewListingTitle} lableTitle='Listing Title:'></InputText>
        <br />
        Address:
        <br />
        <InputText id="addressTestStreet" inputType='text' state={newListingAddressStreet} setState={setNewListingAddressStreet} lableTitle='Listing Address Street:'></InputText>
        <InputText id="addressTestCity" inputType='text' state={newListingAddressCity} setState={setNewListingAddressCity} lableTitle='Listing Address City:'></InputText>
        <InputText id="addressTestState" inputType='text' state={newListingAddressState} setState={setNewListingAddressState} lableTitle='Listing Address State:'></InputText>
        <InputText id="addressTestPostcode" inputType='text' state={newListingAddressPostcode} setState={setNewListingAddressPostcode} lableTitle='Listing Address Postcode:'></InputText>
        <InputText id="addressTestCountry" inputType='text' state={newListingAddressCountry} setState={setNewListingAddressCountry} lableTitle='Listing Address Country:'></InputText>
        <br />
        <InputText id="priceTestCreate" inputType='number' state={newListingPrice} setState={setNewListingPrice} lableTitle='Listing Price (Per Night):'></InputText>
        <br />
        <InputText id="typeTestCreate" inputType='text' state={newListingType} setState={setNewListingType} lableTitle='Property Type:'></InputText>
        <br />
        Bedrooms:
        <div>
          <BigButton id="bedroomTestAddButtonCreate" onClick={addBedroom}> Add Bedroom </BigButton>
          {(newListingNumBedrooms > 0) &&
            <>
            <BigButton onClick={removeBedroom}> Remove Bedroom</BigButton>
              {Array.from(Array(newListingNumBedrooms)).map((c, index) => {
                return <div key={'Bedroom' + index}>
                  Bedroom {index + 1}: <input id="bedroomTestCreate" required type="number" min='0' placeholder='Number of Beds' onChange={(e) => {
                  const allBedroomsCopy = [...allBedrooms]
                  allBedroomsCopy[index] = Number(e.target.value)
                  setAllBedrooms(allBedroomsCopy)
                }}></input>
                </div>
              })}
            </>
          }
        </div>
        <br />
        <InputText id="bathroomTestCreate" inputType='number' state={newListingBathrooms} setState={setNewListingBathrooms} lableTitle='Property bathrooms:'></InputText>
        <br />
        <div>
          <BigButton id="amenitiesTestAddButtonCreate" onClick={addAmenities}> Add amenity </BigButton>
          {(newListingNumAmenities > 0) &&
            <>
            <BigButton onClick={removeAmenities}> Remove amenity</BigButton>
              {Array.from(Array(newListingNumAmenities)).map((c, index) => {
                return <div key={'Amenity' + index}>
                  Amenity {index + 1}: <input required id="amentiyTestCreate" type="text" placeholder='Amenity' onChange={(e) => {
                  const allAmenitiesCopy = [...allAmenities]
                  allAmenitiesCopy[index] = e.target.value
                  setAllAmenities(allAmenitiesCopy)
                }}></input>
                </div>
              })}
            </>
          }
        </div>
        <br />
        Add thumbnail:
        <br />
        <input id="list-new-listing-thumbnail" type="file" onChange={photoOnChange}/><br />
        <br />
        <InputText id="youtubeVideoLinkTest" required={false} inputType='text' state={newListingUrl} setState={setNewListingUrl} lableTitle='Youtube Url Thumbnail:'></InputText>
        <br />
        <h2>Listing Upload Json file (Optional):</h2>
        <input id="json-upload" type="file" accept=".json" onChange={acceptJson}/><br />
        <br />
        <br />
        <BigButton id="createListingTestButton" onClick={validateInfo}>Create!</BigButton>
        </form>
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default CreateListingModal;

CreateListingModal.propTypes = {
  token: PropTypes.string,
  fetchListings: PropTypes.func,
  id: PropTypes.string,
}
