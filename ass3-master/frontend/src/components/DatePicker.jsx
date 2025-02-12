import React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

export default function ResponsiveDatePickers (props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          minDate={dayjs('2022-01-01')}
          disablePast
          inputFormat="DD/MM/YYYY"
          label={props.titleOfDatePicker}
          openTo="year"
          views={['year', 'month', 'day']}
          value={props.value}
          onChange={(newValue) => {
            props.setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

ResponsiveDatePickers.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  titleOfDatePicker: PropTypes.string,
};
