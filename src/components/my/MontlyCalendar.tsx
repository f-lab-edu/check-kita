import Calendar from 'react-calendar';
import * as api from '../../shared/services/myBookService';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { convertDateMapKey, convertDateToDisplayFormat } from '../../shared/utils';
import AddIcon from '@mui/icons-material/Add';
import DetailBook from './DetailBook';
import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MyBook } from '../../shared/interfaces/book.interface';

const ITEMS_PER_PAGE = 4;

function MontlyCalendar() {
  const { user } = useAuth();
  const TODAY = new Date();
  const viewMonth = TODAY.getMonth() + 1;
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewedData, setViewedData] = useState<MyBook[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['calendar', viewMonth],
    queryFn: async () => {
      if (!user) return;
      return await api.getMonthlyRecords(user.id, viewMonth);
    },
  });

  const renderRecords = ({ date }: { date: Date }) => {
    if (isLoading) return;

    const convertedKey = convertDateMapKey(date);

    if (data?.has(convertedKey)) {
      const records = data.get(convertedKey);
      const cellHeight = document.querySelector('button.react-calendar__tile')?.clientHeight;

      // (셀 높이 - 날짜 높이 - gap - 추가개수높이) / (한 개의 높이 + gap + 패딩)
      const availableCount = Math.floor(((cellHeight as number) - 24 - 2 - 20) / (18 + 4 + 2));

      return (
        <div className="tile-content-wrapper">
          {records &&
            records.map((record, index) => {
              const { title, readingRecord } = record;

              if (index < availableCount) {
                return (
                  <Tooltip
                    label={<DetailBook record={record} />}
                    shouldWrapChildren
                    key={`tile-${date}-${index}`}
                    bg="transparent"
                  >
                    <div className={`tile-content ${readingRecord?.recordType}`}>{title}</div>
                  </Tooltip>
                );
              }
            })}
          {records && records.length > availableCount && (
            <div className="more-button">
              <AddIcon />
              {records.length - availableCount}
            </div>
          )}
        </div>
      );
    }
  };

  const onClickDay = (value: Date) => {
    const changedDate = new Date(value);
    setSelectedDate(changedDate);
  };

  const getSlicedCurrentPage = (target: MyBook[], currentPage: number) => {
    if (currentPage < 1) return [];

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return target.slice(startIndex, startIndex + 4);
  };

  useEffect(() => {
    if (!data) return;

    let changed = data.get(convertDateMapKey(selectedDate));
    changed = changed ? changed : [];
    changed = getSlicedCurrentPage(changed, currentPage);

    setViewedData(changed);
  }, [data, selectedDate, currentPage]);

  if (isLoading) return;

  return (
    <Wrapper>
      <Calendar
        onClickDay={onClickDay}
        defaultActiveStartDate={TODAY}
        showNavigation={false}
        tileContent={renderRecords}
      />
      <CalendarDetailRecord>
        <SelectedDate>
          <strong>{convertDateToDisplayFormat(selectedDate)}</strong> 기록 현황
        </SelectedDate>
        <Flex
          flexDirection={'column'}
          gap={'12px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          minHeight={'484px'}
        >
          {!!data && (
            <DateRecords>
              {!!viewedData &&
                viewedData?.map((record, index) => (
                  <DetailBook record={record} key={`DetailBook-${index}`} />
                ))}
            </DateRecords>
          )}
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
              isDisabled={ITEMS_PER_PAGE > Number(viewedData?.length)}
            >
              <ChevronRightIcon />
            </Button>
          </Flex>
        </Flex>
      </CalendarDetailRecord>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  border-radius: 10px;
  background: var(--wrapper-color);
`;

const CalendarDetailRecord = styled.div`
  font-family: 'HakgyoansimWooju' !important;
  width: 100%;
  min-width: 350px;
  max-width: 700px;
  height: 100%;
`;

const SelectedDate = styled.div`
  padding: 16px;
  font-size: 18px;
  line-height: 24px;
  border-bottom: 1px solid var(--border-color) !important;

  & > strong {
    font-weight: 700;
  }
`;

const DateRecords = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  gap: 8px;
  padding: 8px;
`;

export default MontlyCalendar;
