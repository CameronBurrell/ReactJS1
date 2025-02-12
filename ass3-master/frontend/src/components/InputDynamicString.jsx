import React from 'react';
import PropTypes from 'prop-types';
import BigButton from './BigButton';

const InputDynamicString = (props) => {
  const [newListingNumAmenities, setNewListingNumAmenities] = React.useState(props.amenities.length);
  const [allAmenities, setAllAmenities] = React.useState(props.amenities);
  const addAmenities = () => {
    setNewListingNumAmenities(newListingNumAmenities + 1)
    const allAmenitiesCopy = [...allAmenities]
    allAmenitiesCopy.push('')
    setAllAmenities(allAmenitiesCopy)
    props.setAmenities(allAmenitiesCopy)
  }

  const removeAmenities = () => {
    setNewListingNumAmenities(newListingNumAmenities - 1)
    const allAmenitiesCopy = [...allAmenities]
    allAmenitiesCopy.pop()
    setAllAmenities(allAmenitiesCopy)
    props.setAmenities(allAmenitiesCopy)
  }

  React.useEffect(() => {
    const allAmenitiesCopy = [...allAmenities]
    setAllAmenities(allAmenitiesCopy)
    props.setAmenities(allAmenitiesCopy)
  }, []);

  return <div>
    <BigButton onClick={addAmenities}> Add amenity </BigButton>
    {(newListingNumAmenities > 0) &&
      <>
      <BigButton onClick={removeAmenities}> Remove amenity</BigButton>
        {Array.from(Array(newListingNumAmenities)).map((c, index) => {
          return <div key={'Amenity' + index}>
            Amenity {index + 1}: <input type="text" value={allAmenities[index]} placeholder='Amenity' onChange={(e) => {
            const allAmenitiesCopy = [...allAmenities]
            allAmenitiesCopy[index] = e.target.value
            setAllAmenities(allAmenitiesCopy)
            props.setAmenities(allAmenitiesCopy)
          }}></input>
          </div>
        })}
      </>
    }
  </div>
};

export default InputDynamicString;

InputDynamicString.propTypes = {
  numOfInputs: PropTypes.number,
  amenities: PropTypes.array,
  setAmenities: PropTypes.func,
};
