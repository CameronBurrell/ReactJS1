import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const StarRating = (props) => {
  return (
    <Stack style={{ display: 'inline-block', cursor: 'pointer' }} spacing={1}>
      <Rating name="half-rating-read"
      defaultValue={props.averageRating} precision={0.1} readOnly />
    </Stack>
  );
};

export default StarRating;

StarRating.propTypes = {
  averageRating: PropTypes.number,
};
