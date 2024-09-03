import { Button, Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reviewService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { queryClient } from '../../main';
import { useAuth } from '../../contexts/AuthContext';
import { convertDateToDisplayFormat, generateId } from '../../shared/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Review } from '../../shared/interfaces/review.interface';

function ReviewBox() {
  const { isAuthenticated, user } = useAuth();
  const { bookIsbn } = useParams();

  const [reviewText, setReviewText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [updateTarget, setUpdateTarget] = useState<Review>();

  const addReview = useMutation({
    mutationFn: async () => {
      if (!user) return;
      if (!bookIsbn) return;
      if (!reviewText) return;

      return await api.updateReview({
        userId: user.id,
        nickname: user.nickname,
        bookIsbn: bookIsbn,
        reviewId: generateId(),
        content: reviewText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', bookIsbn] });
      setReviewText('');
      alert('리뷰 작성 완료');
    },
    onError: () => {
      alert('추가 실패!');
    },
  });

  const updateReview = useMutation({
    mutationFn: async (changedReview: Review) => {
      if (!user) return;
      if (!bookIsbn) return;
      if (!updateText) return;

      return await api.updateReview({
        ...changedReview,
        content: updateText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', bookIsbn] });
      setUpdateTarget(undefined);
      setUpdateText('');
      alert('리뷰 수정 완료');
    },
    onError: () => {
      alert('수정 실패!');
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', bookIsbn],
    queryFn: async () => {
      if (!bookIsbn) return [];

      const result = await api.getReviewsByBookIsbn(bookIsbn);
      return result;
    },
    enabled: !!bookIsbn,
    retry: false,
  });

  const deleteReview = useMutation({
    mutationFn: (reviewId: string) => api.deleteMemoByReviewId(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', bookIsbn] });
      alert('리뷰 삭제');
    },
    onError: () => {
      alert('제거 실패!');
    },
  });

  const startReviewUpdateHandle = (target: Review) => {
    setUpdateTarget(target);
    setUpdateText(target.content);
  };

  return (
    <>
      <Wrapper>
        <Flex alignItems={'baseline'} gap={'10px'}>
          <DescriptionTitle>리뷰</DescriptionTitle>
          <ReviewSubText>이 책을 평가해주세요!</ReviewSubText>
        </Flex>
        <HorizontalLine margin="0 0 16px"></HorizontalLine>
        <Flex flexDirection={'column'} alignItems={'flex-end'}>
          <ReviewTextarea
            placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다"
            maxLength={100}
            disabled={!isAuthenticated}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          />
          <Button
            disabled={!isAuthenticated}
            onClick={() => {
              addReview.mutate();
            }}
          >
            리뷰 남기기
          </Button>
        </Flex>
        <ReviewListWrapper>
          <DescriptionTitle>
            총 <strong>{reviews ? reviews.length : 0}</strong> 개 리뷰
          </DescriptionTitle>
          <HorizontalLine margin="0 0 16px"></HorizontalLine>

          {!!reviews?.length &&
            reviews.map((review, index) => (
              <ReviewContainer key={index}>
                <Flex
                  flexDirection={'column'}
                  gap={'12px'}
                  alignItems={'flex-end'}
                  marginBottom={'8px'}
                >
                  <Content
                    isEdit={updateTarget?.reviewId === review.reviewId}
                    value={updateTarget?.reviewId === review.reviewId ? updateText : review.content}
                    onChange={(e) => {
                      setUpdateText(e.target.value);
                    }}
                  />
                  {updateTarget?.reviewId === review.reviewId && (
                    <Button
                      width={'fit-content'}
                      onClick={() => {
                        updateReview.mutate(review);
                      }}
                    >
                      수정 완료
                    </Button>
                  )}
                </Flex>
                {/* 리뷰 작성자 정보 */}
                <Flex gap={'8px'} alignItems={'flex-end'} marginBottom={'8px'}>
                  <CreatedReviewInfoText>{review.nickname}</CreatedReviewInfoText>
                  {review.createdAt && (
                    <CreatedReviewInfoText>
                      {convertDateToDisplayFormat(review.createdAt.toDate())}
                    </CreatedReviewInfoText>
                  )}
                </Flex>
                {/* 리뷰 컨트롤 버튼 */}
                {user && user.id === review.userId && (
                  <Flex gap={'8px'} justifyContent={'flex-end'}>
                    <Button
                      size="xsIcon"
                      variant="goast"
                      onClick={() => {
                        startReviewUpdateHandle(review);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      size="xsIcon"
                      variant="goast"
                      onClick={() => {
                        deleteReview.mutate(review.reviewId);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Flex>
                )}
              </ReviewContainer>
            ))}
        </ReviewListWrapper>
      </Wrapper>
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

  & > strong {
    color: var(--brand-color-2);
    font-weight: 700;
  }
`;

const ReviewSubText = styled.div`
  font-size: 14px;
  color: var(--sub-text-color-2);
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

const ReviewTextarea = styled.textarea`
  width: 100%;
  background-color: transparent;
  outline: none;
  border: 1px solid var(--main-text-color);
  padding: 8px 12px;
  margin-bottom: 12px;
  border-radius: 3px;
  resize: none;
`;

const ReviewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReviewContainer = styled.div`
  background-color: var(--wrapper-color);
  padding: 12px;
  border-radius: 6px;
`;

interface ContentProps {
  isEdit: boolean;
}

const Content = styled.textarea<ContentProps>`
  width: 100%;
  background-color: transparent;
  resize: none;
  outline: none;
  padding: 8px;

  border: ${(props) => (props.isEdit ? '1px solid #FFF' : 'none')};
`;

const CreatedReviewInfoText = styled.div`
  color: var(--sub-text-color-2);
  font-size: 12px;
`;

export default ReviewBox;
