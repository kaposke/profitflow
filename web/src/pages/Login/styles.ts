import styled from 'styled-components';
import { lighten } from 'polished';
import { FadeInFromBelow } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  max-width: 120rem;
  height: 100%;
  padding: 0 2rem;

  p {
    margin-top: 1rem;
    text-align: center;
  }

  .login {
    margin-top: 5rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  @media(min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    .login { 
      align-items: center;
    }
  }
`;

export const LandingContent = styled.div`

  .logo {
      font-size: 5rem;
      margin-bottom: 0;
  }

  h2 {
    text-align: center;
    margin-top: -1rem;
  }

  .mockup-images {
    display: none;
  }

  /* background: #f0f0f0; */

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

    .mockup-images {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5rem;

      .laptop-mockup {
        display: inline-block;
        img {
          height: 30rem;
        }
      }

      .phone-mockup {
        display: inline-block;
        margin: 4rem 0 0 -15rem;
        img {
          height: 25rem;
        }
      }
    }
  }
`;
