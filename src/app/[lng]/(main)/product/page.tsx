'use client';

import { useState } from 'react';
import {
  postAdminNodeGroupList,
  postAdminNodeList,
  postAdminProductCreate,
  postAdminProductList,
  postAdminProductOpenApiDelete,
  postAdminProductUpdate,
} from '@/services/api/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import ProductForm from './product-form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  remarks: z.string().optional(),
  node_groups: z.array(z.number()).optional(),
  nodes: z.array(z.number()).optional(),
});

export default function Page() {
  const { data, refetch } = useQuery({
    queryKey: ['postAdminProductList'],
    queryFn: async () => {
      const { data } = await postAdminProductList();
      return data.data;
    },
  });
  const { data: nodes } = useQuery({
    queryKey: ['postAdminNodeList', 'all'],
    queryFn: async () => {
      const { data } = await postAdminNodeList({
        size: 0,
      });
      return data.data.list;
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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<API.Product>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const action = product?.id ? postAdminProductUpdate : postAdminProductCreate;
    const payload = product?.id ? { ...product, id: product.id, ...values } : values;

    const { data } = await action(payload as any);
    if (data.code === 0) {
      refetch();
      toast.success(product?.id ? '更新成功' : '创建成功');
      setOpen(false);
      setProduct(undefined);
      form.reset();
    }
    setLoading(false);
  }

  const columns: ColumnDef<API.Product>[] = [
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
            <ProductForm<API.UpdateProductRequest>
              trigger='编辑'
              title='编辑商品'
              loading={loading}
              initialValues={{
                ...row.original,
                id: row.original.id!,
                node_groups: row.original.node_groups?.map((item) => item.id) as number[],
                nodes: row.original.nodes?.map((item) => item.id) as number[],
              }}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  await postAdminProductUpdate({
                    ...values,
                    id: row.original.id!,
                  });
                  toast.success('更新成功');
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
                await postAdminProductOpenApiDelete({
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
        <div className='flex items-center justify-between'>
          <h1>商品列表</h1>
          <ProductForm<API.CreateProductRequest>
            trigger='新建'
            title='新建商品'
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await postAdminProductCreate(values);
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
        size: data?.list?.length,
        total: data?.list?.length,
      }}
      operations={{
        remove: async (rowSelection) => {
          rowSelection.forEach(async (element) => {
            await postAdminProductOpenApiDelete({
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
