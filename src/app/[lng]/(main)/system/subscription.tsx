import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function Subscription() {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Label>单订阅模式</Label>
              <p className='text-xs text-muted-foreground'>
                是否开启单订阅模式，开启后无法关闭，所有用户只保留第一个有效套餐，其他套餐折抵转换到余额
              </p>
            </TableCell>
            <TableCell className='text-right'>
              <Switch />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>订阅URL</Label>
              <p className='text-xs text-muted-foreground'>
                用于订阅所使用，留空则为站点URL。如需多个订阅URL 请每行一个。
              </p>
            </TableCell>
            <TableCell className='text-right'>
              <Textarea placeholder='请输入订阅URL，末尾不要/。每行一个支持多域名' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>订阅泛解析</Label>
              <p className='text-xs text-muted-foreground'>用于订阅所使用</p>
            </TableCell>
            <TableCell className='text-right'>
              <Switch />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>订阅路径</Label>
              <p className='text-xs text-muted-foreground'>用于订阅所使用</p>
            </TableCell>
            <TableCell className='flex items-center gap-2 text-right'>
              <Input placeholder='请输入' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>APP</Label>
              <p className='text-xs text-muted-foreground'>APP的下载地址配置</p>
            </TableCell>
            <TableCell className='text-right'></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs defaultValue='windows'>
        <TabsList>
          <TabsTrigger value='windows'>Windows</TabsTrigger>
          <TabsTrigger value='linux'>Linux</TabsTrigger>
          <TabsTrigger value='mac'>Mac OS</TabsTrigger>
          <TabsTrigger value='android'>Andriod</TabsTrigger>
          <TabsTrigger value='ios'>IOS</TabsTrigger>
        </TabsList>
        <TabsContent value='windows'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label>Clash for windows</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Nekoray</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Singbox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Hiddify</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>V2ray</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='linux'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label>Surge</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>NekoBox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Quantumult X</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Sing Box</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Clash</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>V2ray</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='mac'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label>ClashX</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Surge</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Stash</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Quantumult X</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Singbox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Hiddify</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='android'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label>Clash for Android</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Surfboard</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>NekoBox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>V2rayNG</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>SingBox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Hiddify</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value='ios'>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label>Shadowrocket</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Surge</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Stash</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Quantumult X</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Singbox</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Loon</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>V2box</Label>
                </TableCell>
                <TableCell className='flex items-center gap-2 text-right'>
                  <Input placeholder='应用图标' />
                  <Input placeholder='应用下载地址' />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </>
  );
}
