// hooks/useTask.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../types/task';

export const useTask = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/task');
      return res.data.data;
    },
  });
};
