import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const BigButton = (props) => {
  return (
    <Button
      sx={{ fontSize: '8pt' }}
      onClick={props.onClick}
      variant="outlined"
      id={props.id}
    >
    {props.children}
    </Button>
  );
};

export default BigButton;

BigButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  id: PropTypes.string,
};
