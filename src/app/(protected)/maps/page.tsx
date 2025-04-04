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
import { motion, AnimatePresence } from "framer-motion";
import { generateRoadmap } from "@/app/actions/maps";


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const pageTransition = {
  hidden: { opacity: 0, x: -300 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    x: 300,
    transition: {
      duration: 0.3
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const MapsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studyLevel, setStudyLevel] = useState<string>("beginner");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);

  const allSubjects = [...customSubjects];

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

  const generateRoadmapHandler = async (subject: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const roadmapData = await generateRoadmap(subject, studyLevel);
      setNodes(roadmapData.nodes);
      setEdges(roadmapData.edges);
      setSelectedSubject(subject);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate roadmap');
      console.error('Error generating roadmap:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    const subject = newSubject.trim();
    if (subject && !allSubjects.includes(subject)) {
      setCustomSubjects([...customSubjects, subject]);
      generateRoadmapHandler(subject);
      setNewSubject("");
    } else if (subject) {
      generateRoadmapHandler(subject);
      setNewSubject("");
    }
  };

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
        <SidebarMenu />
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <div className="max-w-5xl mx-auto space-y-6">
            <AnimatePresence mode="wait">
              {selectedSubject ? (
                <motion.div 
                  key="subject-view"
                  className="w-full bg-white shadow-md rounded-lg flex flex-col"
                  variants={pageTransition}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <motion.div 
                    className="p-6 border-b"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-center">{selectedSubject} Learning Path</h2>
                  </motion.div>
                  
                  <motion.div 
                    className="w-full h-[600px] p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {isLoading ? (
                      <motion.div 
                        className="flex items-center justify-center h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div 
                          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                      </motion.div>
                    ) : error ? (
                      <motion.div 
                        className="flex items-center justify-center h-full text-red-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.div>
                    ) : (
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
                          <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button onClick={addNode}>Add Node</Button>
                          </motion.div>
                        </Panel>
                      </ReactFlow>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedSubject(null)}
                      >
                        Back to Subjects
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="subjects-list"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.h1 
                    className="text-3xl font-bold text-center"
                    variants={itemVariants}
                  >
                    Maps
                  </motion.h1>

                  <motion.div 
                    className="flex items-center gap-2 w-full max-w-lg mx-auto"
                    variants={itemVariants}
                  >
                    <Input 
                      type="text" 
                      placeholder="Enter subject name..." 
                      className="flex-1"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateNew()}
                    />
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={handleCreateNew}
                        disabled={!newSubject.trim()}
                      >
                        Create New
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="flex flex-col gap-2 w-full max-w-lg mx-auto"
                    variants={itemVariants}
                  >
                    <label className="text-sm font-medium">Study Level</label>
                    <select
                      value={studyLevel}
                      onChange={(e) => setStudyLevel(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {allSubjects.map((subject, index) => (
                        <motion.div
                          key={`${subject}-${index}`}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layout
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Card
                            className="text-center shadow-md transition-all rounded-lg cursor-pointer hover:bg-gray-200"
                            onClick={() => generateRoadmapHandler(subject)}
                          >
                            <CardContent className="p-4 font-semibold">
                              {subject}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MapsPage;