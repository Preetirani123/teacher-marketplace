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
    dirName: 'photos',
    region: REGION,
    accessKeyId: REACT_APP_S_ACCESS_KEY,
    secretAccessKey: REACT_APP_S_SECRET_KEY
}

export default function Products(props) {
  const history = useHistory();
  const classes = useStyles();
  

  const handleUpload = async (e) => {
      uploadFile(e.target.files[0], config)
          .then(data => console.log(data))
          .catch(err => console.error(err))
  }

 
  return (
    <div>
      <Nav count = {props.count} setEm = {props.setEm} />

      {/* <input type="file" accept = "image/*" onChange={handleUpload}/> */}
      
      
      
          

      
      
    </div>
  )
}
