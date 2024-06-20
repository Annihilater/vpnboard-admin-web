import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Invite() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>开启强制邀请</Label>
            <p className='text-xs text-muted-foreground'>开启后只有被邀请的用户才可以进行注册。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>邀请佣金百分比</Label>
            <p className='text-xs text-muted-foreground'>
              默认全局的佣金分配比例，你可以在用户管理单独配置单个比例。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' defaultValue={10} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>佣金仅首次发放</Label>
            <p className='text-xs text-muted-foreground'>
              开启后被邀请人首次支付时才会产生佣金，可以在用户管理对用户进行单独配置。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
