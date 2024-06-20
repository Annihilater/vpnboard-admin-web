'use client';

import { useState } from 'react';
import {
  postAdminNodeGroupCreate,
  postAdminNodeGroupList,
  postAdminNodeGroupOpenApiDelete,
  postAdminNodeGroupUpdate,
} from '@/services/api/admin';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { toast } from 'sonner';
import { z } from 'zod';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import GroupForm from './group-form';

export default function GroupTable() {
  const { data, refetch } = useQuery({
    queryKey: ['postAdminNodeGroupList'],
    queryFn: async () => {
      const { data } = await postAdminNodeGroupList({
        size: 0,
      });
      return data.data;
    },
  });

  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<API.Node>[] = [
    {
      accessorKey: 'name',
      header: '名称',
    },
    {
      accessorKey: 'remarks',
      header: '描述',
    },
    {
      accessorKey: 'updated_at',
      header: '更新时间',
      cell: ({ row }) => formatDate(row.getValue('updated_at'), 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: () => <div className='text-right'>操作</div>,
      cell: ({ row }) => {
        return (
          <div className='flex justify-end gap-2'>
            <GroupForm<API.NodeGroup>
              trigger='编辑'
              title='修改节点组'
              loading={loading}
              initialValues={row.original}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  await postAdminNodeGroupUpdate({
                    ...row.original,
                    id: row.original.id!,
                    ...values,
                  });
                  toast.success('创建成功');
                  refetch();
                  setLoading(false);
                  return true;
                } catch (error) {
                  setLoading(false);
                  return false;
                }
              }}
            />
            <DeleteButton
              trigger='删除'
              title='你确定要删除吗?'
              description='删除后数据将无法恢复，请谨慎操作'
              onConfirm={async () => {
                await postAdminNodeGroupOpenApiDelete({
                  id: row.original.id!,
                });
                toast.success('删除成功');
                refetch();
              }}
              onCancelText='取消'
              onConfirmText='确认'
            />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      header={
        <div className='flex justify-end'>
          <GroupForm<API.NodeGroup>
            trigger='新建'
            title='创建节点组'
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await postAdminNodeGroupCreate(values);
                toast.success('创建成功');
                refetch();
                setLoading(false);
                return true;
              } catch (error) {
                setLoading(false);
                return false;
              }
            }}
          />
        </div>
      }
      columns={columns}
      data={data?.list || []}
      pagination={{
        page: 1,
        size: data?.total,
        total: data?.total,
      }}
      operations={{
        remove: async (rowSelection) => {
          rowSelection.forEach(async (element) => {
            await postAdminNodeGroupOpenApiDelete({
              id: element.id!,
            });
          });
          toast.success('删除成功');
          refetch();
        },
      }}
    />
  );
}
