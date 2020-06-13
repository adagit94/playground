import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { borderRadiusLink } from 'components/styled-components/_variables';

const Container = styled.nav`
  flex: auto;
  margin: 5px 0;
  font-size: 1.1rem;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: start;
    height: 100%;
    padding: 5px 10px;
    margin: 0;

    li {
      list-style: none;
      width: 100px;
      height: 100%;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-top: 2px solid;
        border-right: transparent;
        border-bottom: 2px solid;
        border-left: transparent;
        border-radius: ${borderRadiusLink};
        color: ${({ theme }): string => theme.inverted};
        text-decoration: none;
        transition-property: border-radius, color, background-color;
        transition-duration: 0.1s;
        transition-timing-function: ease-in;

        &:hover {
          cursor: pointer;
          border-radius: ${borderRadiusLink};
          color: ${({ theme }): string => theme.background};
          background-color: ${({ theme }): string => theme.inverted};
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
      </ul>
    </Container>
  );
};

export default memo(Nav);
