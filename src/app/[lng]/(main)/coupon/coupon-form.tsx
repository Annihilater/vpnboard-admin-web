import { useEffect, useState } from 'react';
import { postAdminProductList } from '@/services/api/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
});

interface CouponFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function CouponForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: CouponFormProps<T>) {
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

  const type = form.watch('type');

  const { data } = useQuery({
    queryKey: ['postAdminProductList'],
    queryFn: async () => {
      const { data } = await postAdminProductList();
      return data.data;
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
                      <Input placeholder='请输入优惠码名称' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>自定义优惠券码</FormLabel>
                    <FormControl>
                      <Input placeholder='自定义优惠券码(留空自动生成)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>优惠类型</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || 'amount'}
                        className='flex gap-2'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='amount' />
                          </FormControl>
                          <FormLabel className='font-normal'>按金额优惠</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='proportion' />
                          </FormControl>
                          <FormLabel className='font-normal'>按比例优惠</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{type === 'amount' ? '按金额优惠' : '按比例优惠'}</FormLabel>
                    <FormControl>
                      <Input placeholder='请输入值' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>优惠券有效期</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className='mr-2 size-4' />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'y-LL-dd')} -{' '}
                                  {format(field.value.to, 'y-LL-dd')}
                                </>
                              ) : (
                                format(field.value.from, 'y-LL-dd')
                              )
                            ) : (
                              <span>选择时间</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='range'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='count'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>最大使用次数</FormLabel>
                    <FormControl>
                      <Input placeholder='最大使用次数(为空则不限制)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='user_count'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>每个用户可使用次数</FormLabel>
                    <FormControl>
                      <Input placeholder='每个用户可使用次数(为空则不限制)' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='product'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>指定商品</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                        }}
                        defaultValue={field.value && String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='请选择商品' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.list?.map((item: API.Product) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='total'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>生成数量</FormLabel>
                    <FormControl>
                      <Input placeholder='每个用户可使用次数(为空则不限制)' {...field} />
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
