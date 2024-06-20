'use client';

import {
  postAdminConfigGetSiteConfig,
  postAdminConfigUpdateSiteConfig,
} from '@/services/api/admin';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Site() {
  const { data, refetch } = useQuery<API.GetSiteConfigResponse>({
    queryKey: ['postAdminConfigGetSiteConfig'],
    queryFn: async () => {
      const { data } = await postAdminConfigGetSiteConfig();
      return data.data;
    },
  });
  async function updateSite(key: string, value: any) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await postAdminConfigUpdateSiteConfig({
        ...data,
        [key]: value,
      });
      toast.success('保存成功');
      refetch();
    } catch (error) {}
  }
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>LOGO</Label>
            <p className='text-xs text-muted-foreground'>用于显示需要LOGO的地方。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input
              placeholder='请输入LOGO URL，末尾不要/'
              defaultValue={data?.site_logo}
              onBlur={(e) => {
                updateSite('site_logo', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>站点名称</Label>
            <p className='text-xs text-muted-foreground'>用于显示需要站点名称的地方。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input
              placeholder='请输入站点名称'
              defaultValue={data?.site_name}
              onBlur={(e) => {
                updateSite('site_name', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>站点描述</Label>
            <p className='text-xs text-muted-foreground'>用于显示需要站点描述的地方</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input
              placeholder='请输入站点描述'
              defaultValue={data?.site_desc}
              onBlur={(e) => {
                updateSite('site_desc', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>站点网址</Label>
            <p className='text-xs text-muted-foreground'>
              当前网站最新网址，将会在邮件等需要用于网址处体现。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input
              placeholder='请输入站点URL，末尾不要/'
              defaultValue={data?.host}
              onBlur={(e) => {
                updateSite('host', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>用户条款(TOS)URL</Label>
            <p className='text-xs text-muted-foreground'>用于跳转到用户条款(TOS)</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input
              placeholder='请输入到用户条款URL，末尾不要/'
              defaultValue={data?.tos_url}
              onBlur={(e) => {
                updateSite('tos_url', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>货币单位</Label>
            <p className='text-xs text-muted-foreground'>
              仅用于展示使用，更改后系统中所有的货币单位都将发生变更。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='CNY' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>货币符号</Label>
            <p className='text-xs text-muted-foreground'>
              仅用于展示使用，更改后系统中所有的货币单位都将发生变更。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='¥' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
