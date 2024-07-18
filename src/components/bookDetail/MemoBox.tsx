import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import styled from 'styled-components';
import ModalUpdateMemo from './ModalUpdateMemo';

function MemoBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: 메모 수정의 경우 selectedMemo에 담아서 전달

  return (
    <>
      <Wrapper>
        <Flex justify={'space-between'}>
          <DescriptionTitle>메모</DescriptionTitle>
          <Button onClick={onOpen}>메모하기</Button>
        </Flex>
        <HorizontalLine color="#666" margin="0 0 16px"></HorizontalLine>
      </Wrapper>
      {/* 메모 업데이트 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalUpdateMemo onClose={onClose}></ModalUpdateMemo>
      </Modal>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 16px;
`;

const DescriptionTitle = styled.div`
  font-size: 20px;
  color: #666;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 24px;
  padding: 10px 0 8px;
`;

interface HorizontalLineProps {
  color?: string;
  margin?: string;
}

const HorizontalLine = styled.div<HorizontalLineProps>`
  width: 100%;
  border: 1px solid ${(props) => (props.color ? props.color : '#e6e8eb')};
  margin: ${(props) => (props.margin ? props.margin : '20px 0')};
`;

export default MemoBox;
