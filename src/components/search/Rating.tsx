import styled from 'styled-components';
import { BookRecordType } from '../../shared/enums/book.enum';
import {
  alreadyBookRatingAtom,
  wantBookExpectationRatingAtom,
} from '../../store';
import { useAtom } from 'jotai';

interface RatingProps {
  recordType: BookRecordType;
}

function Rating({ recordType }: RatingProps) {
  const [score, setScore] = useAtom(
    recordType === BookRecordType.already
      ? alreadyBookRatingAtom
      : wantBookExpectationRatingAtom
  );

  /**
   * 별점을 눌렀을 때
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event
   */
  const starClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!event.currentTarget) return;

    const starElement = event.currentTarget;
    const starWidth = starElement.offsetWidth;
    const starOffsetX = event.nativeEvent.offsetX;
    const starIndex = parseInt(starElement.id, 10);

    const currentStarScore = starOffsetX / starWidth > 0.5 ? 1 : 0.5;

    setScore(starIndex + currentStarScore);
  };

  /**
   * 별점 컴포넌트 정하기
   * @param {number} score
   * @param {number} index
   * @returns
   */
  function setStarScore(score: number, index: number) {
    const scoreMinusIndex = score - index;

    return scoreMinusIndex === 0.5 ? (
      <HalfStar key={index} onClick={starClicked} id={String(index)} />
    ) : scoreMinusIndex > 0 ? (
      <OneStar key={index} onClick={starClicked} id={String(index)} />
    ) : (
      <ZeroStar key={index} onClick={starClicked} id={String(index)} />
    );
  }

  return (
    <Wrapper>
      {Array.from({ length: 5 }).map((_, index) => setStarScore(score, index))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;
  border: 1px solid red;

  &:hover {
    // TODO: 마우스 오버일 때 별점 보여주기
  }
`;

const Star = styled.div`
  width: 25px;
  height: 25px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const OneStar = styled(Star)`
  background-image: url('${import.meta.env
    .VITE_APP_IMAGEPATH}/img_star_score.svg');
`;

const HalfStar = styled(Star)`
  background-image: url('${import.meta.env
    .VITE_APP_IMAGEPATH}/img_star_score_half.svg');
`;
const ZeroStar = styled(Star)`
  background-image: url('${import.meta.env
    .VITE_APP_IMAGEPATH}/img_star_score_zero.svg');
`;

export default Rating;
