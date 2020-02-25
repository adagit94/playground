import React from 'react';
import styled from 'styled-components';

import Header from './header/header';
import Main from './main/main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #ffffff;
  background-color: #000000;

  a {
    text-decoration: none;

    :hover {
      cursor: pointer;
    }
  }

  input {
    &[type='button'] {
      font-weight: bold;

      :hover {
        cursor: pointer;
      }

      :focus {
        outline: none;
      }
    }

    &[type='color'] {
      cursor: pointer;
    }
  }
`;

const Layout: React.FC<{ content: JSX.Element }> = ({
  content
}): JSX.Element => {
  return (
    <Container>
      <Header />
      <Main content={content} />
    </Container>
  );
};

export default React.memo(Layout);
