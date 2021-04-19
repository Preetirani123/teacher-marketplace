import { Container, Typography } from '@material-ui/core'
import React from 'react';
import './TopContent.scss';
import { Link } from "react-router-dom";


export default function TopContent(props) {
  return (
    <>
      <Container maxWidth="md"  className="topcontent">
      <div style = {{zIndex : 1000}}>
      {props.results.map((res, i) => 
                <article key = {i}>
                  <Link to = {`/${res.id}`} key = {i}>
                    {res.name}
                  </Link>
                </article>
      )}
      </div>

      <Typography variant="h4" align="center" color="textPrimary"  gutterBottom>
      <ul className="c-rainbow">
      <li className="c-rainbow__layer c-rainbow__layer--blue"> Teacher Pay Teachers</li>
      </ul>
       
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph style={{fontFamily: 'Rajdhani'}}>
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts 
     
      </Typography>

      </Container>
      
    </>
  )
}
