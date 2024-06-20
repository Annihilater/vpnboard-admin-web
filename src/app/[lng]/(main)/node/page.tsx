import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupTable from './group-table';
import NodeTable from './node-table';

export default function Page() {
  return (
    <Tabs defaultValue='node'>
      <TabsList>
        <TabsTrigger value='node'>节点</TabsTrigger>
        <TabsTrigger value='group'>节点组</TabsTrigger>
      </TabsList>
      <TabsContent value='node'>
        <NodeTable />
      </TabsContent>
      <TabsContent value='group'>
        <GroupTable />
      </TabsContent>
    </Tabs>
  );
}
