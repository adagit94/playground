import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
  flex: auto;
  padding: 10px 0;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    width: 300px;
    padding: 0;
    margin: 0;

    li {
      width: 100px;
      list-style: none;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-top-color: transparent;
        border-right: 2px solid;
        border-bottom-color: transparent;
        border-left: 2px solid;
        border-radius: 5px;
        text-decoration: none;
        color: #ffffff;
        text-decoration: none;
        transition-property: color, background-color, border-right-color,
          border-left-color;
        transition-duration: 0.1s;
        transition-timing-function: linear;

        &:hover {
          cursor: pointer;
          color: #000000;
          background-color: #ffffff;
          border-right-color: #000000;
          border-left-color: #000000;
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
