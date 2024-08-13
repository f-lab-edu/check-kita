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
        backgroundColor: ['rgba(200, 200, 200, 0.6)', 'rgba(200, 200, 200, 0.6)', 'tomato'],
        borderColor: ['rgba(200, 200, 200, 0.8)', 'rgba(200, 200, 200, 0.8)', 'red'],
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
    <div>
      <Title>이달의 기록 현황!</Title>
      {SummaryReport()}
      <Bar data={config} options={config.options} />
    </div>
  );
}

const Title = styled.div``;

const SummaryText = styled.div``;

export default MontlyGraph;