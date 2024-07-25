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

  return (
    <Wrapper>
      <SearchText>'{search}' 검색 결과</SearchText>
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
  height: 100%;
  overflow: hidden;
  margin: auto;
`;

const SearchText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: rgb(48, 53, 56);
  margin: 10px 0px;
  overflow-wrap: break-word;
  margin: 10px 0;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SearchBookPage;
