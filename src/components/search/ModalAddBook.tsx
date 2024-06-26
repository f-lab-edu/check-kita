import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { match } from 'ts-pattern';

function ModalAddBook() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const changeTabIndex = (changedIndex: number) => {
    setTabIndex(changedIndex);
  };
  return (
    <ModalContent>
      <ModalHeader>어떤 책 인가요?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <BookTypeButtonWrapper>
          <BookTypeButton
            onClick={() => {
              changeTabIndex(0);
            }}
            isSelected={tabIndex === 0}
          >
            <FlagIcon sx={{ color: tabIndex === 0 ? '#fff' : '#cecece' }} />
            <TypeButtonMainText isSelected={tabIndex === 0}>
              읽은 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={tabIndex === 0}>
              다 읽은 책이에요
            </TypeButtonSubText>
          </BookTypeButton>
          <BookTypeButton
            onClick={() => {
              changeTabIndex(1);
            }}
            isSelected={tabIndex === 1}
          >
            <BookmarkIcon sx={{ color: tabIndex === 1 ? '#fff' : '#cecece' }} />
            <TypeButtonMainText isSelected={tabIndex === 1}>
              읽고 있는 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={tabIndex === 1}>
              열심히 읽고 있어요
            </TypeButtonSubText>
          </BookTypeButton>
          <BookTypeButton
            onClick={() => {
              changeTabIndex(2);
            }}
            isSelected={tabIndex === 2}
          >
            <FavoriteIcon sx={{ color: tabIndex === 2 ? '#fff' : '#cecece' }} />
            <TypeButtonMainText isSelected={tabIndex === 2}>
              읽고 싶은 책
            </TypeButtonMainText>
            <TypeButtonSubText isSelected={tabIndex === 2}>
              찜 해두고 싶어요
            </TypeButtonSubText>
          </BookTypeButton>
        </BookTypeButtonWrapper>
        <TabList>
          {match(tabIndex)
            .with(0, () => (
              <div>
                <LabelText>독서 기간</LabelText>
                <label htmlFor="startDate">시작일</label>
                <DateInput type="date" id="startDate" />
                <label htmlFor="endDate">종료일</label>
                <DateInput type="date" id="endDate" />
                <div>평점을 남겨 주세요!</div>
              </div>
            ))
            .with(2, () => (
              <div>
                <div>독서량</div>
                <div>쪽수 또는 %로 입력받기</div>
                <div>독서 기간</div>
                <label htmlFor="startDate">시작일</label>
                <DateInput type="date" id="startDate" />
              </div>
            ))
            .otherwise(() => (
              <div>
                <div>기대 지수</div>
                <div>별점</div>
                <div>기대평</div>
                <textarea></textarea>
              </div>
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

const LabelText = styled.p`
  font-size: 13px;
`;

const DateInput = styled.input`
  /* width: 0; */
  /* height: 0; */
`;

export default ModalAddBook;
