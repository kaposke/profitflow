import styled from 'styled-components';
import CenteredLayout from '../../layouts/CenteredLayout';


export const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.backgroundInverted};
`;

export const HeaderContainer = styled(CenteredLayout)`
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.boxShadow};
`;

export const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 120rem;
  height: 100%;
  padding: 5rem 2rem;
  /* background: red; */

  p {
    margin-top: 1rem;
    text-align: center;
  }

  .register {
    margin: 5rem 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .signIn-button {
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 2rem;
    right: 2rem;

    transition: .2s;
    color: ${props => props.theme.colors.text};

    svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }

    &:hover {
      color: ${props => props.theme.colors.textFaint};
    }
  }

  @media(min-width: 1024px) {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    .register { 
      align-items: center;
    }

    .signIn-button {
      top: 4rem;
      right: 6rem;
    }
  }
`;

export const HeaderInfo = styled.div`
  .logo {
      font-size: 5rem;
      margin-bottom: 0;
  }

  h2 {
    text-align: center;
    margin-top: -1rem;
  }

  .mockup-images {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 2rem;
    margin-top: 5rem;
    img {
      width: 100%;
      max-width: 50rem;
    }
  }

  @media(min-width: 1024px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    .logo {
      font-size: 8rem;
      margin-bottom: 0;
    }

    h2 {
      margin-top: -2rem;
    }
    
    p {
      margin-top: 3rem;
      font-size: 1.8rem;
      text-align: left;
    }
  }
`;


export const BodyContent = styled.div`
  margin: 3rem 0 5rem;
  width: 100%;
  padding: 2rem;
  color: ${props => props.theme.colors.textFaintInverted};

  h3 {
    color: ${props => props.theme.colors.textInverted};
    font-size: 4rem;
  }

  p {
    margin-top: 2rem;
  }

  ul {
    margin-left: 2rem;
  }

  .disclaimer {
    margin-top: 6rem;
    color: ${props => props.theme.colors.textFaint};
  }

  @media(min-width: 1024px) {
    max-width: 120rem;
    font-size: 1.7rem;
  }
`;