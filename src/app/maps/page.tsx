'use client';

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

const subjects = ["Math", "Science", "History", "Geography", "Computer Science", "Physics", "Chemistry"];

// Initial nodes for the study map
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Main Topic' },
    position: { x: 250, y: 5 },
    style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 180 }
  },
  {
    id: '2',
    data: { label: 'Subtopic 1' },
    position: { x: 100, y: 100 },
    style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 }
  },
  {
    id: '3',
    data: { label: 'Subtopic 2' },
    position: { x: 400, y: 100 },
    style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 }
  },
  {
    id: '4',
    data: { label: 'Resource: Video Tutorial' },
    position: { x: 100, y: 200 },
    style: { background: '#8b5cf6', color: 'white', border: '1px solid #7c3aed', width: 180 }
  },
  {
    id: '5',
    data: { label: 'Resource: Practice Exercise' },
    position: { x: 400, y: 200 },
    style: { background: '#8b5cf6', color: 'white', border: '1px solid #7c3aed', width: 180 }
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Final Project' },
    position: { x: 250, y: 300 },
    style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 150 }
  },
];

// Initial edges for the study map
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
];

const MapsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const addNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: `New Topic ${nodes.length + 1}` },
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 150 }
    };
    
    setNodes([...nodes, newNode]);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* If a subject is selected, show subject page with map */}
            {selectedSubject ? (
              <div className="w-full bg-white shadow-md rounded-lg flex flex-col">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-center">{selectedSubject} Learning Path</h2>
                </div>
                
                {/* Study Map */}
                <div className="w-full h-[600px] p-4">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                    <Panel position="top-right">
                      <Button onClick={addNode}>Add Node</Button>
                    </Panel>
                  </ReactFlow>
                </div>
                
                <div className="p-4 border-t">
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedSubject(null)}
                  >
                    Back to Subjects
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Centered Heading */}
                <h1 className="text-3xl font-bold text-center">Maps</h1>

                {/* Search Bar with Create New Button */}
                <div className="flex items-center gap-2 w-full max-w-lg mx-auto">
                  <Input type="text" placeholder="Search..." className="flex-1" />
                  <Button> Create New + </Button>
                </div>

                {/* Subject Cards (Clickable to Open Individual Pages) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <Card
                      key={subject}
                      className="p-4 text-center shadow-md transition-all rounded-lg cursor-pointer hover:bg-gray-200 hover:shadow-lg active:scale-95"
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <CardContent className="font-semibold">{subject}</CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MapsPage;