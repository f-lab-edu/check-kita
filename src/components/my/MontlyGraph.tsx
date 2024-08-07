import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/myBookService';

function MontlyGraph() {
  const { data, isLoading } = useQuery({
    queryKey: ['montlyCount'],
    queryFn: async () => {
      const nowMonth = new Date().getMonth() + 1;
      const viewMonth = [nowMonth - 2, nowMonth - 1, nowMonth];
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

  return <div>그래프{!!data && data[2]}</div>;
}

export default MontlyGraph;
