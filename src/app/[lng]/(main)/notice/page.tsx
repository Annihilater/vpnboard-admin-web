'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import NoticeForm from './notice-form';

export default function Page() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'enable',
      header: '启用',
      cell: ({ row }) => {
        return <Switch checked={row.getValue('enabled')} />;
      },
    },
    {
      accessorKey: 'title',
      header: '标题',
    },
    {
      accessorKey: 'context',
      header: '公告内容',
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
            <Button>编辑</Button>
            <DeleteButton
              trigger='删除'
              title='你确定要删除吗?'
              description='删除后数据将无法恢复，请谨慎操作'
              onConfirm={async () => {}}
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
        <div className='flex items-center justify-between'>
          <h1>公告列表</h1>
          <NoticeForm
            trigger='新建'
            title='新建公告'
            onSubmit={async () => {
              return true;
            }}
          />
        </div>
      }
      columns={columns}
      data={[]}
      pagination={{
        page: 1,
        size: 0,
        total: 0,
      }}
      operations={{
        remove: async (rowSelection) => {},
      }}
    />
  );
}
