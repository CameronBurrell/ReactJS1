import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../components/StarRating';
import AdvancedReviewModal from '../components/AdvancedReviewModal';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ReviewHover = (props) => {
  const [open, setOpen] = React.useState(false);
  const [ratingArray, setRatingArray] = React.useState([]);
  const [ratingModal, setRatingModal] = React.useState(false);
  const [ratingModalStar, setRatingModalStar] = React.useState(0);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  };

  const style = {
    position: 'absolute',
    height: '12em',
    width: '15.5em',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: '10px 20px 30px',
    p: 4,
    overflow: 'auto',
    marginTop: '-110px'
  }

  const showRating = (reviewsArray) => {
    let rating = 0;
    for (let i = 0; i < reviewsArray.length; i++) {
      rating += reviewsArray[i].starRating
    }
    if (reviewsArray.length === 0) {
      return 0;
    }
    const average = rating / reviewsArray.length;
    return average;
  }
  const averageRating = showRating(props.reviews)

  const LinearProgressBarStyle = {
    paddingTop: '5px',
    width: '60%',
    display: 'inline-block',
    borderRadius: 5
  }
  React.useEffect(() => {
    percentageReviewArray()
  }, []);

  const percentageReviewArray = () => {
    const percentageArray = [...Array(6).fill(0)]
    for (let i = 0; i < props.reviews.length; i++) {
      percentageArray[props.reviews[i].starRating] += 1
    }
    for (let i = 0; i < percentageArray.length; i++) {
      if (percentageArray[i] !== 0) {
        percentageArray[i] /= props.reviews.length
        percentageArray[i] *= 100
      }
    }
    setRatingArray(percentageArray)
  }

  return (
    <div style={{ backgroundColor: '#E67E22', width: '120px', borderRadius: '8px' }} onMouseEnter={handleOpen}>
      <StarRating averageRating={averageRating}/>
      {open && <Box id='box' sx={style} onMouseEnter={handleOpen} onMouseLeave={handleClose} >
      <StarRating style={{ display: 'inline-block' }} averageRating={averageRating}/>
      <span style={{ position: 'relative', top: '-5px' }}><b>&nbsp;{String(averageRating).slice(0, 3)} out of 5</b></span>
      <br />
      <span style={{ color: 'grey' }}>{props.reviews.length} total ratings</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(5) }}>5 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[5]} variant={'determinate'}></LinearProgress> {String(ratingArray[5]).split('.')[0]}%</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(4) }}>4 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[4]} variant={'determinate'}></LinearProgress> {String(ratingArray[4]).split('.')[0]}%</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(3) }}>3 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[3]} variant={'determinate'}></LinearProgress> {String(ratingArray[3]).split('.')[0]}%</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(2) }}>2 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[2]} variant={'determinate'}></LinearProgress> {String(ratingArray[2]).split('.')[0]}%</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(1) }}>1 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[1]} variant={'determinate'}></LinearProgress> {String(ratingArray[1]).split('.')[0]}%</span>
      <br />
      <span style={{ cursor: 'pointer' }} onClick={() => { setRatingModal(true); setRatingModalStar(0) }}>0 star <LinearProgress style={LinearProgressBarStyle} value={ratingArray[0]} variant={'determinate'}></LinearProgress> {String(ratingArray[0]).split('.')[0]}%</span>
      <AdvancedReviewModal reviews={props.reviews} ratingModal={ratingModal} handleRatingModal={setRatingModal} title={props.title} ratingModalStar={ratingModalStar}></AdvancedReviewModal>
      </Box>}
    </div>
  )
}

export default ReviewHover

ReviewHover.propTypes = {
  reviews: PropTypes.array,
  title: PropTypes.string
}
