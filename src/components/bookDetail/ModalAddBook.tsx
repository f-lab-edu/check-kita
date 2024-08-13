import { ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@chakra-ui/react';
import styled from 'styled-components';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';

import IngBookRecordBox from '../search/IngBookRecordBox';
import WantBookRecordBox from '../search/WantBookRecordBox';
import {
  AlreadyBook,
  BookRecordDetail,
  BookRecordType,
  IngBook,
  MyBook,
  SearchBook,
  WantBook,
} from '../../shared/interfaces/book.interface';
import * as api from '../../shared/services/myBookService';
import { match } from 'ts-pattern';
import { queryClient } from '../../main';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { splitBookAuthor } from '../../shared/utils';
import { INIT_ALREADYBOOK, INIT_INGBOOK, INIT_WANTBOOK } from '../../shared/constants';
import { ModalType } from '../../shared/interfaces/common.interface';
import AlreadyBookRecordBox from '../search/AlreadyBookRecordBox';

interface ModalAddBookProps {
  onClose: () => void;
  bookIsbn: string;
}

function ModalAddBook({ onClose, bookIsbn }: ModalAddBookProps) {
  const [modalType, setModalType] = useState<ModalType>('save');
  const [recordType, setRecordType] = useState<BookRecordType>('already');
  const [alreadyBook, setAlreadyBook] = useState<AlreadyBook>(INIT_ALREADYBOOK);
  const [ingBook, setIngBook] = useState<IngBook>(INIT_INGBOOK);
  const [wantBook, setWantBook] = useState<WantBook>(INIT_WANTBOOK);

  const bookInfo: SearchBook | undefined = queryClient.getQueryData(['book', bookIsbn]);
  const bookRecord: MyBook | undefined = queryClient.getQueryData(['record', bookIsbn]);

  const updateRecord = useMutation({
    mutationFn: (saveBook: MyBook) => api.updateMyBook(saveBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['record', bookIsbn] });
      alert('업데이트 성공!');
    },
    onError: () => {
      alert('업데이트 실패!');
    },
  });

  useEffect(() => {
    if (!bookInfo) {
      // TODO: 알럿 띄우기
      onClose();
      return;
    }
  }, [bookInfo]);

  useEffect(() => {
    if (!bookRecord) return;

    if (bookRecord.id) setModalType('update');
    else setModalType('save');

    const { readingRecord } = bookRecord;
    if (!readingRecord) return;

    const { recordType, recordDetail } = readingRecord;
    setRecordType(recordType);

    switch (recordType) {
      case 'already':
        setAlreadyBook(recordDetail as AlreadyBook);
        break;
      case 'ing':
        setIngBook(recordDetail as IngBook);
        break;
      case 'want':
        setWantBook(recordDetail as WantBook);
        break;
    }
  }, [bookRecord]);

  const getIsSameRecordType = (selectedRecordType: BookRecordType) => {
    return selectedRecordType === recordType;
  };

  /**
   * 책 기록 저장
   */
  const updateBookRecord = async (recordDetail: BookRecordDetail) => {
    try {
      if (!bookInfo) {
        // TODO: 알럿띄우기
        onClose();
        return;
      }

      const selectedBookInfo = {
        id: bookInfo.isbn,
        title: bookInfo.title,
        author: splitBookAuthor(bookInfo.author),
        image: bookInfo.image,
      };

      const saveBook: MyBook = {
        ...selectedBookInfo,
        readingRecord: {
          recordType,
          recordDetail,
        },
      };

      updateRecord.mutate(saveBook);
      onClose();

      // TODO: 성공 알럿 띄우기
    } catch (e) {
      // TODO: 에러 핸들링
    }
  };

  return (
    <ModalContent>
      <ModalHeader>어떤 책 인가요?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <BookTypeButtonWrapper>
          <BookTypeButton
            onClick={() => {
              setRecordType('already');
            }}
            isSelected={getIsSameRecordType('already')}
          >
            <FlagIcon
              sx={{
                color: getIsSameRecordType('already') ? '#fff' : '#cecece',
              }}
            />
            <TypeButtonMainText isSelected={getIsSameRecordType('already')}>
              읽은 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={getIsSameRecordType('already')}>
              다 읽은 책이에요
            </TypeButtonSubText>
          </BookTypeButton>

          <BookTypeButton
            onClick={() => {
              setRecordType('ing');
            }}
            isSelected={getIsSameRecordType('ing')}
          >
            <BookmarkIcon
              sx={{
                color: getIsSameRecordType('ing') ? '#fff' : '#cecece',
              }}
            />
            <TypeButtonMainText isSelected={getIsSameRecordType('ing')}>
              읽고 있는 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={getIsSameRecordType('ing')}>
              열심히 읽고 있어요
            </TypeButtonSubText>
          </BookTypeButton>

          <BookTypeButton
            onClick={() => {
              setRecordType('want');
            }}
            isSelected={getIsSameRecordType('want')}
          >
            <FavoriteIcon
              sx={{
                color: getIsSameRecordType('want') ? '#fff' : '#cecece',
              }}
            />
            <TypeButtonMainText isSelected={getIsSameRecordType('want')}>
              읽고 싶은 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={getIsSameRecordType('want')}>
              찜 해두고 싶어요
            </TypeButtonSubText>
          </BookTypeButton>
        </BookTypeButtonWrapper>
        <TabList>
          {match(recordType)
            .with('already', () => (
              <AlreadyBookRecordBox
                recordInfo={alreadyBook}
                type={modalType}
                updateRecord={updateBookRecord}
              />
            ))
            .with('ing', () => (
              <IngBookRecordBox
                recordInfo={ingBook}
                type={modalType}
                updateRecord={updateBookRecord}
              />
            ))
            .otherwise(() => (
              <WantBookRecordBox
                recordInfo={wantBook}
                type={modalType}
                updateRecord={updateBookRecord}
              />
            ))}
        </TabList>
      </ModalBody>
    </ModalContent>
  );
}

const BookTypeButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

interface TypeButtonProps {
  isSelected: boolean;
}

const BookTypeButton = styled.button<TypeButtonProps>`
  flex: 1 1 auto;
  border: 1px solid ${(props) => (props.isSelected ? 'var(--brand-color)' : '#d3d3d3')};
  border-radius: 10px;
  padding: 15px;
  background-color: ${(props) =>
    props.isSelected ? 'var(--brand-color)' : 'var(--wrapper-color)'};
`;

const TypeButtonMainText = styled.p<TypeButtonProps>`
  padding-top: 6px;
  font-size: 16px;
  line-height: 120%;
  color: ${(props) => (props.isSelected ? '#fff' : 'var(--main-text)')};
`;

const TypeButtonSubText = styled.p<TypeButtonProps>`
  padding-top: 4px;
  font-size: 12px;
  line-height: 120%;
  color: ${(props) => (props.isSelected ? '#fff' : 'var(--main-text)')};
`;

const TabList = styled.div`
  width: 100%;
  padding-top: 20px;
  color: var(--main-text);
`;

export default ModalAddBook;
