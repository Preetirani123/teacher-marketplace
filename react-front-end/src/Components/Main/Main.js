import React from 'react'
import ProductContainer from '../ProductContainer/ProductContainer'
import TopContent from '../TopContent/TopContent'
import Aside from '../Aside/Aside'
import useStyles from './styles';

export default function Main() {
  const classes = useStyles();
  return (
    <div>
      <main >
        <TopContent />
        <div className={classes.main}>
          <div className={classes.aside}>
            <Aside />
          </div>
          <div className={classes.product}>
            <ProductContainer />
          </div>
        
        </div>
        
      </main>
      
    </div>
  )
}
