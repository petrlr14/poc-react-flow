import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  name: string;
}

const BaseBlock = ({
  icon,
  name,
  ...nodeProps
}: Props & NodeProps) => {
  console.log("BaseBlock props:", nodeProps);
  return (
    <>
      <Handle
        type="target"
        id="target"
        position={Position.Left}
      />
      <div className='rounded-md border-[4px] border-[#E5E7EB] bg-white relative w-[120px] h-[145px] flex items-center justify-center'>
        {icon}
        <div className='absolute bottom-0 left-0 border-[4px] border-[#E5E7EB] bg-[#E5E7EB] rounded-tr-md rounded-tl-'>
          <div className='bg-blue-800 text-white rounded-sm px-1'>
            {name}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        id="source"
        position={Position.Right}
      />
    </>
  );
}

export default BaseBlock;