import * as apis from '../shared/services/searchService';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchResultBook from '../components/search/SearchBook';
import { useQuery } from '@tanstack/react-query';

function SearchBookPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const { data: searchResult, isLoading } = useQuery({
    queryKey: ['search', search],
    queryFn: async () => {
      if (!search) throw new Error('No Search Word');
      return await apis.searchBooks(search);
    },
    enabled: !!search,
  });

  const { data: searchResultCount } = useQuery({
    queryKey: ['search-count', search],
    queryFn: async () => {
      if (!search) throw new Error('No Search Word');
      return await apis.getSearchBookCount(search);
    },
    enabled: !!search,
  });

  return (
    <Wrapper>
      <SearchText>
        <strong>'{search}'</strong> 검색 결과 총{' '}
        <strong>{typeof searchResultCount === 'number' ? searchResultCount : 0}</strong>건
      </SearchText>
      {!isLoading && (
        <ResultList>
          {searchResult?.map((bookInfo) => (
            <SearchResultBook bookInfo={bookInfo} key={bookInfo.isbn} />
          ))}
        </ResultList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 952px;
  overflow: hidden;
  margin: auto;
  padding-top: calc(30px + var(--header-height));
`;

const SearchText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin: 10px 0px;
  overflow-wrap: break-word;
  margin: 10px 0;

  strong {
    font-weight: 700;
    font-size: 22px;

    &:first-of-type {
      color: var(--brand-color);
    }
  }
`;

const ResultList = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  background: var(--wrapper-color);
  border-radius: 18px;
  padding: 18px;
`;

export default SearchBookPage;
