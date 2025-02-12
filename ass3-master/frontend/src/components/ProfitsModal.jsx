
import React from 'react';
import BigButton from './BigButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// https://edstem.org/au/courses/9853/discussion/1135051?answer=2526943
// This is the correct method to do it (Calculation not all on day but spread over stay length)
const ProfitsModal = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const [viewBookingsList, setViewBookingsList] = React.useState([]);
  const [profitArray, setProfitArray] = React.useState([]);

  const bookingProfitCalcEachDay = () => {
    const currentDay = new Date()
    const oneMonthAgo = new Date(currentDay.setDate(currentDay.getDate() - 31))
    let last30Days = oneMonthAgo
    const last30DaysArray = []
    for (let i = 1; last30Days < new Date(); i++) {
      last30DaysArray.push(last30Days)
      last30Days = new Date(last30Days.setDate(last30Days.getDate() + 1))
    }
    const priceArray = [...Array(31).fill(0)]
    viewBookingsList.map((bookings, idx) => {
      if (Number(bookings.listingId) === Number(props.listingId) && bookings.status === 'accepted') {
        const startDate = new Date(bookings.dateRange.start)
        const endDate = new Date(bookings.dateRange.end)
        let datesBetween = new Date(startDate.setDate(startDate.getDate() + 1))

        for (let j = 0; datesBetween <= endDate; j++) {
          const amountOfNights = Math.floor((new Date(bookings.dateRange.end) - new Date(bookings.dateRange.start)) / (1000 * 60 * 60 * 24))
          const ProfitPerNight = Number(bookings.totalPrice) / Number(amountOfNights)
          for (let i = 0; i < 31; i++) {
            if (datesBetween.getFullYear() === last30DaysArray[i].getFullYear() && datesBetween.getMonth() === last30DaysArray[i].getMonth() && datesBetween.getDate() === last30DaysArray[i].getDate()) {
              priceArray[i] += ProfitPerNight
              setProfitArray(priceArray)
            }
          }
          datesBetween = new Date(datesBetween.setDate(datesBetween.getDate() + 1))
        }
      }
      return null;
    });
  }
  React.useEffect(() => {
    if (props.token) {
      fetchBookings()
    }
  }, []);

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();
    setViewBookingsList(data.bookings);
  }

  const handleOpen = () => {
    setOpen(true)
    bookingProfitCalcEachDay()
  };

  const returnGraph = () => {
    const reverseProfitsArray = [].concat(profitArray).reverse()
    const datas = {
      labels: [...Array(31).keys()],
      datasets: [{
        label: 'Profit Per Day Ago',
        data: reverseProfitsArray,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }],
    };

    return (
      <Line data={datas}/>
    )
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '32em',
    width: '20em',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
  }

  return (
    <>
      <div>
      <BigButton onClick={handleOpen}>View profits</BigButton>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <h1>Profits of <i>{props.title}</i></h1>
          {returnGraph()}
          <h6><i>*Income per day calculated as the sum of earnings (total stay price/length of stay) of all accepted bookings in the last 30 days</i></h6>
          <BigButton onClick={() => setOpen(false)}>Close</BigButton>
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default ProfitsModal;

ProfitsModal.propTypes = {
  title: PropTypes.string,
  token: PropTypes.string,
  listingId: PropTypes.number
}
