import styled from 'styled-components';
import Layout from '../components/layout/layout';

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
`;

const Index = (): JSX.Element => {
  return (
    <Container>
      <Layout />
    </Container>
  );
};

export default Index;
