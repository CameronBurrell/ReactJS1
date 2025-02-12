import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationBooking = (props) => {
  const { onClose, open } = props;
  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
          You Have Successfully Made A Booking!
        </Alert>
      </Snackbar>
  );
}

export default NotificationBooking;
NotificationBooking.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
