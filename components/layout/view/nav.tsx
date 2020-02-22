import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
  width: 150px;
  padding: 0 10px;
  border-right: 1px solid;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    padding: 0;
    margin: 0;

    li {
      height: 20px;
      list-style: none;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        border-top: 2px solid;
        border-right-color: transparent;
        border-bottom: 2px solid;
        border-left-color: transparent;
        border-radius: 5px;
        transition-property: color, background-color, border-color;
        transition-duration: 0.1s;
        transition-timing-function: linear;

        :hover {
          color: #000000;
          background-color: #ffffff;
          border-top-color: #000000;
          border-bottom-color: #000000;
        }
      }
    }
  }
`;

const Nav: React.FC = (): JSX.Element => {
  return (
    <Container>
      <ul>
        <li>
          <Link href='/playground'>
            <a>Playground</a>
          </Link>
        </li>
        <li>
          <Link href='/stats'>
            <a>Stats</a>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default React.memo(Nav);
