import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import 'date-fns';

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import BigButton from './BigButton';

const DashBoardSearchCard = (props) => {
  const
    {
      searchString,
      setSearchString,
      searchWithFilters,
      bedroomRange,
      setBedroomRange,
      maxBedrooms,
      priceRange,
      setPriceRange,
      maxPrice,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      setIsDateSearch,
      isDateSearch,
      setListingsFiltered,
      listingsFiltered,
    } = props;
  const reviewListingInfo = () => {
    const copy = [...listingsFiltered];
    const listingWithAverage = []
    for (const listing of copy) {
      let reviewsTotal = 0;
      for (const review of listing.reviews) {
        reviewsTotal += review.starRating;
      }
      let reviewsAverage = 0;
      if (listing.reviews.length !== 0) {
        reviewsAverage = reviewsTotal / listing.reviews.length;
      }
      listingWithAverage.push({ averageReviews: reviewsAverage, listingData: listing })
    }
    return listingWithAverage;
  }
  const searchHighestToLowest = () => {
    const listingWithAverage = reviewListingInfo();
    const highestToLowest = listingWithAverage.sort((listingA, listingB) => listingB.averageReviews - listingA.averageReviews);

    const listingsCopy = [...listingsFiltered];
    const correctOrder = []
    for (let i = 0; i < highestToLowest.length; i++) {
      for (const listing of listingsCopy) {
        if (Number(highestToLowest[i].listingData.id) === Number(listing.id)) {
          correctOrder.push(listing);
        }
      }
    }
    setListingsFiltered(correctOrder);
  }
  const searchLowestToHighest = () => {
    const listingWithAverage = reviewListingInfo();
    const lowestToHighest = listingWithAverage.sort((listingA, listingB) => listingA.averageReviews - listingB.averageReviews);

    const listingsCopy = [...listingsFiltered];
    const correctOrder = []
    for (let i = 0; i < lowestToHighest.length; i++) {
      for (const listing of listingsCopy) {
        if (Number(lowestToHighest[i].listingData.id) === Number(listing.id)) {
          correctOrder.push(listing);
        }
      }
    }
    setListingsFiltered(correctOrder);
  }
  return (
    <div>
      <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: 30 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Title Or City location"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <IconButton type="button" onClick={searchWithFilters} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <br />
        </Paper>
        <br />
        Bedrooms:
        <Box sx={{ width: 300, paddingLeft: 5, paddingTop: 5 }}>
            <Slider
              value={bedroomRange}
              onChange={(e) => setBedroomRange(e.target.value)}
              valueLabelDisplay='on'
              min={0}
              max={maxBedrooms}
              marks={[
                {
                  value: 0,
                  label: 0,
                },
                {
                  value: Math.floor(maxBedrooms / 2),
                  label: Math.floor(maxBedrooms / 2),
                },
                {
                  value: maxBedrooms,
                  label: maxBedrooms,
                },
              ]}
            />
        </Box>
        Price:
        <Box sx={{ width: 300, paddingLeft: 5, paddingTop: 5 }}>
            <Slider
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              valueLabelDisplay='on'
              min={0}
              max={maxPrice}
              marks={[
                {
                  value: 0,
                  label: 0,
                },
                {
                  value: Math.floor(maxPrice / 2),
                  label: Math.floor(maxPrice / 2),
                },
                {
                  value: maxPrice,
                  label: maxPrice,
                },
              ]}
            />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        { isDateSearch
          ? <Stack spacing={3} sx={{ width: 300, paddingLeft: 5, paddingTop: 5 }}>
              <DesktopDatePicker
                disablePast
                inputFormat="DD/MM/YYYY"
                label="Start Date"
                value={startDate}
                minDate={dayjs('2022-01-01')}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                disablePast
                inputFormat="DD/MM/YYYY"
                label="End Date"
                value={endDate}
                minDate={dayjs('2022-01-01')}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          : false
        }
        < br />
        <BigButton onClick={() => setIsDateSearch(!isDateSearch)}>Search With Date Range</BigButton> <br /><br />
        <BigButton onClick={() => searchHighestToLowest()}> Search Reviews High To Low </BigButton>
        <BigButton onClick={() => searchLowestToHighest()}> Search Reviews Low To High </BigButton>
      </LocalizationProvider>
    </div>
  );
}

DashBoardSearchCard.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func,
  searchWithFilters: PropTypes.func,
  bedroomRange: PropTypes.array,
  setBedroomRange: PropTypes.func,
  maxBedrooms: PropTypes.number,
  priceRange: PropTypes.array,
  setPriceRange: PropTypes.func,
  maxPrice: PropTypes.number,
  startDate: PropTypes.object,
  setStartDate: PropTypes.func,
  endDate: PropTypes.object,
  setEndDate: PropTypes.func,
  setIsDateSearch: PropTypes.func,
  isDateSearch: PropTypes.bool,
  setListingsFiltered: PropTypes.func,
  listingsFiltered: PropTypes.array,
};
export default DashBoardSearchCard;
