import { axiosInstance } from '@/config/axios';
import { queryKeys } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

type ApiUsersResponse = {};

const fetchUsers = async () => {
  const { data: apiUsersResponse } =
    await axiosInstance.get<ApiUsersResponse>(`/api/users`);

  return apiUsersResponse;
};

export const useUsers = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: [queryKeys.users],
    queryFn: () => fetchUsers(),
  });

  return { users, isLoading };
};
