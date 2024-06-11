import { useEffect, useState } from 'react';
import * as apis from '../shared/apis';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SearchBook } from '../shared/interfaces/book.interface';
import SearchResultBook from '../components/search/SearchBook';

function SearchBookPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const [searchResult, setSearchResult] = useState<SearchBook[]>([]);

  useEffect(() => {
    if (search) {
      apis.searchBooks(search).then((res) => {
        console.log(res);
        setSearchResult(res);
      });
    }
  }, [search]);

  return (
    <Wrapper>
      <SearchText>'{search}' 검색 결과</SearchText>
      <ResultList>
        {searchResult.map((bookInfo) => (
          <SearchResultBook bookInfo={bookInfo} key={bookInfo.isbn} />
        ))}
      </ResultList>
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

const SearchText = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: rgb(48, 53, 56);
  margin: 10px 0px;
  overflow-wrap: break-word;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SearchBookPage;
