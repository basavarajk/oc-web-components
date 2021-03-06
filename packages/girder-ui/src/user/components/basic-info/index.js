import React, { useState } from 'react';
import {
  withStyles, Button, TextField, Link, Typography, InputAdornment
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'

const styles = () => ({
  root: {
  },
  form: {
    padding: '5px'
  },
  textField: {
    marginTop: '8px'
  },
  buttonContainer: {
    display:'flex',
    justifyContent:'flex-end'
  },
  button: {
    backgroundColor:'#37474F',
    color: 'white'
  },
});

const BasicInfoForm = props => {
  const {userInfo, onSubmit, mediaIds, classes} = props
  const [formValues, setValues] = useState({
    firstName:userInfo.firstName,
    lastName:userInfo.lastName,
    email:userInfo.email,
    twitterId:mediaIds.twitterId,
    orcidId:mediaIds.orcidId
  });

  const updateFields = e => {
    if (e.target.name=='orcidId'
        && e.nativeEvent.inputType != 'deleteContentBackward') {
      if (orcidId.value.length == 4) {
        orcidId.value = orcidId.value+'-'
      } else if (orcidId.value.length == 9) {
        orcidId.value = orcidId.value+'-'
      } else if (orcidId.value.length == 14) {
        orcidId.value = orcidId.value+'-'
      }
    }
    setValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    for (var key in formValues) {
      if (formValues['orcidId'] && formValues['orcidId'].length < 19) {
        formValues['orcidId'] = mediaIds['orcidId']
      }

      if (!formValues[key]) {
        if (key == 'twitterId' || key == 'orcidId') {
          if (formValues[key] == undefined) {
            formValues[key] = mediaIds[key] ? mediaIds[key] : '';
          }
        } else {
          formValues[key] = userInfo[key];
        }
      }
    }

    onSubmit(userInfo._id, formValues);
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <TextField
            className={classes.textField}
            name='firstName'
            helperText='First Name'
            value={
              formValues.firstName == undefined
              ? userInfo.firstName
              : formValues.firstName}
            fullWidth
            onChange={updateFields}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            name='lastName'
            helperText='Last Name'
            value={
              formValues.lastName == undefined
              ? userInfo.lastName
              : formValues.lastName}
            fullWidth
            onChange={updateFields}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            name='email'
            helperText='Email Address'
            value={
              formValues.email == undefined
              ? userInfo.email
              : formValues.email}
            fullWidth
            onChange={updateFields}
          />
        </div>
        <div>
          <TextField
            inputProps={{maxLength:15}}
            className={classes.textField}
            name='twitterId'
            helperText='Twitter Handle'
            placeholder='No Associated Handle'
            value={
              formValues.twitterId != undefined
              ? formValues.twitterId
              : mediaIds.twitterId != 'undefined'
                ? mediaIds.twitterId : ''}
            InputProps={{
              startAdornment:
              <InputAdornment position='start'>
                {mediaIds.twitterId != undefined
                ? <Link
                    href={'http://www.twitter.com/'+mediaIds.twitterId}
                    target='_blank'
                  >
                    <OpenInNewIcon/>
                  </Link>
                : null }
              </InputAdornment>}}
            fullWidth
            onChange={updateFields}
          />
        </div>
        <div>
          <TextField
            inputProps={{maxLength:19}}
            className={classes.textField}
            name='orcidId'
            id='orcidId'
            error={formValues.orcidId && formValues.orcidId.length < 19}
            helperText={
              formValues.orcidId && formValues.orcidId.length < 19
              ? 'ID must be 16 characters long'
              : 'Orcid ID'
            }
            placeholder='No Associated Handle'
            value={
              formValues.orcidId != undefined
              ? formValues.orcidId
              : mediaIds.orcidId != 'undefined'
                ? mediaIds.orcidId : ''}
            InputProps={{
              startAdornment:
              <InputAdornment position='start'>
                {mediaIds.orcidId != undefined
                ? <Link
                    href={'http://www.orcid.com/'+mediaIds.orcidId}
                    target='_blank'
                  >
                    <OpenInNewIcon color={mediaIds.orcidId ? 'primary' : 'disabled'}/>
                  </Link>
                : null }
              </InputAdornment>}}
            fullWidth
            onChange={updateFields}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button className={classes.button} type='submit' variant='contained'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withStyles(styles)(BasicInfoForm);
