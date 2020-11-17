import styled from 'styled-components';

export const Container = styled.div`
  max-width: 120rem;
  /* height: 100%; */
  height: 100%;
  padding: 2rem 0;

  color: ${props => props.theme.colors.textFaint};

  line-height: 2.2rem;

  h2, h3 {
    color: ${props => props.theme.colors.text};
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  li {
    margin-left: 2rem;
  }

  > div {
    padding: 3rem;
  }
`;
