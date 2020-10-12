import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    margin-bottom: 2rem;
  }

  .spinner {
    justify-self: center;
  }

  .content {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      text-align: center;
      font-size: 1.6rem;

      margin-bottom: 2rem;
    }
  }
`;
