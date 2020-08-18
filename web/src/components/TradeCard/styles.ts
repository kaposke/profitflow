import styled from 'styled-components';

export const Container = styled.div<{ expanded: boolean }>`
  .main {
    display: grid;
    grid-template-columns: 3fr 3fr 2fr 1fr;
    align-items: center;
    justify-content: center;
    color: ${ props => props.theme.colors.text};

    .actions {
      strong {
        font-size: 2rem;
      }
    }

    h1 {
      justify-self: center;
      font-size: 2rem;
    }

    .profit {
      font-size: 2rem;
      font-weight: bold;
      justify-self: flex-end;
    }

    svg {
      justify-self: flex-end;
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      transform: ${props => (props.expanded ? `rotate(180deg)` : "")};
      transition: 0.2s;

      &:hover {
        color: ${ props => props.theme.colors.textFaint}
      }
    }
  }

  .expanded-space {
    margin-top: 1rem;

    p {
      color: ${ props => props.theme.colors.textFaint};
      line-height: 2.4rem;
    }
  }

  .expanded-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
