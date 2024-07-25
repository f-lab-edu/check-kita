import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 768px;
  max-width: 1154px;
  min-height: 100%;
  padding: 0 24px;
  margin: auto;
`;

export default Container;
