import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px;
  font-size: 1.1rem;
  font-weight: bold;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      width: 120px;
      height: 120px;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120%;
        height: 120%;
        border: 1px solid;
        border-radius: 5px;
        color: ${(props): string => props.theme.background};
        background-color: ${(props): string => props.theme.inverted};
        text-decoration: none;
        transition-property: font-size;
        transition-duration: 0.1s;
        transition-timing-function: linear;

        &:hover {
          cursor: pointer;
          font-size: 1.3rem;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const Playground: React.FC = (): JSX.Element => {
  return (
    <Container>
      <ul>
        <li>
          <Link href='/playground/floating-point'>
            <a>Floating Point</a>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Playground;
