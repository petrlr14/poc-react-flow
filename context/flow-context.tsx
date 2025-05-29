import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlowProvider, type Connection, type Edge, type Node } from '@xyflow/react';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

const FlowContext = createContext<{
  triggerId: string | null;
  panelState: "idle" | "new";
  nodes: Node[];
  edges: Edge[];
  openPane: (from: string) => void;
  closePane: () => void;
  onAddNode: (nodeId: string) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (params: any) => void;
}>({
  panelState: "idle",
  triggerId: null,
  nodes: [],
  edges: [],
  openPane: () => { },
  closePane: () => { },
  onAddNode: () => { },
  onNodesChange: () => { },
  onEdgesChange: () => { },
  onConnect: () => { },
});

const initialNodes = [
  {
    id: "starter",
    type: "starter",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  // {
  //   id: "form",

  //   data: { label: "Form Node" },
  //   position: { x: 0, y: 0 },
  // },
  // {
  //   id: "add-node-1",
  //   data: { label: "Add Node" },
  //   position: { x: 300, y: 0 },
  // }
]

const FlowContextProvider = ({ children }: { children: ReactNode }) => {

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => {
      return applyNodeChanges(changes, nds)
    }),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => {
      console.log("Edge changes:", changes);
      return applyEdgeChanges(changes, eds)
    }),
    [],
  );

  const [triggerId, setTriggerId] = useState<string | null>(null);
  const [panelState, setPanelState] = useState<"idle" | "new">("idle");
  const openPane = (from: string) => {
    setPanelState("new");
    setTriggerId(from);
  }

  const closePane = () => {
    setPanelState("idle");
  }

  const onAddNode = (nodeId: string) => {
    if (!triggerId) return;

    const sourceNode = triggerId !== "starter" && nodes.find((node) => node.id === triggerId);
    if (!sourceNode) {
      addFirstNode(nodeId);
      setTriggerId(null);
      setPanelState("idle");
      return;
    }

    const position = {
      x: sourceNode.position.x + 50,
      y: sourceNode.position.y - 51
    }
    const edge = edges.find((edge) => edge.target === triggerId);
    if (!edge) return;
    const newNode: Node = {
      id: `${nodeId}-${Date.now()}`,
      type: nodeId,
      data: { label: `Node ${nodeId}` },
      position,
    }
    const addNode: Node = {
      id: `add-node-${Date.now()}`,
      type: "add-node",
      data: { label: "Add Node" },
      position: { x: position.x + 160, y: position.y + 51 },
    }

    const newNodes = [...nodes.filter(({ id }) => {
      return id !== triggerId && id !== "starter";
    }), newNode, addNode];
    setNodes(newNodes);
    const newEdges = [...edges.filter(({ id }) => {
      return id !== edge?.id;
    }), {
      id: `e-${edge.source}-${newNode.id}`,
      source: edge.source,
      target: newNode.id,
    }, {
      id: `e-${newNode.id}-${addNode.id}`,
      source: newNode.id,
      target: addNode.id,
    }]
    setEdges(newEdges);

    setTriggerId(null);
    setPanelState("idle");

  }

  const addFirstNode = (nodeId: string) => {
    const newNodeId = `${nodeId}-${Date.now()}`;
    const addNodeId = `add-node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: nodeId,
      data: { label: `Node ${nodeId}` },
      position: { x: 0, y: 0 },
    }
    const addNode: Node = {
      id: addNodeId,
      type: "add-node",
      data: { label: "Add Node" },
      position: { x: 160, y: 51 },
    }

    setNodes([newNode, addNode]);
    setEdges([{
      id: `e-${newNodeId}-${addNodeId}`,
      source: newNodeId,
      target: addNodeId,
    }]);
  }

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>
      <FlowContext.Provider value={{
        nodes,
        edges,
        panelState,
        triggerId,
        onAddNode,
        openPane,
        closePane,
        onNodesChange,
        onEdgesChange,
        onConnect,
      }}>
        {children}
      </FlowContext.Provider>
    </ReactFlowProvider>
  );
}

export default FlowContextProvider;

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlowContext must be used within a FlowContextProvider");
  }
  return context;
}