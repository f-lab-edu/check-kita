import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/memoService';
import styled from 'styled-components';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { convertDateToDisplayFormat } from '../../shared/utils';
import { useAuth } from '../../contexts/AuthContext';

function MemoBox() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['all memo'],
    queryFn: async () => {
      if (!user) return;
      return await api.getAllMemos(user.id);
    },
  });

  return (
    <Wrapper>
      <Title>메모 모아 보기</Title>
      {data?.map((memo, index) => (
        <ContentBox key={`ContentBox-${index}`}>
          <div>
            <QuoteWrapper>
              <FormatQuoteIcon fontSize="small" />
            </QuoteWrapper>
            <MemoContent>{memo.content}</MemoContent>
          </div>
          {memo.createdAt && (
            <CreatedAtText>{convertDateToDisplayFormat(memo.createdAt.toDate())}</CreatedAtText>
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

const MemoContent = styled.span`
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

export default MemoBox;
