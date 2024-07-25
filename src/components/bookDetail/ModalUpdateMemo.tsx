import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../../shared/services/memoService';
import { queryClient } from '../../main';
import { generateId } from '../../shared/utils';
import { Memo } from '../../shared/interfaces/memo.interface';
import { ModalType } from '../../shared/interfaces/common.interface';

interface ModalUpdateMemoProps {
  onClose: () => void;
  updateTarget?: Memo;
}

function ModalUpdateMemo({ onClose, updateTarget }: ModalUpdateMemoProps) {
  const { bookIsbn } = useParams();
  const [memo, setMemo] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>('save');

  const addMemo = useMutation({
    mutationFn: () =>
      api.addBookMemo(Number(bookIsbn), {
        memoId: generateId(),
        content: memo,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', bookIsbn] });
      alert('추가 성공!');
      onClose();
    },
    onError: () => {
      alert('추가 실패!');
    },
  });

  const updateMemoByMemoId = useMutation({
    mutationFn: () =>
      api.updateMemoByMemoId(Number(bookIsbn), {
        memoId: String(updateTarget?.memoId),
        content: memo,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos', bookIsbn] });
      alert('추가 성공!');
      onClose();
    },
    onError: () => {
      alert('추가 실패!');
    },
  });

  useEffect(() => {
    if (!updateTarget) return;

    const { content } = updateTarget;

    setMemo(content);
    setModalType('update');
  }, [updateTarget]);

  return (
    <ModalContent>
      <ModalHeader>메모를 작성해주세요.</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <MemoTextarea value={memo} onChange={(e) => setMemo(e.target.value)} />
        <Button
          onClick={() =>
            modalType === 'save'
              ? addMemo.mutate()
              : updateMemoByMemoId.mutate()
          }
        >
          메모 완료
        </Button>
      </ModalBody>
    </ModalContent>
  );
}

const MemoTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 5px solid red;
`;

export default ModalUpdateMemo;
