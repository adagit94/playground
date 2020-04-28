import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ContextFirebase } from '../contexts/firebase';

const Container = styled.div`
  padding: 10px;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 5px;
      color: ${(props): string => props.theme.background};
      background-color: ${(props): string => props.theme.inverted};

      &:hover {
        h3 {
          display: none;
        }

        div {
          display: block;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
`;

const Mode = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 20%;
    border: 1px solid ${(props): string => props.theme.background};
    border-radius: 5px;
    color: ${(props): string => props.theme.background};
    background-color: ${(props): string => props.theme.inverted};
    text-decoration: none;
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:hover {
      color: ${(props): string => props.theme.inverted};
      background-color: ${(props): string => props.theme.background};
    }

    &:focus {
      outline: none;
    }
  }
`;

const Playground: React.FC = (): JSX.Element => {
  const statesFirebase = useContext(ContextFirebase);

  return (
    <Container>
      <ul>
        <li>
          <h3>Floating Point</h3>
          <Mode>
            <Link href='/playground/floating-point-offline'>
              <a>Offline</a>
            </Link>
            {statesFirebase.user && (
              <Link href='/playground/floating-point-online'>
                <a>Online</a>
              </Link>
            )}
          </Mode>
        </li>
      </ul>
    </Container>
  );
};

export default Playground;
