import { Container, Typography } from '@material-ui/core'
import React from 'react';
import './TopContent.scss';


export default function TopContent() {
  return (
    <>
      <Container maxWidth="md"  className="topcontent">
      <Typography variant="h4" align="center" color="textPrimary"  gutterBottom>
        Teacher Pay Teachers
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph style={{fontFamily: 'Rajdhani'}}>
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts 
     
      </Typography>

      </Container>
      
    </>
  )
}
