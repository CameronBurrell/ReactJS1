import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DatePicker from '../components/DatePicker';
import BigButton from '../components/BigButton';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

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

const GoLiveModalPopup = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const publishListing = async (value) => {
    setDates([{ start: dayjs('2023-11-20'), end: dayjs('2023-11-20') }]);
    const response = await fetch('http://localhost:5005/listings/publish/' + props.modalHostedListingId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.modalToken}`,
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setPublished(true);
    }
  }
  const closeButton = () => {
    setOpen(false);
    setDates([{ start: dayjs('2023-11-20'), end: dayjs('2023-11-20') }]);
  }
  const [dates, setDates] = React.useState([{ start: dayjs('2023-11-20'), end: dayjs('2023-11-20') }]);

  const updateStart = (index, newValue) => {
    const newDates = [...dates];
    newDates[index].start = newValue;
    setDates(newDates);
  };
  const updateEnd = (index, newValue) => {
    const newDates = [...dates];
    newDates[index].end = newValue;
    setDates(newDates);
  };
  const addRange = () => {
    const newDates = [...dates];
    newDates.push({ start: dayjs('2023-11-20'), end: dayjs('2023-11-20') });
    setDates(newDates);
  };
  // https://edstem.org/au/courses/9853/discussion/1110638
  return (
    <span>
      <BigButton id={props.publishTest}onClick={handleOpen}>{props.modalTitle}</BigButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Publish Listing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          {dates.map((dateRange, index) => (
            <div key={index}>
            <DatePicker value={dateRange.start} setValue={newValue => updateStart(index, newValue)} titleOfDatePicker='Start Date'/>
            <DatePicker value={dateRange.end} setValue={newValue => updateEnd(index, newValue)} titleOfDatePicker='End Date'/><br />
            </div>
          ))}
          <BigButton id={props.publishListingTest} onClick={() => publishListing({ availability: dates })}>Publish Listing</BigButton>
          <BigButton onClick={addRange}>Add More Dates</BigButton>
          <br />
          <br />
          <BigButton onClick={() => closeButton()}> Close </BigButton>
        </Box>
      </Modal>
    </span>
  );
}
export default GoLiveModalPopup;

GoLiveModalPopup.propTypes = {
  modalTitle: PropTypes.string,
  modalHostedListingId: PropTypes.number,
  modalToken: PropTypes.string,
  setPublished: PropTypes.func,
  publishTest: PropTypes.string,
  publishListingTest: PropTypes.string,
};
