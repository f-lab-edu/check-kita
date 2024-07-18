import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../../shared/services/memoService';
import { queryClient } from '../../main';
import { generateMemoId } from '../../shared/utils';

interface ModalUpdateMemoProps {
  onClose: () => void;
}

function ModalUpdateMemo({ onClose }: ModalUpdateMemoProps) {
  const { bookIsbn } = useParams();
  const [memo, setMemo] = useState<string>('');

  const updateMemo = useMutation({
    mutationFn: () =>
      api.updateBookMemo(Number(bookIsbn), {
        memoId: generateMemoId(),
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

  return (
    <ModalContent>
      <ModalHeader>어떤 책 인가요?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <MemoTextarea value={memo} onChange={(e) => setMemo(e.target.value)} />
        <Button onClick={() => updateMemo.mutate()}>메모 완료</Button>
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
