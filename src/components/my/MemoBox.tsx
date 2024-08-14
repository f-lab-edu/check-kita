import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/memoService';
import { useEffect } from 'react';

function MemoBox() {
  const { data, isLoading } = useQuery({
    queryKey: ['all memo'],
    queryFn: () => api.getAllMemos(),
  });

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  return <div></div>;
}

export default MemoBox;
