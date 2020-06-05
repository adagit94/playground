import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {
  paddingContainer,
  borderRadiusLink
} from 'components/styled-components/_variables';

import { ContextFirebase } from 'contexts/firebase';

const Container = styled.div`
  padding: ${paddingContainer};

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
      color: ${({ theme }): string => theme.background};
      background-color: ${({ theme }): string => theme.inverted};

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
    border: 2px solid ${({ theme }): string => theme.background};
    border-radius: ${borderRadiusLink};
    color: ${({ theme }): string => theme.background};
    background-color: ${({ theme }): string => theme.inverted};
    text-decoration: none;
    transition-property: color, background-color;
    transition-duration: 0.1s;
    transition-timing-function: linear;

    &:hover {
      color: ${({ theme }): string => theme.inverted};
      background-color: ${({ theme }): string => theme.background};
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
