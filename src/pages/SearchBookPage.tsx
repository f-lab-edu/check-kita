import * as apis from '../shared/services/searchService';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchResultBook from '../components/search/SearchBook';
import { useQuery } from '@tanstack/react-query';
import { Tab, TabList, Tabs } from '@chakra-ui/react';

function SearchBookPage() {
  const selectedTabStyle = { color: 'white', bg: 'brand.500' };

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
      if (!search) return '0';

      const count = await apis.getSearchBookCount(search);
      if (count === 100) return '+99';

      return String(count);
    },
    enabled: !!search,
  });

  return (
    <Wrapper>
      <SearchText>
        <strong>'{search}'</strong> 검색 결과 총 <strong>{searchResultCount}</strong>건
      </SearchText>
      {!isLoading && (
        <ResultList>
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab _selected={selectedTabStyle}>정확도순</Tab>
              <Tab _selected={selectedTabStyle}>출간일순</Tab>
            </TabList>
          </Tabs>
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
  padding: calc(30px + var(--header-height)) 20px 0;
`;

const SearchText = styled.div`
  font-weight: 500;
  font-size: 16px;
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
