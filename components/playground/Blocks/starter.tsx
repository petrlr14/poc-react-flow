import type { NodeProps } from '@xyflow/react';
import { useFlowContext } from 'context/flow-context';

const Starter = (props: NodeProps) => {
  const { openPane } = useFlowContext();

  return (
    <div className='flex flex-col gap-2 items-center'>
      <button
        className='px-4 py-2 border-dashed rounded-md bg-white text-black'
        type="button"
        onClick={() => {
          openPane(props.id);
        }}
      >
        +
      </button>
      <span>Agrega un nodo</span>
    </div>
  )
}

export default Starter;