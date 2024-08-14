import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/myBookService';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styled from 'styled-components';

Chart.register(...registerables);

function MontlyGraph() {
  const thisMonth = new Date().getMonth() + 1;
  const viewMonth = [thisMonth - 2, thisMonth - 1, thisMonth];

  const { data, isLoading } = useQuery({
    queryKey: ['montlyCount'],
    queryFn: async () => {
      let results = [];

      for (const month of viewMonth) {
        const result = await api.getMonthlyRecordCount(month);
        results.push(result);
      }
      return results;
    },
    retry: false,
    staleTime: 0,
  });

  const config = {
    labels: viewMonth.map((month) => `${month}월`),
    datasets: [
      {
        data: data || [0, 0, 0],
        backgroundColor: ['rgba(200, 200, 200, 0.6)', 'rgba(200, 200, 200, 0.6)', '#956aff'],
        borderColor: ['rgba(200, 200, 200, 0.8)', 'rgba(200, 200, 200, 0.8)', '#7851e7'],
        borderWidth: 1,
        barPercentage: 0.3,
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem: { raw: unknown }) {
              return `${tooltipItem.raw}회`;
            },
          },
        },
      },
    },
  };

  const SummaryReport = () => {
    const differenceThisAndLastMonth = viewMonth[2] - viewMonth[1];
    let report = '';

    if (differenceThisAndLastMonth) {
      report = `지난 달보다 ${differenceThisAndLastMonth}회 적게 기록하셨습니다.`;
    } else if (differenceThisAndLastMonth === 0) {
      report = `지난 달과 동일한 기록입니다.`;
    } else {
      report = `지난 달보다 ${-differenceThisAndLastMonth}회 더 기록하셨습니다.`;
    }

    return <SummaryText>{report}</SummaryText>;
  };

  // TODO: 로딩 컴포넌트 공통으로 빼기
  if (isLoading) return <div>로딩중</div>;

  return (
    <GraphWrapper>
      <TextBox>
        <Title>이달의 기록 바로 보기</Title>
        <SummaryReport />
      </TextBox>
      <Bar data={config} options={config.options} />
    </GraphWrapper>
  );
}

const TextBox = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.span`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
`;

const SummaryText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: var(--sub-text-color-2);
  font-weight: 500;
`;

const GraphWrapper = styled.div`
  padding: 16px;
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
`;

export default MontlyGraph;
