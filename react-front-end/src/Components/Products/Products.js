import React, { useState, useEffect } from "react";
import { CardMedia, Icon, Table, TextField, Select, MenuItem, FormControl, TableBody, TableCell, TableContainer, InputBase, TableHead, TableRow, Paper, Button, IconButton } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadFile } from 'react-s3';
//require('dotenv').config();



const S3_BUCKET ='admin-teachers-marketplace';
const REGION ='us-west-2';
const {S3_ACCESS_KEY, S3_SECRET_KEY, REACT_APP_APIKEY} = process.env
console.log(S3_ACCESS_KEY)
console.log(S3_SECRET_KEY)
console.log(REACT_APP_APIKEY)

const config = {
    bucketName: S3_BUCKET,
    dirName: 'photos',
    region: REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
}

export default function Products(props) {
  const history = useHistory();
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
      uploadFile(file, config)
          .then(data => console.log(data))
          .catch(err => console.error(err))
  }

 
  
  
  return (
    <div>
      <Nav count = {props.count} setEm = {props.setEm} />

      

      <input type="file" onChange={handleFileInput}/>
      Hell well
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
          

      
      
    </div>
  )
}
