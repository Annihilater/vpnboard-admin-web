import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

export default function AlipayF2F() {
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
            <Label>支付宝APPID</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>支付宝私钥</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>支付宝公钥</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>自定义商品名称</Label>
            <p className='text-xs text-muted-foreground'></p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='将会体现在支付宝账单中' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
