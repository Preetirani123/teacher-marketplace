import React, { useState, useEffect } from "react";
import { CardMedia, Icon, Table, TextField, Select, MenuItem, InputLabel, FormControl, TableBody, TableCell, TableContainer, InputBase, TableHead, TableRow, Paper, Button, IconButton } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { uploadFile, deleteFile } from 'react-s3';
import { SettingsInputAntennaOutlined } from "@material-ui/icons";


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

  function prevProds (e) {
    console.log(e.target.files[0])
    let i = e.target.name
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
       
      setState({...state, allProds : [...state.allProds.slice(0,i), 
        {...state.allProds[i], thumbnail_url: encodeURI(data.location)}, ...state.allProds.slice(i+1)]}) 
    })
    .catch(err => console.error(err))

  }

  function elasticInsert (n, d, i) {
    axios.post(`/search/create/${i}`, {
      name: n,
      desc: d
    })
    .then((r) => {
      console.log(r)
    })
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
      elasticInsert(resp.data.name, resp.data.description, resp.data.id)
      setNewProd({...newProd, desc: '', img: '', price: 0, name: '', cat: '', prov: '', subj: '', level: '' })
      loadAll()

    })
    .catch((e) => {console.log(e)})
  }

  function elasticUpdate (n, d, i) {
    axios.post(`/search/update/${i}`, {
      name: n,
      desc: d
    })
    .then((r) => {
      console.log(r)
    })
  }

  function upProd (i, elem_id) {
    axios.put(`/product/${elem_id}`, {
       productID: elem_id,
       name: state.allProds[i].name,
       description: state.allProds[i].description,
       categoryID: state.allProds[i].cat_id,
       price: state.allProds[i].price,
       thumbnail_url: state.allProds[i].thumbnail_url,
       subject_id: state.allProds[i].subject_id,
       grade: state.allProds[i].level_id,
       province: state.allProds[i].province_id
    })
    .then(resp => {
      console.log(resp.data)
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^")
      elasticUpdate(resp.data.name, resp.data.description, resp.data.id)
      loadAll()
    })
    .catch(e => {
      console.log(e)
    })
  }

  function elasticDel (i) {
    axios.post(`/search/delete/${i}`)
    .then((r) => {
      console.log(r)
    })
  }

  function delProd (elem_id) {
    axios.delete(`/product/${elem_id}`)
    .then(resp => {
      console.log(resp)
      console.log(resp.data.id)
      elasticDel(resp.data.id)
      loadAll()
    })
    .catch(e => {
      console.log(e)
    })
  }

  function changeName (e) { 
    let i = Number(e.target.name)
    setState({...state, allProds : [...state.allProds.slice(0,i), 
      {...state.allProds[i], name: e.target.value}, ...state.allProds.slice(i+1)]})
  }
  function changeDesc (e) { 
    let i = Number(e.target.name)
    setState({...state, allProds : [...state.allProds.slice(0,i), 
      {...state.allProds[i], description: e.target.value}, ...state.allProds.slice(i+1)]})
  }
  function changePrice (e) { 
    let i = Number(e.target.name)
    setState({...state, allProds : [...state.allProds.slice(0,i), 
      {...state.allProds[i], price: e.target.value}, ...state.allProds.slice(i+1)]})
  }
  
  useEffect(() => {
    
    loadAll();

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
    <div className={classes.dashboard}>



    <Nav setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
    {( props.results === undefined || props.results.length === 0) 
      ?
      ''
      :
      <div className = {classes.srchBar}>
             {props.results.map((res, i) => {
               return (<article key = {i}>
               <Link to = {`/${res.id}`} key = {i}>
                 {res.name}
               </Link>
             </article>)
             })}
      </div>
      }
      <TableContainer component={Paper} className={classes.dashboardinner}>

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
                                  <input accept="image/*" onChange={handleUpload}
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
                                  fixed.cats.map((cat, index) => (
                                    <MenuItem key = {index} value={cat.id}>{cat.name}</MenuItem>
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
                                  
                                  {fixed.levels.map((lev, index) => (
                                    <MenuItem key = {index} value={lev.id}>{lev.name}</MenuItem>
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
                                  
                                  {fixed.subjs.map((sub, index) => (
                                    <MenuItem key = {index} value={sub.id}>{sub.name}</MenuItem>
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
                                  
                                  {fixed.provs.map((prov, index) => (
                                    <MenuItem key = {index} value={prov.id}>{prov.name}</MenuItem>
                                  ))} 
                                </Select>
                            </TableCell>
                            <TableCell colSpan = {2}>
                              
                                <Button onClick={() => insProd()} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                                  Create
                                </Button>  
                             
                            </TableCell>         
                  </TableRow>
                  
                  :
                  <>
                  {state.allProds.map((elem, i) => (
                       <TableRow key = {i}>
                       <TableCell> 
                             <input accept="image/*" onChange = {prevProds}
                             className={classes.input} id={`icon-button-file-${elem.id}`} name = {`${i}`} type="file" />
                             <label htmlFor={`icon-button-file-${elem.id}`}>
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
                           <TextField required id="standard-required"  name = {`${i}`} label="Name" className={classes.spread} 
                           value={elem.name}
                           onChange={(e) => changeName(e)}
                            />
                       </TableCell>
                       <TableCell>
                           <TextField required id="standard-required"  name = {`${i}`} label="Description" className={classes.spread} 
                           value={elem.description}
                           onChange={(e) => changeDesc(e)}
                            />
                       </TableCell>
                       <TableCell>
                           <TextField required id="standard-required"  name = {`${i}`} label="Price" className={classes.spread} 
                           value={elem.price}
                           onChange={(e) => changePrice(e)}
                           />
                       </TableCell>
                       <TableCell>
                           <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                           <Select
                             labelId="demo-simple-select-filled-label"
                             id="demo-simple-select-filled"
                             value={elem.cat_id}
                             defaultValue=""
                             onChange={(e) => setState({...state, allProds : [...state.allProds.slice(0,i), 
                              {...state.allProds[i], cat_id: e.target.value}, ...state.allProds.slice(i+1)]})}
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             {
                             fixed.cats.map((cat, index) => (
                               <MenuItem key = {index} value={cat.id}>{cat.name}</MenuItem>
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
                             onChange={(e) => setState({...state, allProds : [...state.allProds.slice(0,i), 
                              {...state.allProds[i], level_id: e.target.value}, ...state.allProds.slice(i+1)]})}
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.levels.map((lev, index) => (
                               <MenuItem key = {index} value={lev.id}>{lev.name}</MenuItem>
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
                             onChange={(e) => setState({...state, allProds : [...state.allProds.slice(0,i), 
                              {...state.allProds[i], subject_id: e.target.value}, ...state.allProds.slice(i+1)]})}
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.subjs.map((sub, index) => (
                               <MenuItem key = {index} value={sub.id}>{sub.name}</MenuItem>
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
                             onChange={(e) => setState({...state, allProds : [...state.allProds.slice(0,i), 
                              {...state.allProds[i], province_id: e.target.value}, ...state.allProds.slice(i+1)]})}
                             
                           >
                             <MenuItem value="">
                               <em>None</em>
                             </MenuItem>
                             
                             {fixed.provs.map((prov, index) => (
                               <MenuItem key = {index} value={prov.id}>{prov.name}</MenuItem>
                             ))} 
                           </Select>
                       </TableCell>
                       <TableCell >
                         
                           <Button  onClick={() => upProd(i, elem.id)} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                             Update
                           </Button>  
                         
                       </TableCell>
                       <TableCell >
                         
                           <Button  onClick={() => delProd(elem.id)} type = "submit" variant="contained" color="primary" className = {classes.spread}>
                             Delete
                           </Button>  
                         
                       </TableCell>          
                       </TableRow>
                  ))}
                        

                  <TableRow>
                            <TableCell> 
                                  <input accept="image/*" onChange={handleUpload}
                                  className={classes.input} id="icon-button-file-additional" type="file" />
                                  <label htmlFor="icon-button-file-additional">
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
                                  fixed.cats.map((cat, index) => (
                                    <MenuItem key = {index} value={cat.id}>{cat.name}</MenuItem>
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
                                  
                                  {fixed.levels.map((lev, index) => (
                                    <MenuItem key = {index} value={lev.id}>{lev.name}</MenuItem>
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
                                  
                                  {fixed.subjs.map((sub, index) => (
                                    <MenuItem key = {index} value={sub.id}>{sub.name}</MenuItem>
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
                                  
                                  {fixed.provs.map((prov, index) => (
                                    <MenuItem key = {index} value={prov.id}>{prov.name}</MenuItem>
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
