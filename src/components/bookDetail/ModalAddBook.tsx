import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import styled from 'styled-components';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAtom, useAtomValue } from 'jotai';
import {
  alreadyBookAtom,
  ingBookAtom,
  selectedBookAtom,
  readingRecordTypeAtom,
  wantBookAtom,
} from '../../store';
import AlreadyBookRecordBox from '../search/AlreadyBookRecordBox';
import IngBookRecordBox from '../search/IngBookRecordBox';
import WantBookRecordBox from '../search/WantBookRecordBox';
import {
  AlreadyBook,
  BookRecordType,
  IngBook,
  MyBook,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { addMyBook } from '../../shared/services/myBookService';
import { match } from 'ts-pattern';

interface ModalAddBookProps {
  onClose: () => void;
}

function ModalAddBook({ onClose }: ModalAddBookProps) {
  const [recordType, setRecordType] = useAtom(readingRecordTypeAtom);
  const selectedBookInfo = useAtomValue(selectedBookAtom);
  const alreadyBook = useAtomValue(alreadyBookAtom);
  const ingBook = useAtomValue(ingBookAtom);
  const wantBook = useAtomValue(wantBookAtom);

  /**
   * 저장할 책 타입 변경
   * @param changeBookRecordType
   */
  const changeRecordType = (changeBookRecordType: BookRecordType) => {
    setRecordType(changeBookRecordType);
  };

  const getIsSameRecordType = (selectedRecordType: BookRecordType) => {
    return selectedRecordType === recordType;
  };

  /**
   * 책 기록 저장
   */
  const saveBookRecord = async () => {
    try {
      let bookDetail: AlreadyBook | IngBook | WantBook;

      switch (recordType) {
        case 'already':
          bookDetail = alreadyBook;
          break;
        case 'ing':
          bookDetail = ingBook;
          break;
        case 'want':
          bookDetail = wantBook;
          break;
      }

      const saveBook: MyBook = {
        ...selectedBookInfo,
        readingRecord: {
          recordType,
          recordDetail: bookDetail,
        },
      };

      await addMyBook(saveBook);
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
              changeRecordType('already');
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
              changeRecordType('ing');
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
              changeRecordType('want');
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
            .with('already', () => <AlreadyBookRecordBox />)
            .with('ing', () => <IngBookRecordBox />)
            .otherwise(() => (
              <WantBookRecordBox />
            ))}
        </TabList>
      </ModalBody>
      <ModalFooter>
        <Button width={'100%'} onClick={saveBookRecord}>
          저장하기
        </Button>
      </ModalFooter>
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
  border: 1px solid
    ${(props) => (props.isSelected ? 'var(--brand-color)' : '#d3d3d3')};
  border-radius: 10px;
  padding: 15px;
  background-color: ${(props) =>
    props.isSelected ? 'var(--brand-color)' : '#fff'};
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
