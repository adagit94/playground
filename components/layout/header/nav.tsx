import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
  flex-grow: 1;
  padding: 10px 0;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15%;
    border-left: 2px solid #000000;
    border-right: 2px solid #000000;
    border-radius: 5px;
    list-style: none;
    transition-property: color, background-color, border-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    :hover {
      color: #ffffff;
      background-color: #000000;
      border-color: #ffffff;
    }
  }
`;

const Nav = (): JSX.Element => {
  return (
    <Container>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </Container>
  );
};

export default Nav;
