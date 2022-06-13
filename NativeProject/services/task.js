import {createApi} from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({baseUrl} = {baseUrl: ''}) =>
  async ({url, method, body, params}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: {'content-type': 'application/json'},
      });
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: axiosBaseQuery({
    //fill your ip here+port\connect your phone
//   baseUrl: 'http://xxx.xxx.xxx.xxx:3009',
  }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => {
        return {url: '/tasks', method: 'GET'};
      },
      providesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: body => ({
        url: `/tasks/${body._id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
    }),

    createTask: builder.mutation({
      query: body => {
        console.log('create task', body);
        return {
          url: `/tasks/`,
          method: 'POST',
          body,
        };
      },

      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation({
      query: _id => {
        return {
          url: `/tasks/${_id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Task'],
    }),
  }),
});

export default taskApi;

export const {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = taskApi;
