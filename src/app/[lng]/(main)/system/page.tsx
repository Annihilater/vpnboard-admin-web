import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Email from './email';
import Invite from './invite';
import Node from './node';
import Register from './register';
import Site from './site';
import Subscription from './subscription';
import Telegram from './telegram';

export default function Page() {
  return (
    <Tabs defaultValue='site'>
      <TabsList>
        <TabsTrigger value='site'>站点</TabsTrigger>
        <TabsTrigger value='subscription'>订阅</TabsTrigger>
        <TabsTrigger value='register'>注册</TabsTrigger>
        <TabsTrigger value='email'>邮件</TabsTrigger>
        <TabsTrigger value='node'>节点</TabsTrigger>
        <TabsTrigger value='invite'>邀请</TabsTrigger>
        <TabsTrigger value='telegram'>Telegram</TabsTrigger>
      </TabsList>
      <TabsContent value='site'>
        <Site />
      </TabsContent>
      <TabsContent value='subscription'>
        <Subscription />
      </TabsContent>
      <TabsContent value='register'>
        <Register />
      </TabsContent>
      <TabsContent value='email'>
        <Email />
      </TabsContent>
      <TabsContent value='node'>
        <Node />
      </TabsContent>
      <TabsContent value='invite'>
        <Invite />
      </TabsContent>
      <TabsContent value='telegram'>
        <Telegram />
      </TabsContent>
    </Tabs>
  );
}
