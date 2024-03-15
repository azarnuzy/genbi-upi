import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  addDepartmentRequest,
  deleteDepartmentRequest,
  getDepartmentByIdRequest,
  getDepartmentsTagsRequest,
  getOptionDepartmentsRequest,
  updateDepartmentRequest,
} from '@/hooks/departments/request';

import { TMetaErrorResponse } from '@/types';
import {
  TAddDepartmentPayload,
  TDataAddDepartmentResponse,
  TDataDeleteDepartmentResponse,
  TDataGetDepartmentOptionResponse,
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
  TDataUpdateDepartmentResponse,
  TUpdateDepartmentPayload,
} from '@/types/departments';

export const useGetDepartmentById = ({
  id,
}: {
  id: string;
}): UseQueryResult<TDataGetDepartmentsByIdResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['get-department-by-id', id],
    queryFn: async () => await getDepartmentByIdRequest(id),
  });

export const useGetDepartmentsTags = (): UseQueryResult<
  TDataGetDepartmentsTagResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-department-tags'],
    queryFn: async () => await getDepartmentsTagsRequest(),
  });

export const useGetOptionDepartments = (): UseQueryResult<
  TDataGetDepartmentOptionResponse,
  TMetaErrorResponse
> =>
  useQuery({
    queryKey: ['get-option-departments'],
    queryFn: async () => await getOptionDepartmentsRequest(),
  });

export const useAddDepartments = (): UseMutationResult<
  TDataAddDepartmentResponse,
  TMetaErrorResponse,
  TAddDepartmentPayload
> => {
  return useMutation<
    TDataAddDepartmentResponse,
    TMetaErrorResponse,
    TAddDepartmentPayload
  >({
    mutationKey: ['add-department'],
    mutationFn: async (payload: TAddDepartmentPayload) => {
      const response = await addDepartmentRequest(payload);
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useUpdateDepartment = (): UseMutationResult<
  TDataUpdateDepartmentResponse,
  TMetaErrorResponse,
  { payload: TUpdateDepartmentPayload; id: number }
> => {
  return useMutation<
    TDataUpdateDepartmentResponse,
    TMetaErrorResponse,
    { payload: TUpdateDepartmentPayload; id: number }
  >({
    mutationKey: ['update-department'],
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: TUpdateDepartmentPayload;
      id: number;
    }) => {
      const response = await updateDepartmentRequest({ payload, id });
      if (!response) {
        throw new Error('Invalid response');
      }
      return response;
    },
  });
};

export const useDeleteDepartment = (): UseMutationResult<
  TDataDeleteDepartmentResponse,
  TMetaErrorResponse,
  number
> => {
  return useMutation<TDataDeleteDepartmentResponse, TMetaErrorResponse, number>(
    {
      mutationKey: ['delete-department'],
      mutationFn: async (id) => {
        const response = await deleteDepartmentRequest(id);
        if (!response) {
          throw new Error('Invalid response');
        }
        return response;
      },
    }
  );
};
