import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BigButton from '../components/BigButton';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

// import {
//   Link,
// } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '24em',
  width: '20em',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

const ReviewListingModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reviewValue, setReviewValue] = React.useState(0);
  const [textValue, setTextValue] = React.useState('');

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const LeaveReviewListing = async (info) => {
    const response = await fetch('http://localhost:5005/listings/' + props.modalListingId + '/review/' + props.modalBookingId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.modalToken}`,
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      // props.refreshViewing()
      setOpen(false);
    }
  }
  const closeButton = () => {
    setOpen(false);
  }
  return (
    <span>
      <BigButton onClick={handleOpen}>{props.modalTitle}</BigButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave Review
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <Typography component="legend">Rate Stay Out Of 5 Stars</Typography>
          <Rating
            name="simple-controlled"
            value={reviewValue}
            onChange={(event, newValue) => {
              setReviewValue(newValue);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Leave Review"
            placeholder='Please Leave A Review Here'
            multiline
            maxRows={4}
            value={textValue}
            onChange={handleChange}
          />
          <br />
          <br />
          <BigButton onClick={() => LeaveReviewListing({ review: { starRating: reviewValue, reviewText: textValue } })}>Post Review</BigButton> <br />
          <br />
          <BigButton onClick={() => closeButton()}> Close </BigButton>
        </Box>
      </Modal>
    </span>
  );
}
export default ReviewListingModal;

ReviewListingModal.propTypes = {
  modalTitle: PropTypes.string,
  modalListingId: PropTypes.number,
  modalBookingId: PropTypes.number,
  modalToken: PropTypes.string,
  refreshViewing: PropTypes.func,
};
