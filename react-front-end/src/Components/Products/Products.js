import React, { useState, useEffect } from "react";
import { CardMedia, Icon, Table, TextField, Select, MenuItem, InputLabel, FormControl, TableBody, TableCell, TableContainer, InputBase, TableHead, TableRow, Paper, Button, IconButton } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadFile, deleteFile } from 'react-s3';


const {REACT_APP_S_ACCESS_KEY, REACT_APP_S_SECRET_KEY} = process.env

const S3_BUCKET ='admin-teachers-marketplace';
const REGION ='us-west-2';

//put onchange handlers on each input of each product. when one onchange is called, enable the update button for that row.
//on click update, the whole product must get updated
export default function Products(props) {
  const history = useHistory();
  const classes = useStyles();
  console.log("###################")
  console.log(props.u_email)
  console.log(props.u_id)
  const [state, setState] = useState({
    allProds: []
  })
  const [newProd, setNewProd] = useState({
    img: '',
    name: '',
    price: 0,
    desc: '',
    cat: '',
    level: '',
    prov: '',
    subj: '',
  });
  const [fixed, setFixed] = useState({
    cats: [],
    provs: [],
    subjs: [],
    levels: []
  })
  
  function loadAll () {
    axios.get(`/users/products/${props.u_id}`)
    .then((resp) => {  
      setState((prev) => {return { ...prev, allProds: resp.data }})    
    })
    .catch(e => console.log(e))
  }
  

  function handleUpload (e) {
          console.log("jack reacher");
          const config = {
            bucketName: S3_BUCKET,
            dirName: `photos/users/${props.u_id}`,
            region: REGION,
            accessKeyId: REACT_APP_S_ACCESS_KEY,
            secretAccessKey: REACT_APP_S_SECRET_KEY
          }
          uploadFile(e.target.files[0], config)
          .then(data => {    
            console.log(data);
            setNewProd((prev) => {return { ...prev, img: encodeURI(data.location) }})    
          })
          .catch(err => console.error(err))
      
  }
  function handleUploadNew (e) {
    console.log(e.target.files[0])
    const config = {
      bucketName: S3_BUCKET,
      dirName: `photos/users/${props.u_id}`,
      region: REGION,
      accessKeyId: REACT_APP_S_ACCESS_KEY,
      secretAccessKey: REACT_APP_S_SECRET_KEY
    }
    uploadFile(e.target.files[0], config)
    .then(data => {    
      console.log(data);
      setNewProd((prev) => {return { ...prev, img: encodeURI(data.location) }})    
    })
    .catch(err => console.error(err))

  }

  function insProd () {
    
    axios.post('/product', {
        user_id: props.u_id,
        name: newProd.name,
        text_description: newProd.desc,
        categoryID: newProd.cat,
        price: newProd.price,
        thumbnail_url: newProd.img,
        subject_id: newProd.subj,
        grade: newProd.level,
        province: newProd.prov
    })
    .then((resp) => {
      console.log(resp);
      setNewProd({...newProd, desc: '', img: '', price: 0, name: '', cat: '', prov: '', subj: '', level: '' })
      loadAll()

    })
    .catch((e) => {console.log(e)})
  }
  
  useEffect(() => {
    
    loadAll();

    // axios.get(`/users/products/${props.u_id}`)
    // .then((resp) => {  
    //   setState((prev) => {return { ...prev, allProds: resp.data }})    
    // })
    // .catch(e => console.log(e))

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

  
  return (
    <div>

      <Nav count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
                      <TableCell color="right">Image</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Level</TableCell>
                      <TableCell align="right">Subject</TableCell>
                      <TableCell align="right">Province</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {state.allProds.length === 0 ?
                  <TableRow>
                            <TableCell> 
                                  <input accept="image/*" onChange={(e) => handleUpload(e)}
                                  className={classes.input} id="icon-button-file" type="file" />
                                  <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                      <PhotoCamera />
                                    </IconButton>
                                  </label>
                                  {newProd.img !== '' ?
                                  <CardMedia className={classes.CardMedia} component="img" image={newProd.img}  title= "ii" />
                                  :
                                  ''
                                  }
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Name" className={classes.spread} 
                                value={newProd.name}
                                onChange={(e) => {setNewProd({...newProd, name: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Description" className={classes.spread} 
                                value={newProd.desc}
                                onChange={(e) => {setNewProd({...newProd, desc: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Price" className={classes.spread} 
                                value={newProd.price}
                                onChange={(e) => {setNewProd({...newProd, price: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.cat}
                                  onChange={(e) => {setNewProd({...newProd, cat: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.cats.map(cat => (
                                    <MenuItem key = {Math.random()} value={cat.id}>{cat.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Levels</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.level}
                                  onChange={(e) => {setNewProd({...newProd, level: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.levels.map(lev => (
                                    <MenuItem key = {Math.random()} value={lev.id}>{lev.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Subjects</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.subj}
                                  onChange={(e) => {setNewProd({...newProd, subj: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.subjs.map(sub => (
                                    <MenuItem key = {Math.random()} value={sub.id}>{sub.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Provinces</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.prov}
                                  onChange={(e) => {setNewProd({...newProd, prov: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.provs.map(prov => (
                                    <MenuItem key = {Math.random()} value={prov.id}>{prov.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell colSpan = {2}>
                              {/* <form onSubmit = {insProd}> */}
                                <Button onClick={() => insProd()} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                                  Create
                                </Button>  
                              {/* </form> */}
                            </TableCell>         
                  </TableRow>
                  :
                  <>
                  {state.allProds.map((elem) => (
                       <TableRow key = {Math.random()}>
                       <TableCell> 
                             <input accept="image/*" 
                             className={classes.input} id="icon-button-file" type="file" />
                             <label htmlFor="icon-button-file">
                               <IconButton color="primary" aria-label="upload picture" component="span">
                                 <PhotoCamera />
                               </IconButton>
                             </label>
                             {elem.thumbnail_url !== '' ?
                             <CardMedia className={classes.CardMedia} component="img" image={elem.thumbnail_url}  title= "ii" />
                             :
                             'Click above to upload image'
                             }
                       </TableCell>
                       <TableCell>
                           <TextField required id="standard-required"  label="Name" className={classes.spread} 
                           value={elem.name}
                            />
                       </TableCell>
                       <TableCell>
                           <TextField required id="standard-required"  label="Description" className={classes.spread} 
                           value={elem.description}
                            />
                       </TableCell>
                       <TableCell>
                           <TextField required id="standard-required"  label="Price" className={classes.spread} 
                           value={elem.price}
                           />
                       </TableCell>
                       <TableCell>
                           <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                           <Select
                             labelId="demo-simple-select-filled-label"
                             id="demo-simple-select-filled"
                             value={elem.cat_id}
                             defaultValue=""
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             {
                             fixed.cats.map(cat => (
                               <MenuItem key = {Math.random()} value={cat.id}>{cat.name}</MenuItem>
                             ))} 
                           </Select>
                       </TableCell>
                       <TableCell>
                           <InputLabel id="demo-simple-select-filled-label">Levels</InputLabel>
                           <Select
                             labelId="demo-simple-select-filled-label"
                             id="demo-simple-select-filled"
                             value={elem.level_id}
                             defaultValue=""
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.levels.map(lev => (
                               <MenuItem key = {Math.random()} value={lev.id}>{lev.name}</MenuItem>
                             ))} 
                           </Select>
                       </TableCell>
                       <TableCell>
                           <InputLabel id="demo-simple-select-filled-label">Subjects</InputLabel>
                           <Select
                             labelId="demo-simple-select-filled-label"
                             id="demo-simple-select-filled"
                             value={elem.subject_id}
                             defaultValue=""
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.subjs.map(sub => (
                               <MenuItem key = {Math.random()} value={sub.id}>{sub.name}</MenuItem>
                             ))} 
                           </Select>
                       </TableCell>
                       <TableCell>
                           <InputLabel id="demo-simple-select-filled-label">Provinces</InputLabel>
                           <Select
                             labelId="demo-simple-select-filled-label"
                             id="demo-simple-select-filled"
                             value={elem.province_id}
                             defaultValue=""
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.provs.map(prov => (
                               <MenuItem key = {Math.random()} value={prov.id}>{prov.name}</MenuItem>
                             ))} 
                           </Select>
                       </TableCell>
                       <TableCell >
                         
                           <Button  type = "submit" variant="contained" color="primary" className = {classes.spread}>
                             Update
                           </Button>  
                         
                       </TableCell>
                       <TableCell >
                         
                           <Button  type = "submit" variant="contained" color="primary" className = {classes.spread}>
                             Delete
                           </Button>  
                         
                       </TableCell>          
                       </TableRow>
                  ))}
                        

                  <TableRow>
                            <TableCell> 
                                  <input accept="image/*" onChange={handleUploadNew}
                                  className={classes.input} id="icon-button-file2" type="file" />
                                  <label htmlFor="icon-button-file2">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                      <PhotoCamera />
                                    </IconButton>
                                  </label>
                                  {newProd.img !== '' ?
                                  <CardMedia className={classes.CardMedia} component="img" image={newProd.img}  title= "ii" />
                                  :
                                  ''
                                  }
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Name" className={classes.spread} 
                                value={newProd.name}
                                onChange={(e) => {setNewProd({...newProd, name: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Description" className={classes.spread} 
                                value={newProd.desc}
                                onChange={(e) => {setNewProd({...newProd, desc: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <TextField required id="standard-required"  label="Price" className={classes.spread} 
                                value={newProd.price}
                                onChange={(e) => {setNewProd({...newProd, price: e.target.value })}} />
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.cat}
                                  onChange={(e) => {setNewProd({...newProd, cat: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {
                                  fixed.cats.map(cat => (
                                    <MenuItem key = {Math.random()} value={cat.id}>{cat.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Levels</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.level}
                                  onChange={(e) => {setNewProd({...newProd, level: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.levels.map(lev => (
                                    <MenuItem key = {Math.random()} value={lev.id}>{lev.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Subjects</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.subj}
                                  onChange={(e) => {setNewProd({...newProd, subj: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.subjs.map(sub => (
                                    <MenuItem key = {Math.random()} value={sub.id}>{sub.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell>
                                <InputLabel id="demo-simple-select-filled-label">Provinces</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={newProd.prov}
                                  onChange={(e) => {setNewProd({...newProd, prov: e.target.value })}}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  
                                  {fixed.provs.map(prov => (
                                    <MenuItem key = {Math.random()} value={prov.id}>{prov.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell colSpan = {2}>
                              {/* <form onSubmit = {insProd}> */}
                                <Button onClick={() => insProd()} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                                  Create
                                </Button>  
                              {/* </form> */}
                            </TableCell>         
                  </TableRow>

                  
                  </>

                 



                   

                  

                   
                  

        }
        </TableBody>
      </Table>
      </TableContainer>





  
    </div>
  )
}
