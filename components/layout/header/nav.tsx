import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.nav`
  flex: auto;
  margin: 10px 0;
  font-size: 1.1rem;

  ul {
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      width: 100px;
      margin: 0 20px;

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
        color: ${(props): string => props.theme.inverted};
        text-decoration: none;
        transition-property: color, background-color, border-right-color,
          border-left-color;
        transition-duration: 0.1s;
        transition-timing-function: linear;

        &:hover {
          cursor: pointer;
          color: ${(props): string => props.theme.background};
          background-color: ${(props): string => props.theme.inverted};
          border-right-color: ${(props): string => props.theme.background};
          border-left-color: ${(props): string => props.theme.background};
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
