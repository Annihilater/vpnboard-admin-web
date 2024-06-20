'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Footer from '@/layout/footer';
import HeaderLogo from '@/layout/header-logo';
import { postUserUserInfo } from '@/services/api/user';
import { userState } from '@/stores/user';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { useMount } from 'ahooks';
import { deleteCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const routers = [
  {
    name: '仪表盘',
    href: '',
  },
  {
    label: '设置',
  },
  {
    name: '系统配置',
    href: '/system',
  },
  {
    name: '支付配置',
    href: '/payment',
  },
  {
    label: '服务器',
  },
  {
    name: '节点管理',
    href: '/node',
  },
  {
    label: '财务',
  },
  {
    name: '商品管理',
    href: '/product',
  },
  {
    name: '订单管理',
    href: '/order',
  },
  {
    name: '优惠券管理',
    href: '/coupon',
  },
  {
    label: '用户',
  },
  {
    name: '用户管理',
    href: '/user',
  },
  {
    name: '公告管理',
    href: '/notice',
  },
  {
    name: '工单管理',
    href: '/ticket',
  },
  {
    name: '文档管理',
    href: '/knowledge',
  },
];
export default function MainLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useMount(async () => {
    try {
      const { data } = await postUserUserInfo({
        skipErrorHandler: true,
      });
      userState.userInfo = data.data;
      setLoading(false);
    } catch (error) {
      deleteCookie('Authorization');
      router.push(`/${lng}/auth`);
    }
  });

  if (loading)
    return (
      <div className='fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center'>
        <Icon icon='mdi:loading' className='size-12 animate-spin text-primary' />
        <p className='ml-2 text-primary'>Loading...</p>
      </div>
    );

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-6'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <HeaderLogo />
          </div>
          <div className='flex-1'>
            <nav className='grid items-start gap-1 px-2 text-sm font-medium lg:px-4'>
              {routers.map((router) => {
                if (router.label) {
                  return (
                    <span className='text-muted-foreground' key={router.label}>
                      {router.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={`/${lng}${router.href}`}
                    href={`/${lng}${router.href}`}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                      pathname === `/${lng}${router.href}`
                        ? 'bg-muted text-primary'
                        : 'text-foreground',
                    )}
                  >
                    {router.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className='flex h-screen flex-col'>
        <header className='flex h-16 shrink-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                <Icon icon='mdi:menu' className='size-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col '>
              <ScrollArea>
                <nav className='grid gap-2 text-sm font-medium '>
                  {routers.map((router) => {
                    if (router.label) {
                      return (
                        <span className='text-muted-foreground' key={router.label}>
                          {router.label}
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={router.href}
                        href={`/${lng}${router.href}`}
                        className={cn(
                          'flex items-center gap-4 rounded-xl px-4 py-2 hover:text-foreground',
                          pathname === `/${lng}${router.href}`
                            ? 'bg-muted text-primary'
                            : 'text-foreground',
                        )}
                      >
                        {router.name}
                      </Link>
                    );
                  })}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1'></div>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <Icon icon='mdi:user' className='size-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              deleteCookie('Authorization');
              router.push(`/${lng}/auth`);
            }}
          >
            退出登录
          </Button>
        </header>
        <ScrollArea className='relative flex flex-col gap-4 lg:gap-6 '>
          <main className='min-h-[calc(100dvh-162px-env(safe-area-inset-top))] p-4 lg:min-h-[calc(100dvh-162px)] lg:p-6'>
            {children}
          </main>
          <Footer className='p-4 lg:p-6' />
        </ScrollArea>
      </div>
    </div>
  );
}
