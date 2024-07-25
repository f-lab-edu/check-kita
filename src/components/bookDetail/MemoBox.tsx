import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import styled from 'styled-components';
import ModalUpdateMemo from './ModalUpdateMemo';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/memoService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { queryClient } from '../../main';
import { Memo } from '../../shared/interfaces/memo.interface';

function MemoBox() {
  const { bookIsbn } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showedMemoIndex, setShowedMemoIndex] = useState<Number>(-1);
  const [updateTarget, setUpdateTarget] = useState<Memo>();

  const { data: memoList } = useQuery({
    queryKey: ['memos', bookIsbn],
    queryFn: async () => {
      const result = await api.getMemosByBookId(Number(bookIsbn));

      return result;
    },
    enabled: !!bookIsbn,
    retry: false,
  });

  const deleteMemo = useMutation({
    mutationFn: (memoId: number) =>
      api.deleteMemoByMemoId(Number(bookIsbn), memoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', bookIsbn] });
      alert('제거 성공!');
      onClose();
    },
    onError: () => {
      alert('제거 실패!');
    },
  });

  const setUpdateMemo = (targetMemo: Memo) => {
    setUpdateTarget(targetMemo);
    onOpen();
  };

  return (
    <>
      <Wrapper>
        <Flex justify={'space-between'}>
          <DescriptionTitle>메모</DescriptionTitle>
          <Button onClick={onOpen}>메모하기</Button>
        </Flex>
        <HorizontalLine color="#666" margin="0 0 16px"></HorizontalLine>
        <MemoList>
          {!!memoList &&
            memoList.memos.map((memo, index) => (
              <MemoContainer
                key={index}
                onMouseEnter={() => {
                  setShowedMemoIndex(index);
                }}
                onMouseLeave={() => {
                  setShowedMemoIndex(-1);
                }}
              >
                {memo.content}
                <ButtonWrapper show={index === showedMemoIndex}>
                  <Button onClick={() => setUpdateMemo(memo)}>수정</Button>
                  <Button
                    onClick={() => {
                      deleteMemo.mutate(memo.memoId);
                    }}
                  >
                    식제
                  </Button>
                </ButtonWrapper>
              </MemoContainer>
            ))}
        </MemoList>
      </Wrapper>
      {/* 메모 업데이트 모달 */}
      {/* TODO: Modal 공통 컴포넌트로 빼기 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalUpdateMemo
          onClose={onClose}
          updateTarget={updateTarget}
        ></ModalUpdateMemo>
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

const MemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemoContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  gap: 4px;
`;

interface ButtonWrapperProps {
  show: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  gap: 4px;
`;

export default MemoBox;
