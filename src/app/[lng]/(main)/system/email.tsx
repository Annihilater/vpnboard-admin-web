import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

export default function Email() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>SMTP服务器地址</Label>
            <p className='text-xs text-muted-foreground'>由邮件服务商提供的服务地址</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>SMTP服务端口</Label>
            <p className='text-xs text-muted-foreground'>常见的端口有25, 465, 587</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>SMTP加密方式</Label>
            <p className='text-xs text-muted-foreground'>
              465端口加密方式一般为SSL，587端口加密方式一般为TLS
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>SMTP账号</Label>
            <p className='text-xs text-muted-foreground'>由邮件服务商提供的账号</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>SMTP密码</Label>
            <p className='text-xs text-muted-foreground'>由邮件服务商提供的密码</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>发件地址</Label>
            <p className='text-xs text-muted-foreground'>由邮件服务商提供的发件地址</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>邮件模板</Label>
            <p className='text-xs text-muted-foreground'>你可以在文档查看如何自定义邮件模板</p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea placeholder='请输入' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>发送测试邮件</Label>
            <p className='text-xs text-muted-foreground'>邮件将会发送到当前登陆用户邮箱</p>
          </TableCell>
          <TableCell className='text-right'>
            <Button>发送测试邮件</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
