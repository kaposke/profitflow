import React from 'react';

// import { Container } from './styles';

const Capitalized: React.FC = ({children}) => {
  const child = children as string;
  let text = child.charAt(0).toUpperCase() + child.slice(1);

  return <span>{text}</span>;
}

export default Capitalized;