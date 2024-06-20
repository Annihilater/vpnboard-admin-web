import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Epay() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>显示名称</Label>
            <p className='text-xs text-muted-foreground'>用于前端显示使用</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>图标URL(选填)</Label>
            <p className='text-xs text-muted-foreground'>用于前端显示使用</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>自定义通知域名(选填)</Label>
            <p className='text-xs text-muted-foreground'>网关的通知将会发送到该域名</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>百分比手续费(选填)</Label>
            <p className='text-xs text-muted-foreground'>在订单金额基础上附加手续费</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input type='number' placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>固定手续费(选填)</Label>
            <p className='text-xs text-muted-foreground'>在订单金额基础上附加手续费</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input type='number' placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>URL</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>PID</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>KEY</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
