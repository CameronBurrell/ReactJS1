import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const ShowStatus = (props) => {
  return (
      <Box
      component="div"
      sx={{
        display: 'inline',
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? props.textColour : props.textColour),
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
    >
    { props.textMessage }
    </Box>
  )
}

export default ShowStatus;

ShowStatus.propTypes = {
  textColour: PropTypes.string,
  textMessage: PropTypes.string,
};
