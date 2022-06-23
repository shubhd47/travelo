import styles from "./form.module.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";

const DESTINATIONS = ["India", "Africa", "Europe"];

function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    destination: "",
    travelerCount: 0,
  });

  const checkButtonValidity = ()=>{
    const isEmpty = Object.values(formData).every(value => value);
    return isEmpty?false:true
  }

  const router = useRouter()
  const onInputFill =(type, value)=>{
      console.log(type, value)
      setFormData({
          ...formData,
            [type]:value
      })
  }

  const onSubmit = ()=>{
    let count = parseInt(formData['travelerCount']);
    const requestBody= {
        ...formData,
        travelerCount:count!=NaN?count:0
    }
    console.log('requestBody',requestBody)
    axios.post("http://localhost:4000/api/newTravel",requestBody)
    .then(response=>{
        console.log(response) 
        let data = response['data']['result']
        let travelId = data['_id']    
        router.push({
            pathname: '/submit',
            query: { id: travelId }
        })  
    }).catch(error=>{
        throw new Error('Api error occured')
    })
  }

  return (
    <div className={styles.container}>
    <h4>Please enter the Details and click submit</h4>
      <div className={styles.formWrapper}>
        <TextField
          value={formData["name"]}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          className={styles.textField}
          onChange={(e)=>onInputFill('name',e.target.value)}
        />
        <TextField
          value={formData["address"]}
          id="outlined-basic"
          label="Address"
          variant="outlined"
          className={styles.textField}
          onChange={(e)=>onInputFill('address',e.target.value)}
        />
        <FormControl className={styles.textField} fullWidth>
          <InputLabel id="demo-simple-select-label">Destination</InputLabel>
          <Select
            value={formData["destination"]}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Destination"
            onChange={(e)=>onInputFill('destination',e.target.value)}
          >
            {DESTINATIONS.map((destination,i) => (
              <MenuItem key={i} value={destination}>{destination}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
        className={styles.textField}
          value={formData["travelerCount"]}
          id="outlined-basic"
          label="No. of Traveler"
          variant="outlined"
          onChange={(e)=>onInputFill('travelerCount',e.target.value)}
        />
        <Button disabled={checkButtonValidity()} onClick={onSubmit} variant="contained">Submit</Button>
      </div>
    </div>
  );
}

export default FormComponent;
