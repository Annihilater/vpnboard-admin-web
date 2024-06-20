import { useEffect, useState } from 'react';
import { postAdminNodeGroupList, postAdminNodeList } from '@/services/api/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
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
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  remarks: z.string().optional(),
  node_groups: z.array(z.number()).optional(),
  nodes: z.array(z.number()).optional(),
});

interface ProductFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function ProductForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: ProductFormProps<T>) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);
    if (bool) setOpen(false);
  }

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size='sm'
          onClick={() => {
            form.reset();
            setOpen(true);
          }}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className='-mx-6 h-[calc(100vh-48px-36px-36px)]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-6 pt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名称</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='remarks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='node_groups'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>节点组</FormLabel>
                    <FormControl>
                      <Accordion type='single' collapsible className='w-full'>
                        {groups?.map((group: API.NodeGroup) => {
                          const value = field.value || [];
                          return (
                            <AccordionItem key={group.id} value={String(group.id)}>
                              <AccordionTrigger>
                                <div className='flex items-center gap-2'>
                                  <Checkbox
                                    checked={value.includes(group.id!)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...value, group.id])
                                        : field.onChange(
                                            value.filter((value: number) => value !== group.id),
                                          );
                                    }}
                                  />
                                  <Label>{group.name}</Label>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className='list-disc [&>li]:mt-2'>
                                  {nodes
                                    .filter((node: API.Node) => node.node_group_id === group.id)
                                    .map((node: API.Node) => {
                                      return (
                                        <li
                                          key={node.id}
                                          className='flex items-center justify-between *:flex-1 '
                                        >
                                          <span>{node.name}</span>
                                          <span>
                                            {node.address}:{node.port}
                                          </span>
                                          <span className='text-right'>{node.protocol}</span>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nodes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>节点</FormLabel>
                    <FormControl>
                      <div className='flex flex-col gap-2'>
                        {nodes
                          ?.filter((node: API.Node) => !node.node_group_id)
                          ?.map((node: API.Node) => {
                            const value = field.value || [];
                            return (
                              <div className='flex items-center gap-2' key={node.id}>
                                <Checkbox
                                  checked={value.includes(node.id!)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...value, node.id])
                                      : field.onChange(
                                          value.filter((value: number) => value !== node.id),
                                        );
                                  }}
                                />
                                <Label className='flex w-full items-center justify-between *:flex-1'>
                                  <span>{node.name}</span>
                                  <span>
                                    {node.address}:{node.port}
                                  </span>
                                  <span className='text-right'>{node.protocol}</span>
                                </Label>
                              </div>
                            );
                          })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className='pt-3'>
          <Button
            variant='outline'
            disabled={loading}
            onClick={() => {
              setOpen(false);
            }}
          >
            取消
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && <Icon icon='mdi:loading' className='mr-2 animate-spin' />} 确定
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
