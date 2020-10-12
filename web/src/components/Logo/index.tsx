import React from 'react';

import { Container } from './styles';

const Logo: React.FC = ({children}) => {
  return (
    <Container className='logo'>
      <strong className="green">Profit</strong><strong className="red">Flow</strong>
    </Container>
  );
}

export default Logo;