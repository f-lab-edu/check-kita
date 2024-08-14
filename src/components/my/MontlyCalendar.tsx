import Calendar from 'react-calendar';
import * as api from '../../shared/services/myBookService';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useState } from 'react';
import { convertDateMapKey, convertDateToDisplayFormat } from '../../shared/utils';
import AddIcon from '@mui/icons-material/Add';
import DetailBook from './DetailBook';

function MontlyCalendar() {
  const TODAY = new Date();
  const viewMonth = TODAY.getMonth() + 1;
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const { data, isLoading } = useQuery({
    queryKey: ['calendar', viewMonth],
    queryFn: () => api.getMonthlyRecords(viewMonth),
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
                  <div
                    className={`tile-content ${readingRecord?.recordType}`}
                    key={`tile-${date}-${index}`}
                  >
                    {title}
                  </div>
                );
              }
            })}
          {records && !!(records.length > availableCount) && (
            <div className="more-button">
              <AddIcon fontSize="12" />
              {records.length - availableCount}
            </div>
          )}
        </div>
      );
    }
  };

  const onClickDay = (value: Date) => {
    setSelectedDate(value);
  };

  return (
    <div>
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
        {data && (
          <DateRecords>
            {/* TODO: data 개수 많아지면 어떻게 할 지 고민하기 */}
            {!!data.get(convertDateMapKey(selectedDate)) &&
              data
                .get(convertDateMapKey(selectedDate))
                ?.map((record, index) => (
                  <DetailBook record={record} key={`DetailBook=${index}`} />
                ))}
          </DateRecords>
        )}
      </CalendarDetailRecord>
    </div>
  );
}

const CalendarDetailRecord = styled.div`
  border-radius: 0 0 10px 10px;
  background: var(--wrapper-color);
  font-family: 'HakgyoansimWooju' !important;
  width: 100%;
  min-width: 350px;
  max-width: 700px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  grid-auto-rows: 1fr;

  gap: 8px;
  padding: 8px;
`;

export default MontlyCalendar;
