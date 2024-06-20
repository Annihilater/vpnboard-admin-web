'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postPublicUserLogin } from '@/services/api/public';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useLocalStorageState } from 'ahooks';
import CryptoJS from 'crypto-js';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { setCookie } from '@/lib/cookies';
import useMounted from '@/hooks/useMounted';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const FormSchema = z.object({
  user_name: z.string(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export default function Login({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();

  const [initialValues, setInitialValues] = useLocalStorageState<
    API.LoginRequest & { remember?: boolean }
  >('admin-login-user');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const params = {
      ...data,
      password:
        data?.password === initialValues?.password
          ? data?.password
          : CryptoJS.MD5(data?.password!).toString(),
    }
    const result = await postPublicUserLogin(params);
    if (result.data.code === 0) {
      setCookie('Authorization', result.data.data.token);
      setInitialValues(data.remember ? {
        ...params,
        remember: true,
      } : undefined);
      toast.success('登录成功');
      router.replace(`/${lng}`);
    }
  }
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px)] items-center justify-center '>
      <Card className='mx-auto max-w-sm flex-1'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>登录</CardTitle>
          <CardDescription>立刻开启激动的极致互联网体验</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <FormField
                control={form.control}
                name='user_name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='电子邮箱' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder='密码' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem className='flex items-end gap-2'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='leading-none'>
                      <FormLabel>记住密码</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={loading}>
                {loading && <Icon icon='mdi:loading' className='animate-spi mr-2' />}
                登录
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
