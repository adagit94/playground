import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
  width: 150px;
  padding: 0 10px;
  border-right: 1px solid #000000;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  ul li {
    height: 15%;
    list-style: none;

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #000000;
      border-top: 2px solid black;
      border-right: none;
      border-bottom: 2px solid black;
      border-left: none;
      border-radius: 5px;
      transition-property: color, background-color, border-color;
      transition-duration: 0.1s;
      transition-timing-function: linear;

      :hover {
        color: #ffffff;
        background-color: #000000;
        border-color: #ffffff;
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
          <Link href='/'>
            <a>X</a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>X</a>
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
