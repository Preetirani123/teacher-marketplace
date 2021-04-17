import React, { useState, useEffect } from "react";
import { CardMedia, Icon, Table, TextField, Select, MenuItem, FormControl, TableBody, TableCell, TableContainer, InputBase, TableHead, TableRow, Paper, Button, IconButton } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadFile } from 'react-s3';


const {REACT_APP_S_ACCESS_KEY, REACT_APP_S_SECRET_KEY} = process.env

const S3_BUCKET ='admin-teachers-marketplace';
const REGION ='us-west-2';

const config = {
    bucketName: S3_BUCKET,
    dirName: 'photos/t',
    region: REGION,
    accessKeyId: REACT_APP_S_ACCESS_KEY,
    secretAccessKey: REACT_APP_S_SECRET_KEY
}
//put onchange handlers on each input of each product. when one onchange is called, enable the update button for that row.
//on click update, the whole product must get updated
export default function Products(props) {
  const history = useHistory();
  const classes = useStyles();
  const [newProd, setNewProd] = useState({
    img: '',
    name: '',
    price: 0,
    desc: '',
    cat: '',
    level: '',
    prov: '',
    subj: ''
  })
  

  function handleUpload (e) {
      
          // if (newProd.img !== '') {
          //   deleteFile(decodeURI(newProd.img), config)
          //   .then(data => {     
          //     console.log(data);
          //     setNewProd((prev) => {return { ...prev, img: encodeURI(data.location) }})
          //   })
          //   .catch(err => console.error(err))
          // }

          uploadFile(e.target.files[0], config)
          .then(data => {    
            console.log(data);
            setNewProd((prev) => {return { ...prev, img: encodeURI(data.location) }})
          })
          .catch(err => console.error(err))
      
  }

  function insProd () {
    console.log("jaja")
    
  }

 
  return (
    <div>
      <Nav count = {props.count} setEm = {props.setEm} />

      <input type="file" accept = "image/*" onChange={handleUpload} />

      <TableContainer key = {Math.random()} component={Paper} className={classes.cartContainer} style={{boxshadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'}} >
              
                <Table key = {Math.random()} className={classes.table} aria-label="simple table" >
                  <TableHead color="primary">
                    <TableRow className={classes.tableHead} >
                      <TableCell color="right">Image</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Level</TableCell>
                      <TableCell align="right">Province</TableCell>
                      <TableCell align="right">Subject</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  {0 === 0 ?
                  <TableBody>
                    
                        <TableRow>
                            <TableCell>
                            
                              <input accept="image/*" onChange={handleUpload}
                              className={classes.input} id="icon-button-file" type="file" />
                              <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                  <PhotoCamera />
                                </IconButton>
                              </label>
                              <CardMedia className={classes.CardMedia} component="img" image={newProd.img}  title= "ii" />

                            </TableCell>
                            <TableCell>
                               
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell colSpan = {2}>
                              <Button onClick = {() => insProd()} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                                 Create
                              </Button>
                               
                            </TableCell>
                            
                        </TableRow>
                    
                  </TableBody>    
                  :
                  <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                  </TableBody>
                  }
                </Table>
              
      </TableContainer>
    </div>
  )
}
