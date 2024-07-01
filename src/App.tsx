import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';

function App() {
  return (
    <Wrapper>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
  min-width: 768px;
  max-width: 1154px;
  min-height: 100%;
  padding: 0 24px;
  margin: auto;
`;

export default App;
