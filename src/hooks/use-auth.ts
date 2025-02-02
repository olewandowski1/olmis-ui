import { axiosInstance, type AxiosInstanceError } from '@/config/axios';
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

/**
 * @name LoginResponse
 *
 * @description
 * The response object from the login endpoint.
 * @returns
 * The access token, token type, expiration time, scope, reference data user ID, and username.
 */
type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  referenceDataUserId: string;
  username: string;
};

/**
 * @name UserLoginResponse
 *
 * @description
 * The response object from the user login endpoint.
 * @returns
 * The unique identifier for the user, the username, the first name, the last name, the timezone, whether the user is active, additional data related to the user, and an array of role assignments for the user.
 */
type UserLoginResponse = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  timezone: string;
  active: boolean;
  extraData: { [key: string]: any };
  roleAssignments: {
    roleId: string;
  }[];
};

/**
 * @name useAuth
 *
 * @description
 * Custom hook for handling user authentication.
 * It uses useAuthStore for storing user and accessToken.
 *
 * @returns Object with user, accessToken, isAuthenticated, login and logout functions.
 */
export const useAuth = () => {
  const { user, accessToken, setUser, setAccessToken } = useAuthStore();
  const { t } = useTranslation('translation', { keyPrefix: 'auth.useAuth' });

  const loginMutation = useMutation<
    LoginResponse & UserLoginResponse,
    AxiosInstanceError,
    {
      username: string;
      password: string;
    }
  >({
    mutationFn: async ({ username, password }) => {
      const basicAuthHeader = `Basic ${btoa(`${import.meta.env.VITE_AUTH_SERVER_CLIENT_ID}:${import.meta.env.VITE_AUTH_SERVER_CLIENT_SECRET}`)}`;

      // Step 1: Fetch the access token
      const { data: loginResponse } = await axiosInstance.post<LoginResponse>(
        '/api/oauth/token?grant_type=password',
        { username, password },
        {
          headers: {
            Authorization: basicAuthHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Step 2: Set the access token in the store
      setAccessToken(loginResponse.access_token);

      // Step 3: Fetch user information using the referenceDataUserId
      const { data: userResponse } = await axiosInstance.get<UserLoginResponse>(
        `/api/users/${loginResponse.referenceDataUserId}`
      );

      return { ...loginResponse, ...userResponse };
    },
    onSuccess: async (data) => {
      setUser({
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        timezone: data.timezone,
        active: data.active,
        roleAssignments: data.roleAssignments,
      });
      toast.success(t('loginSuccess'));
    },
    onError: () => toast.error(t('loginError')),
  });

  const logoutMutation = useMutation<void, AxiosInstanceError>({
    mutationFn: async () => {
      await axiosInstance.post('/api/users/auth/logout');
      setAccessToken(null);
      setUser(null);
    },
    onError: () => toast.error(t('logoutError')),
  });

  return {
    user,
    accessToken,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};
