import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
let arr = require('../js/celebrities.json');

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
  ))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function One() {
  const [expanded, setExpanded] = useState( 'Aidan' );
  const [arrToMap, setArrToMap] = useState( [] );
  const [editId, seteditId] = useState( null );

  useEffect( () => {
    setArrToMap( arr );
  }, [] );

  const handleChange = ( panel ) => ( e, newExpanded ) => {
    if( editId === null ) {
      setExpanded( newExpanded ? panel : false );
    }
    else {
      setExpanded( panel );
    }
  }

  const handleSelect = ( e, value ) => {
    if( value ) {
      setArrToMap( arr.filter( x => x.first == value.first ) );
    } else {
      setArrToMap( arr );
      setExpanded( 'Aidan' )
    }
  }

  const handleInputsChange = ( e, id ) => {
    const name = e.target.name;
    const value = e.target.value;  
    if( name === 'first' ) {
      const updatedData = arrToMap.map( (x) => x.id === id ? { ...x, first: value || '' } : x );
      setArrToMap( updatedData );
    }
    if( name === 'last' ) {
      const updatedData = arrToMap.map( (x) => x.id === id ? { ...x, last: value || '' } : x );
      setArrToMap( updatedData );
    }
    if( name === 'dob' ) {
      const nDob = new Date( arr.filter( x => x.id == id ).dob ).setFullYear( new Date().getFullYear() - value );
      let s = new Date( nDob );
      const updatedData = arrToMap.map( x => x.id == id ? { ...x, dob: `${s.getFullYear() + '-' + ( s.getMonth() + 1 ) + '-' + s.getDate()}` } : x );      
      setArrToMap( updatedData );
    } 
    if( name === 'country' ) {
      const updatedData = arrToMap.map( x => x.id == id ? { ...x, country: value } : x );
      setArrToMap( updatedData );
    }
    if( name === 'gender' ) {
      const updatedData = arrToMap.map( x => x.id == id ? { ...x, gender: value } : x );
      setArrToMap( updatedData );
    }
    if( name === 'description' ) {
      const updatedData = arrToMap.map( x => x.id == id ? { ...x, description: value } : x );
      setArrToMap( updatedData );
    }
  }

  const deleteFunc = index => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'want to delete this record !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedArr = arrToMap.filter( (currentVal, x)  => x !== index );
        setArrToMap( updatedArr );
        Swal.fire('Deleted!', 'The entry has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'The entry is safe :)', 'error');
      }
    });
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '40%' }}>
        <Autocomplete
          style={{ marginBottom: '1rem' }}
          disablePortal
          options={arrToMap}
          getOptionLabel={(option) => `${option.first} ${option.last}`} 
          renderInput={(params) => <TextField {...params} label="Search User" />}
          onChange={ handleSelect }
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        {
          arrToMap.map( (x, index) => (
            <Accordion key={ x.id } 
              expanded={expanded === x.first || editId === x.id} 
              onChange={handleChange( x.first )}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ alignItems: 'center' }}>
                <img src={ x.picture } alt={ x.first } style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                {
                  editId == x.id ? (
                    <>
                      <TextField id="outlined-basic" variant="outlined" 
                        label='first name'
                        name='first'
                        style={{ marginLeft: '1rem', width: '100%' }}
                        value={ x.first }
                        onChange={ e => handleInputsChange( e, x.id ) }
                      />
                      <TextField id="outlined-basic" variant="outlined" 
                        label='last name'
                        name='last'
                        style={{ marginLeft: '1rem', width: '100%' }}
                        value={ x.last }
                        onChange={ e => handleInputsChange( e, x.id ) }
                      />
                    </>
                  ) : (
                    <Typography style={{ lineHeight: 'normal', marginLeft: '1rem', display: 'flex', alignItems: 'center' }}> { `${x.first} ${x.last}` } </Typography>
                  )
                }
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, padding: '0 2px' }}>
                    <Typography> Age </Typography>
                    {
                      editId == x.id ? (
                        <TextField id="outlined-basic" variant="outlined" 
                          name='dob'
                          value={ `${new Date().getFullYear() - new Date( x.dob ).getFullYear()}`}
                          onChange={ e => handleInputsChange( e, x.id ) }
                        />
                      ) : (
                        <Typography> {`${new Date().getFullYear() - new Date( x.dob ).getFullYear()} Years`} </Typography>
                      )
                    }
                  </div>
                  <div style={{ flex: 1, padding: '0 2px' }}>
                    <Typography> Gender </Typography>
                    {
                      editId == x.id ? (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ x.gender }
                          style={{ width: '100%' }}
                          name='gender'
                          onChange={ e => handleInputsChange( e, x.id ) }
                        >
                          <MenuItem value=''>Select Gender</MenuItem>
                          <MenuItem value='male'>Male</MenuItem>
                          <MenuItem value='female'>Female</MenuItem>
                        </Select>
                      ) : (
                        <Typography style={{ textTransform: 'capitalize' }}> { x.gender } </Typography>
                      )
                    }
                  </div>
                  <div style={{ flex: 1, padding: '0 2px' }}>
                    <Typography> Country </Typography>
                    {
                      editId == x.id ? (
                        <TextField id="outlined-basic" variant="outlined" 
                          name='country'
                          value={ x.country }
                          onChange={ e => handleInputsChange( e, x.id ) }
                        />
                      ) : (
                        <Typography> {x.country} </Typography>
                      )
                    }
                  </div>
                </div>
                <div style={{ padding: '1rem 2px' }}>
                  {
                    editId == x.id ? (
                      <TextField
                        variant="outlined"
                        multiline
                        name='description'
                        value={ x.description }
                        onChange={ e => handleInputsChange( e, x.id ) }
                        minRows={5} 
                        fullWidth
                      />
                    ) : (
                      <>
                        <Typography> Description </Typography>
                        <Typography style={{ textAlign: 'justify' }}>
                          { x.description }
                        </Typography>
                      </>
                    )
                  }
                </div>
                {
                  editId == x.id ? (
                    <>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                        <CloseIcon style={{ color: 'red', margin: '0 10px', cursor: 'pointer' }} onClick={ () => seteditId( null ) } />
                        <CheckIcon style={{ color: 'green', margin: '0 10px', cursor: 'pointer' }} onClick={ () => seteditId( null ) } /> 
                      </div>
                    </>
                  ) : (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                      <DeleteIcon onClick={ () => deleteFunc( index ) } style={{ color: 'red', margin: '0 10px', cursor: 'pointer' }} />
                      <EditIcon style={{ color: '#1976d2', margin: '0 10px', cursor: 'pointer' }} onClick={ () => seteditId( x.id ) } />  
                    </div>
                  )
                }
              </AccordionDetails>
            </Accordion>
            ) 
          )
        }
      </div>
    </div>
  );
}