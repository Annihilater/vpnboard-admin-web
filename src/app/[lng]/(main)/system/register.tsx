import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

export default function Register() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>停止新用户注册</Label>
            <p className='text-xs text-muted-foreground'>开启后任何人都将无法进行注册。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>注册试用</Label>
            <p className='text-xs text-muted-foreground'>
              是否开启注册试用，请先前往商品管理中修改试用套餐
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>邮箱验证</Label>
            <p className='text-xs text-muted-foreground'>开启后将会强制要求用户进行邮箱验证。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>邮箱后缀白名单</Label>
            <p className='text-xs text-muted-foreground'>
              开启后在名单中的邮箱后缀才允许进行注册。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>白名单后缀</Label>
            <p className='text-xs text-muted-foreground'>
              请使用逗号进行分割，如：qq.com,gmail.com。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea placeholder='请使用逗号进行分割，如：qq.com,gmail.com。' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>IP注册限制</Label>
            <p className='text-xs text-muted-foreground'>
              开启后如果IP注册账户达到规则要求将会被限制注册，请注意IP判断可能因为CDN或前置代理导致问题。
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>次数</Label>
            <p className='text-xs text-muted-foreground'>达到注册次数后开启惩罚。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>惩罚时间(分钟)</Label>
            <p className='text-xs text-muted-foreground'>需要等待惩罚时间过后才可以再次注册。</p>
          </TableCell>
          <TableCell className='text-right'>
            <Input />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
