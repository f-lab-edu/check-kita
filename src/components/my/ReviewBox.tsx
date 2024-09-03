import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reviewService';
import styled from 'styled-components';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { convertDateToDisplayFormat } from '../../shared/utils';
import { useAuth } from '../../contexts/AuthContext';

function ReviewBox() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['all reviews'],
    queryFn: async () => {
      if (!user) return;
      return await api.getAllReviewsByUserId(user.id);
    },
  });

  return (
    <Wrapper>
      <Title>리뷰 모아 보기</Title>
      {data?.map((review, index) => (
        <ContentBox key={`ReviewBox-ContentBox-${index}`}>
          <div>
            <QuoteWrapper>
              <FormatQuoteIcon fontSize="small" />
            </QuoteWrapper>
            <ReviewContent>{review.content}</ReviewContent>
          </div>
          {review.createdAt && (
            <CreatedAtText>{convertDateToDisplayFormat(review.createdAt.toDate())}</CreatedAtText>
          )}
        </ContentBox>
      ))}
    </Wrapper>
  );
}

const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  padding: 16px;
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  height: 100%;
`;

const ContentBox = styled.div`
  padding: 8x;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--border-color);
  }
`;

const ReviewContent = styled.span`
  color: var(--sub-text-color-1);
  font-size: 16px;
`;

const QuoteWrapper = styled.span`
  display: inline-block;
  transform: scaleX(-1);
  height: 24px;
  margin-right: 8px;
`;

const CreatedAtText = styled.div`
  font-size: 12px;
  color: var(--sub-text-color-2);
  text-align: end;
`;

export default ReviewBox;
