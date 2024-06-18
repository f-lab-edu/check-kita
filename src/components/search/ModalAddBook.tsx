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
import { BookRecordType } from '../../shared/enums/book.enum';
import AlreadyBookRecordBox from './AlreadyBookRecordBox';
import IngBookRecordBox from './IngBookRecordBox';
import WantBookRecordBox from './WantBookRecordBox';
import {
  AlreadyBook,
  IngBook,
  MyBook,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { addMyBook } from '../../shared/services/myBookService';

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
        case BookRecordType.already:
          bookDetail = alreadyBook;
          break;
        case BookRecordType.ing:
          bookDetail = ingBook;
          break;
        case BookRecordType.want:
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
              changeRecordType(BookRecordType.already);
            }}
            isSelected={getIsSameRecordType(BookRecordType.already)}
          >
            <FlagIcon
              sx={{
                color: getIsSameRecordType(BookRecordType.already)
                  ? '#fff'
                  : '#cecece',
              }}
            />
            <TypeButtonMainText
              isSelected={getIsSameRecordType(BookRecordType.already)}
            >
              읽은 책
            </TypeButtonMainText>
            <TypeButtonSubText
              isSelected={getIsSameRecordType(BookRecordType.already)}
            >
              다 읽은 책이에요
            </TypeButtonSubText>
          </BookTypeButton>

          <BookTypeButton
            onClick={() => {
              changeRecordType(BookRecordType.ing);
            }}
            isSelected={getIsSameRecordType(BookRecordType.ing)}
          >
            <BookmarkIcon
              sx={{
                color: getIsSameRecordType(BookRecordType.ing)
                  ? '#fff'
                  : '#cecece',
              }}
            />
            <TypeButtonMainText
              isSelected={getIsSameRecordType(BookRecordType.ing)}
            >
              읽고 있는 책
            </TypeButtonMainText>
            <TypeButtonSubText
              isSelected={getIsSameRecordType(BookRecordType.ing)}
            >
              열심히 읽고 있어요
            </TypeButtonSubText>
          </BookTypeButton>

          <BookTypeButton
            onClick={() => {
              changeRecordType(BookRecordType.want);
            }}
            isSelected={getIsSameRecordType(BookRecordType.want)}
          >
            <FavoriteIcon
              sx={{
                color: getIsSameRecordType(BookRecordType.want)
                  ? '#fff'
                  : '#cecece',
              }}
            />
            <TypeButtonMainText
              isSelected={getIsSameRecordType(BookRecordType.want)}
            >
              읽고 싶은 책
            </TypeButtonMainText>
            <TypeButtonSubText
              isSelected={getIsSameRecordType(BookRecordType.want)}
            >
              찜 해두고 싶어요
            </TypeButtonSubText>
          </BookTypeButton>
        </BookTypeButtonWrapper>
        <TabList>
          {getIsSameRecordType(BookRecordType.already) ? (
            <AlreadyBookRecordBox />
          ) : getIsSameRecordType(BookRecordType.ing) ? (
            <IngBookRecordBox />
          ) : (
            <WantBookRecordBox />
          )}
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
