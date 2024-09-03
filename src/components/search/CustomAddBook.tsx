import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import { SearchBook } from '../../shared/interfaces/book.interface';
import UploadIcon from '@mui/icons-material/Upload';
import { INIT_SEARCH_BOOK } from '../../shared/constants/constants';
import * as api from '../../shared/services/searchService';
import ModalAddBook from '../bookDetail/ModalAddBook';

interface CustomAddBookProps {
  isOpen: boolean;
  onClose: () => void;
}

function CustomAddBook({ isOpen, onClose }: CustomAddBookProps) {
  const [step, setStep] = useState<number>(1);
  const [bookInfo, setBookInfo] = useState<SearchBook>(INIT_SEARCH_BOOK);

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();

  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setImage(selectedFile);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const addNewBook = async () => {
    try {
      if (!image || !title || !author || !publisher || !isbn) return;

      const imageUrl = await api.imageUpload(image);

      if (!imageUrl) return;

      setBookInfo({ title, author, publisher, isbn: Number(isbn), image: imageUrl });
      setStep(2);
    } catch (e) {
      throw new Error('addNewBook Error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {step === 1 ? (
        <>
          <ModalContent>
            <ModalHeader>원하는 책이 없으신가요? 직접 입력하기</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ContentWraper>
                <ImageInputWrapper>
                  <input id="preview" type="file" accept="image/*" required onChange={imgUpload} />
                  <label htmlFor="preview">
                    {preview ? (
                      <img src={preview} alt="업로드 이미지" />
                    ) : (
                      <NoUploadPreview>
                        <UploadIcon fontSize="large" color="inherit" />
                        <span>이미지 선택</span>
                      </NoUploadPreview>
                    )}
                  </label>
                </ImageInputWrapper>
                <InputContainer>
                  <BookInputWrapper>
                    <input
                      id="title"
                      placeholder="제목"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <input
                      placeholder="지은이"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                      }}
                    />
                    <input
                      placeholder="출판사"
                      value={publisher}
                      onChange={(e) => {
                        setPublisher(e.target.value);
                      }}
                    />
                    <input
                      placeholder="ISBN"
                      value={isbn}
                      onChange={(e) => {
                        setIsbn(e.target.value);
                      }}
                    />
                  </BookInputWrapper>
                  <Button width={'100%'} onClick={addNewBook}>
                    책 추가하기
                  </Button>
                </InputContainer>
              </ContentWraper>
            </ModalBody>
          </ModalContent>
        </>
      ) : (
        <ModalAddBook onClose={onClose} bookIsbn={String(bookInfo.isbn)} bookInfo={bookInfo} />
      )}
    </Modal>
  );
}

const ContentWraper = styled.div`
  display: flex;
  gap: 30px;
`;

const ImageInputWrapper = styled.div`
  flex: 0 0 150px;
  border: 1px solid var(--border-color);
  border-radius: var(--wrapper-border-radius);
  overflow: hidden;

  & > input {
    display: none;
  }

  & > label {
    cursor: pointer;
    width: 150px;
    aspect-ratio: 210/297;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NoUploadPreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--sub-text-color-2);

  & > span {
    font-size: 12px;
    font-weight: 700;
    font-family: 'Galmuri14';
    color: inherit;
  }

  &:hover {
    background-color: var(--brand-color-a);
  }
`;

const InputContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BookInputWrapper = styled.div`
  flex: 1 1 auto;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > input {
    font-size: 16px;
    background-color: transparent;
    outline: none;
    border-bottom: 1px solid var(--sub-text-color-2);

    &::placeholder {
      color: var(--main-text-color);
    }
  }
`;

export default CustomAddBook;
