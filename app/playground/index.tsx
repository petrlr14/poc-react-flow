import { useCallback, useState } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, type EdgeProps, BaseEdge, getSmoothStepPath, useReactFlow } from '@xyflow/react';
import Starter from 'components/playground/Blocks/starter';
import FlowContextProvider, { useFlowContext } from 'context/flow-context';
import Panel from '@/components/playground/panel';
import FormBlock from '@/components/playground/Blocks/form';
import AddNode from '@/components/playground/Blocks/add';
import '@xyflow/react/dist/style.css';


const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style = {},
}: EdgeProps) => {
  // @ts-ignore
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX: targetX + 5,
    targetY: targetY < 0 ? targetY - 5 : targetY + 5,
    sourcePosition,
    targetPosition,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ ...style }}
      markerEnd={markerEnd}
    />
  );
};


const nodeTypes = {
  starter: Starter,
  form: FormBlock,
  "add-node": AddNode
}

const edgeTypes = {
  custom: CustomEdge,
}

const Playground = () => {
  const { panelState, closePane, nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowContext();
  const { fitView } = useReactFlow();

  return (
    <main className='w-full h-screen'>
      <Panel
        isOpen={panelState === "new"}
        onClose={closePane}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.1,
        }}
        onNodesChange={(val) => {
          onNodesChange(val);
          fitView({
            duration: 500,
            padding: 0.1,
          });
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          style: {
            strokeWidth: 2,
          },
          type: "straight",
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  )
}

const Wrapper = () => {
  return (
    <FlowContextProvider>
      <Playground />
    </FlowContextProvider>
  )
}

export default Wrapper;