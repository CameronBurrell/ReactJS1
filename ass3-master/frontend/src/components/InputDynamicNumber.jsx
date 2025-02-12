import React from 'react';
import PropTypes from 'prop-types';
import BigButton from './BigButton';

const InputDynamicNumber = (props) => {
  const [newListingNumBedrooms, setNewListingNumBedrooms] = React.useState(props.numOfInputs);
  const [allBedrooms, setAllBedrooms] = React.useState(props.bedrooms);
  const addBedroom = () => {
    setNewListingNumBedrooms(newListingNumBedrooms + 1)
    const allBedroomsCopy = [...allBedrooms]
    allBedroomsCopy.push(0)
    setAllBedrooms(allBedroomsCopy)
    props.setState(allBedroomsCopy)
    props.setStateInputAmount(newListingNumBedrooms + 1)
  }

  const removeBedroom = () => {
    setNewListingNumBedrooms(newListingNumBedrooms - 1)
    const allBedroomsCopy = [...allBedrooms]
    allBedroomsCopy.pop()
    setAllBedrooms(allBedroomsCopy)
    props.setState(allBedroomsCopy)
    props.setStateInputAmount(newListingNumBedrooms - 1)
  }

  React.useEffect(() => {
    const allBedroomsCopy = [...allBedrooms]
    setAllBedrooms(allBedroomsCopy)
    props.setState(allBedroomsCopy)
    props.setStateInputAmount(newListingNumBedrooms)
  }, []);

  return <div>
  <BigButton onClick={addBedroom}> Add Bedroom </BigButton>
  {(newListingNumBedrooms > 0) &&
    <>
    <BigButton onClick={removeBedroom}> Remove Bedroom</BigButton>
      {Array.from(Array(newListingNumBedrooms)).map((c, index) => {
        return <div key={'Bedroom' + index}>
          Bedroom {index + 1}: <input type="number" value={allBedrooms[index]} min='0' placeholder='Number of Beds' onChange={(e) => {
          const allBedroomsCopy = [...allBedrooms]
          allBedroomsCopy[index] = Number(e.target.value)
          setAllBedrooms(allBedroomsCopy)
          props.setState(allBedroomsCopy)
          props.setStateInputAmount(allBedroomsCopy.length)
        }}></input>
        </div>
      })}
    </>
  }
</div>
};

export default InputDynamicNumber;

InputDynamicNumber.propTypes = {
  numOfInputs: PropTypes.number,
  bedrooms: PropTypes.array,
  setState: PropTypes.func,
  setStateInputAmount: PropTypes.func,
};
