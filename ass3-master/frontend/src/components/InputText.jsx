import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const InputText = (props) => {
  const style = {
    width: '260px'
  }
  if (props.value !== undefined) {
    const change = (e) => {
      props.setState(e.target.value)
      setDefaultValue(e.target.value)
    }
    React.useEffect(() => {
      props.setState(props.value)
    }, []);
    const [defaultValue, setDefaultValue] = React.useState(props.value)
    if (props.required === false) {
      return (
        <>
          <TextField id={props.id} sx={style} value={defaultValue} InputProps={{ inputProps: { min: 0 } }} label={props.lableTitle} variant="outlined" type={props.inputType} onChange={change}/><br />
        </>
      );
    }
    return (
      <>
        <TextField id={props.id} sx={style} required value={defaultValue} InputProps={{ inputProps: { min: 0 } }} label={props.lableTitle} variant="outlined" type={props.inputType} onChange={change}/><br />
      </>
    );
  }

  if (props.required === false) {
    return (
      <>
        <TextField id={props.id} sx={style} InputProps={{ inputProps: { min: 0 } }} label={props.lableTitle} variant="outlined" type={props.inputType} onChange={(e) => { props.setState(e.target.value) }}/><br />
      </>
    );
  }
  return (
    <>
      <TextField id={props.id} sx={style} required InputProps={{ inputProps: { min: 0 } }} label={props.lableTitle} variant="outlined" type={props.inputType} onChange={(e) => { props.setState(e.target.value) }}/><br />
    </>
  );
};

export default InputText;

InputText.propTypes = {
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  lableTitle: PropTypes.string,
  setState: PropTypes.func,
  inputType: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  required: PropTypes.bool,
  id: PropTypes.string,
};
