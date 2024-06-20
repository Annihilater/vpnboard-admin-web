'use client';

import { useState } from 'react';
import {
  postAdminNodeCreate,
  postAdminNodeGroupList,
  postAdminNodeList,
  postAdminNodeOpenApiDelete,
  postAdminNodeUpdate,
} from '@/services/api/admin';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import NodeForm from './node-form';

export default function NodeTable() {
  const [loading, setLoading] = useState(false);

  const [nodeParams, setNodeParams] = useState<API.ListNodeRequest>({
    page: 1,
    size: 50,
  });
  const { data, refetch } = useQuery({
    queryKey: ['postAdminNodeList', nodeParams],
    queryFn: async () => {
      const { data } = await postAdminNodeList(nodeParams);
      return data.data;
    },
  });

  const { data: groups } = useQuery({
    queryKey: ['postAdminNodeGroupList', 'all'],
    queryFn: async () => {
      const { data } = await postAdminNodeGroupList({
        size: 0,
      });
      return data.data.list;
    },
  });

  const columns: ColumnDef<API.Node>[] = [
    {
      accessorKey: 'name',
      header: '名称',
    },
    {
      accessorKey: 'protocol',
      header: '类型',
    },
    {
      accessorKey: 'address',
      header: '地址',
      cell: ({ row }) => {
        return `${row.original.address}:${row.original.port}`;
      },
    },
    {
      accessorKey: 'node_speed_limit',
      header: '限速',
    },
    {
      accessorKey: 'traffic_rate',
      header: '倍率',
    },
    {
      accessorKey: 'enabled',
      header: '状态',
      cell: ({ row }) => {
        return (
          <Switch
            checked={row.getValue('enabled')}
            onCheckedChange={async (checked) => {
              await postAdminNodeUpdate({
                ...row.original,
                id: row.original.id!,
                enabled: checked,
              });
              refetch();
            }}
          />
        );
      },
    },
    {
      accessorKey: 'node_group_id',
      header: '节点组',
      cell: ({ row }) =>
        groups?.find((group: API.NodeGroup) => group.id === row.getValue('node_group_id'))?.name,
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
            <NodeForm<API.Node>
              trigger='编辑'
              title='编辑节点'
              loading={loading}
              initialValues={row.original}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  await postAdminNodeUpdate({ ...row.original, id: row.original.id!, ...values });
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
                await postAdminNodeOpenApiDelete({
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
        <div className='flex justify-between'>
          <Select
            onValueChange={(value) => {
              setNodeParams({
                ...nodeParams,
                node_group_id: value === 'all' ? undefined : Number(value),
              });
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='节点组' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>全部</SelectItem>
                {groups?.map((group: API.NodeGroup) => (
                  <SelectItem key={group.id} value={String(group.id)}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <NodeForm<API.Node>
            trigger='新建'
            title='新建节点'
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await postAdminNodeCreate({ ...values, enabled: true } as API.Node);
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
        page: nodeParams.page,
        size: nodeParams.size,
        total: data?.total,
        onChange: (page, size) => {
          setNodeParams({
            ...nodeParams,
            page,
            size,
          });
        },
      }}
      operations={{
        remove: async (rowSelection) => {
          rowSelection.forEach(async (element) => {
            await postAdminNodeOpenApiDelete({
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
