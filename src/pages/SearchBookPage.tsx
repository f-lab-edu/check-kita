import * as apis from '../shared/services/searchService';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchResultBook from '../components/search/SearchBook';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Tab, TabList, Tabs, useDisclosure } from '@chakra-ui/react';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CustomAddBook from '../components/search/CustomAddBook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

const ITEMS_PER_PAGE = 5;

function SearchBookPage() {
  const selectedTabStyle = { color: 'white', bg: 'brand.500' };
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: searchResult, isLoading } = useQuery({
    queryKey: ['search', search, currentPage],
    queryFn: async () => {
      if (!search) throw new Error('No Search Word');

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;

      return await apis.searchBooks(search, ITEMS_PER_PAGE, startIndex);
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
      <TextWrapper>
        <SearchText>
          <strong>'{search}'</strong> 검색 결과 총 <strong>{searchResultCount}</strong>건
        </SearchText>
        <Button variant="clear" onClick={onOpen}>
          <SearchOffIcon fontSize="small" />
          원하는 책이 없으신가요? 직접 입력하기
        </Button>
        <CustomAddBook onClose={onClose} isOpen={isOpen} />
      </TextWrapper>
      {!isLoading && (
        <ResultList>
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab _selected={selectedTabStyle}>정확도순</Tab>
              <Tab _selected={selectedTabStyle}>출간일순</Tab>
            </TabList>
          </Tabs>
          <Flex flexDirection={'column'} gap={'12px'} alignItems={'center'}>
            <Flex flexDirection={'column'}>
              {searchResult?.map((bookInfo) => (
                <SearchResultBook bookInfo={bookInfo} key={bookInfo.isbn} />
              ))}
            </Flex>
            <Flex alignItems={'center'}>
              <Button
                variant="goast"
                size={'mdIcon'}
                isDisabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
                }}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="goast"
                size={'mdIcon'}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                isDisabled={ITEMS_PER_PAGE > Number(searchResult?.length)}
              >
                <ChevronRightIcon />
              </Button>
            </Flex>
          </Flex>
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

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  min-height: 550px;
  display: flex;
  flex-direction: column;
  background: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  padding: 18px;
`;

export default SearchBookPage;
