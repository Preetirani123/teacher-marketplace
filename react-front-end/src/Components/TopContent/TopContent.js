import { Container, Typography } from '@material-ui/core'
import React from 'react'

export default function TopContent() {
  return (
    <div>
      <Container maxWidth="md" style={{marginTop: '40px'}}>
      <Typography variant="h4" align="center" color="textPrimary"  gutterBottom>
        Teacher Pay Teachers
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts 
     
      </Typography>

      </Container>
      
    </div>
  )
}
