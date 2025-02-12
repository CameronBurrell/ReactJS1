import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BigButton from '../components/BigButton';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DatePicker from '../components/DatePicker';
import NotificationBooking from '../components/NotificationBooking'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '20em',
  width: '20em',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

const MakeBookingModalPopup = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [startDateBooking, setStartDateBooking] = React.useState(dayjs('2023-11-20'))
  const [endDateBooking, setEndDateBooking] = React.useState(dayjs('2023-11-20'));
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const makeBookingRequest = async (info) => {
    const response = await fetch('http://localhost:5005/bookings/new/' + props.modalListingId, {
      method: 'POST',
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
      setOpenSnackBar(true);
      props.booking();
      setOpen(false);
    }
  }
  const closeButton = () => {
    setOpen(false);
  }
  const filteredInfo = () => {
    const startDate = startDateBooking.$d;
    const endDate = endDateBooking.$d;
    const numberOfNights = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    return {
      dateRange: { start: startDate, end: endDate },
      totalPrice: numberOfNights * props.price
    }
  }
  return (
    <span>
      <BigButton id={props.makeBookingModalPopupTest} onClick={handleOpen}>{props.modalTitle}</BigButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Make Booking
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <DatePicker value={startDateBooking} setValue={setStartDateBooking} titleOfDatePicker='Start Date'/>
          <DatePicker value={endDateBooking} setValue={setEndDateBooking} titleOfDatePicker='End Date'/><br />

          <BigButton id={props.makeBookingTest} onClick={() => makeBookingRequest(filteredInfo())}>Make Booking</BigButton>
          <br />
          <br />
          <BigButton onClick={() => closeButton()}> Close </BigButton>
        </Box>
      </Modal>
      <NotificationBooking open={openSnackBar} onClose={handleCloseSnackBar}/>
    </span>
  );
}
export default MakeBookingModalPopup;

MakeBookingModalPopup.propTypes = {
  modalTitle: PropTypes.string,
  modalListingId: PropTypes.number,
  modalToken: PropTypes.string,
  price: PropTypes.number,
  booking: PropTypes.func,
  makeBookingTest: PropTypes.string,
  makeBookingModalPopupTest: PropTypes.string,
};
