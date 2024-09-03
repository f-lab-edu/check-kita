import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';
import styled from 'styled-components';
import { match } from 'ts-pattern';
import imgOneStar from '../../assets/images/img_star_score.svg';
import imgHalfStar from '../../assets/images/img_star_score_half.svg';
import imgZeroStar from '../../assets/images/img_star_score_zero.svg';

interface RatingProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

function Rating({ score, setScore }: RatingProps) {
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
  function starScore(score: number, index: number) {
    const scoreMinusIndex = score - index;

    return match(scoreMinusIndex)
      .with(0.5, () => (
        <Star
          key={`half-${index}`}
          onClick={starClicked}
          id={String(index)}
          src={imgHalfStar}
          alt="반점"
        />
      ))
      .when(
        (n) => n > 0,
        () => (
          <Star
            key={`one-${index}`}
            onClick={starClicked}
            id={String(index)}
            src={imgOneStar}
            alt="일점"
          />
        )
      )
      .otherwise(() => (
        <Star
          key={`zero-${index}`}
          onClick={starClicked}
          id={String(index)}
          src={imgZeroStar}
          alt="영점"
        />
      ));
  }

  return <Wrapper>{Array.from({ length: 5 }).map((_, index) => starScore(score, index))}</Wrapper>;
}

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;

  &:hover {
    // TODO: 마우스 오버일 때 별점 보여주기
  }
`;

const Star = styled.img`
  width: 25px;
  height: 25px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export default Rating;
