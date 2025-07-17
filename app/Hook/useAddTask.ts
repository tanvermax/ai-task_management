// hooks/useAddTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../types/task'; // adjust path as needed

type NewTask = Omit<Task, '_id'>;

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: NewTask) => {
      const res = await axios.post('/api/task', newTask);
      return res.data.data; // assuming new task is returned
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // 🔄 Refetch tasks
    },
  });
};
