import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import BigButton from '../components/BigButton';
import StarRating from '../components/StarRating';

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
  overflow: 'auto',
};

const AdvancedReviewModal = (props) => {
  const returnReviews = () => {
    return (
      props.reviews.map((review, idx) => {
        if (props.ratingModalStar === review.starRating) {
          const newKey = Math.floor(Math.random() * 99999) + idx
          return (
            <div key={newKey}>
              <StarRating averageRating={props.ratingModalStar}></StarRating>
              <br />
              <></>
              {(review.reviewText === '') ? <> No comment(s) </> : <> {review.reviewText} </>}
              <hr />
            </div>
          )
        }
        return null
      }
      )
    )
  }

  return (
    <span>
      <Modal
        open={props.ratingModal}
        onClose={() => props.handleRatingModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'auto' }}
      >
        <Box sx={style}>
          <h3>All {props.ratingModalStar} star reviews for listing <i>{props.title}</i></h3>
          <hr />
          {returnReviews()}
          <br />
          <br />
          <br />
          <BigButton onClick={() => props.handleRatingModal(false)}>Close</BigButton>
        </Box>
      </Modal>
    </span>
  );
}
export default AdvancedReviewModal;

AdvancedReviewModal.propTypes = {
  ratingModal: PropTypes.bool,
  handleRatingModal: PropTypes.func,
  title: PropTypes.string,
  ratingModalStar: PropTypes.number,
  reviews: PropTypes.array
};
