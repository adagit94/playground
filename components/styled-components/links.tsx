import styled from 'styled-components';

export const LinkStandard = styled.a`
  text-decoration: none;
  color: ${(props): string => props.theme.background};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
