import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Telegram() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>机器人Token</Label>
            <p className='text-xs text-muted-foreground'>请输入由Botfather提供的token。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='0000000000:xxxxxxxxx_xxxxxxxxxxxxxxx' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>开启机器人通知</Label>
            <p className='text-xs text-muted-foreground'>
              开启后bot将会对绑定了telegram的管理员和用户进行基础通知。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>群组地址</Label>
            <p className='text-xs text-muted-foreground'>
              填写后将会在用户端展示，或者被用于需要的地方。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='https://t.me/xxxxxx' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
