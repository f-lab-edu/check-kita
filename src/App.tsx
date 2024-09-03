import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/common/Header';

function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--background-color);
  padding-bottom: 180px;
`;

export default App;
