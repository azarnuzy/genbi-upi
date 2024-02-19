import { api } from '@/lib/api';

import {
  TDataGetDepartmentsByIdResponse,
  TDataGetDepartmentsTagResponse,
} from '@/types/departments';

export const getDepartmentsTagsRequest =
  async (): Promise<TDataGetDepartmentsTagResponse> => {
    const { data } = await api.get(`v1/departments/tags`);

    return data;
  };

export const getDepartmentByIdRequest = async (
  id: string
): Promise<TDataGetDepartmentsByIdResponse> => {
  const { data } = await api.get(`v1/departments/${id}`);

  return data;
};
