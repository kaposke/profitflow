import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 40rem;

  .card {
    position: relative;
/* 
  .logout-button {
      position: absolute;
      right: 1.6rem;
      top: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      cursor: pointer;

      svg {
        width: 1.7rem;
        height: 1.7rem;
        margin-right: 1rem;
      }
    } */

    .logo {
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.8rem;
      text-align: center;
      margin-bottom: 1rem;

      span {
        color: ${props => props.theme.colors.linkColor}
      }
    }
    
    .buttons {
      margin-top: 2rem;

      button {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }
`;
