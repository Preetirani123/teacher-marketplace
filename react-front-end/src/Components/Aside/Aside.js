import React, { useState, useEffect } from 'react';
import { CardMedia, Icon, Table, TextField, Select, MenuItem, InputLabel, FormControl, TableBody, TableCell, TableContainer, InputBase, TableHead, TableRow, Paper, Button, IconButton } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";


export default function Aside(props) {
  const [fixed, setFixed] = useState({
    cats: [],
    provs: [],
    subjs: [],
    levels: []
  })

  useEffect(() => {
    
    

     axios.get('/fixed/cats')
     .then(resp => {
       console.log(resp.data)
       setFixed((prev) => {return { ...prev, cats: resp.data }})
       
     })
     .catch(e => console.log(e))

     axios.get('/fixed/subs')
     .then(resp => {
       setFixed((prev) => {return { ...prev, subjs: resp.data }}) 
     })
     .catch(e => console.log(e))

     axios.get('/fixed/levels')
     .then(resp => {
       setFixed((prev) => {return { ...prev, levels:  resp.data }}) 
     })
     .catch(e => console.log(e))

     axios.get('/fixed/provs')
     .then(resp => {
       setFixed((prev) => {return { ...prev, provs:  resp.data }}) 
     })
     .catch(e => console.log(e))
  }, [])

  const classes = useStyles()
  return (
       <section className = {classes.filter}>
               <div>
                                <InputLabel id="demo-simple-select-filled-label1">Price</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label1"
                                  id="demo-simple-select-filled1"
                                  value={props.ordP}
                                  onChange={(e) => props.setOrdP(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="1">
                                    Upto $50
                                  </MenuItem>
                                  <MenuItem value="2">
                                    $50-$100
                                  </MenuItem>
                                  <MenuItem value="3">
                                    $100-$150
                                  </MenuItem>
                                  <MenuItem value="4">
                                    $150 and beyond
                                  </MenuItem>
                          
                                </Select>
               </div>

               <div>
                                <InputLabel id="demo-simple-select-filled-label2">Category</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label2"
                                  id="demo-simple-select-filled2"
                                  value={props.ocat}
                                  onChange={(e) => props.setOcat(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.cats.map((cat, index) => (
                                    <MenuItem key = {index} value={cat.id}>{cat.name}</MenuItem>
                                  ))} 
                                </Select>
               </div>

               <div>
                                <InputLabel id="demo-simple-select-filled-label3">Province</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label3"
                                  id="demo-simple-select-filled3"
                                  value={props.oprov}
                                  onChange={(e) => props.setOprov(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.provs.map((prov, index) => (
                                    <MenuItem key = {index} value={prov.id}>{prov.name}</MenuItem>
                                  ))} 
                                </Select>
               </div>

               <div>
                                <InputLabel id="demo-simple-select-filled-label3">Level</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label3"
                                  id="demo-simple-select-filled3"
                                  value={props.olev}
                                  onChange={(e) => props.setOlev(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.levels.map((level, index) => (
                                    <MenuItem key = {index} value={level.id}>{level.name}</MenuItem>
                                  ))} 
                                </Select>
               </div>

               <div>
                                <InputLabel id="demo-simple-select-filled-label4">Subject</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label4"
                                  id="demo-simple-select-filled4"
                                  value={props.osub}
                                  onChange={(e) => props.setOsub(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.subjs.map((subj, index) => (
                                    <MenuItem key = {index} value={subj.id}>{subj.name}</MenuItem>
                                  ))} 
                                </Select>
               </div>


               <div>
                                <InputLabel id="demo-simple-select-filled-label5">Order By</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label5"
                                  id="demo-simple-select-filled5"
                                  value={props.which}
                                  onChange={(e) => props.setWhich(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value="1">
                                    Price
                                  </MenuItem>
                                  <MenuItem value="2">
                                    Name
                                  </MenuItem>
                                  
                          
                                </Select>
               </div>

       </section>        
  )
}
