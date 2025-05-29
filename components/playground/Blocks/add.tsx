import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useFlowContext } from 'context/flow-context';

const AddNode = (props: NodeProps) => {
  const { openPane } = useFlowContext();

  return (
    <>
      <Handle
        type='target'
        position={Position.Left}
        id="target"
      />
      <button
        className='px-3 py-2 rounded-md bg-white text-black border-dashed border-2'
        type="button"
        onClick={() => {
          openPane(props.id);
        }}
      >
        +
      </button>
    </>
  )
}

export default AddNode;