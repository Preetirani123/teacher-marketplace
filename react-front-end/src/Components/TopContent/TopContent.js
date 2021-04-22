import { Container, Typography } from '@material-ui/core'
import React from 'react';
import './TopContent.scss';
import { Link } from "react-router-dom";


export default function TopContent(props) {
  return (
    <>
      <Container maxWidth="md"  className="topcontent">
      
      
      <Typography variant="h4" align="center" color="textPrimary"  gutterBottom>
      <ul className="c-rainbow">
        <li className="c-rainbow__layer c-rainbow__layer--blue">Teach To Their Own</li>
      </ul>
       
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph style={{fontFamily: 'Rajdhani'}}>
      The educational resource marketplace for teachers by teachers.
      </Typography>

      </Container>
      
    </>
  )
}
