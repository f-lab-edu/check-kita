import { Button, Flex, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';
import ModalUpdateMemo from './ModalUpdateMemo';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/memoService';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { queryClient } from '../../main';
import { Memo } from '../../shared/interfaces/memo.interface';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../contexts/AuthContext';

function MemoBox() {
  const { isAuthenticated, user } = useAuth();
  const { bookIsbn } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showedMemoIndex, setShowedMemoIndex] = useState<number>(-1);
  const [updateTarget, setUpdateTarget] = useState<Memo>();
  const navigate = useNavigate();

  const { data: memos } = useQuery({
    queryKey: ['memos', bookIsbn],
    queryFn: async () => {
      if (!user) return;

      const result = await api.getMemosByBookIsbn(user.id, Number(bookIsbn));

      return result;
    },
    enabled: !!bookIsbn && !!user,
    retry: false,
  });

  const deleteMemo = useMutation({
    mutationFn: (memoId: string) => api.deleteMemoByMemoId(memoId),
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

  const hanldeModalClose = () => {
    onClose();
    setUpdateTarget(undefined);
  };

  return (
    <>
      <Wrapper>
        <Flex justify={'space-between'}>
          <DescriptionTitle>메모</DescriptionTitle>
          <Button
            onClick={
              isAuthenticated
                ? onOpen
                : () => {
                    navigate('/auth');
                  }
            }
            size="mdIcon"
            variant="goast"
          >
            <AddIcon />
          </Button>
        </Flex>
        <HorizontalLine margin="0 0 16px"></HorizontalLine>
        <MemoList>
          {!!memos &&
            memos.map((memo, index) => (
              <MemoContainer
                key={index}
                onMouseEnter={() => {
                  setShowedMemoIndex(index);
                }}
                onMouseLeave={() => {
                  setShowedMemoIndex(-1);
                }}
              >
                <p>{memo.content}</p>
                <ButtonWrapper show={index === showedMemoIndex}>
                  <Button size="xsIcon" variant="goast" onClick={() => setUpdateMemo(memo)}>
                    <EditIcon />
                  </Button>
                  <Button
                    size="xsIcon"
                    variant="goast"
                    onClick={() => {
                      deleteMemo.mutate(memo.memoId);
                    }}
                  >
                    <DeleteIcon />
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
          updateTarget={updateTarget}
          hanldeModalClose={hanldeModalClose}
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
  color: var(--main-text-color);
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
  border: 1px solid ${(props) => (props.color ? props.color : 'var(--main-text-color)')};
  margin: ${(props) => (props.margin ? props.margin : '20px 0')};
`;

const MemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MemoContainer = styled.div`
  background-color: var(--wrapper-color);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  gap: 12px;

  p {
    width: calc(100% - 70px);
  }
`;

interface ButtonWrapperProps {
  show: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  gap: 4px;
`;

export default MemoBox;
