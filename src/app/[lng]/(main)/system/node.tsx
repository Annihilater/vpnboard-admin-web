import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Node() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>通讯密钥</Label>
            <p className='text-xs text-muted-foreground'>
              节点通讯的密钥，以便数据不会被他人获取。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>节点拉取动作轮询间隔</Label>
            <p className='text-xs text-muted-foreground'>节点从面板获取数据的间隔频率。(单位秒)</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' defaultValue={60} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>节点推送动作轮询间隔</Label>
            <p className='text-xs text-muted-foreground'>节点推送数据到面板的间隔频率。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' defaultValue={60} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
