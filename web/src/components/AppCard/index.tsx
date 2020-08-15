import styled from 'styled-components';

const AppCard = styled.div`
  width: 100%;
  min-height: 3rem;
  background: ${ props => props.theme.colors.card };
  border-radius: ${ props => props.theme.borderRadius };
  box-shadow: ${ props => props.theme.boxShadow };
  padding: 1.6rem;
`;

export default AppCard;