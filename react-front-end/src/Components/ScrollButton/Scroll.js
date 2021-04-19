import styled from 'styled-components';
  
export const Heading = styled.h1`
   text-align: center;
   color: green;
`;
  
export const Content = styled.div`
   overflowY: scroll;
   height: 2500px;
`;
  
export const Button = styled.div`
position: fixed;
font-size: 3.5rem;
z-index: 1;
cursor: pointer;
color: #3f51b5;
width: 70px;
height: 70px;
text-decoration: none;
bottom: 90px;
right: 20px;
border-radius: 50%;
@media only screen and (max-width: 768px){
   font-size: 2.5rem;
   width: 40px;
   height: 40px;
   bottom: 110px;
   right: 8px;
}

`