import type { NodeProps } from '@xyflow/react';
import BaseBlock from '.'

const FormBlock = (props: NodeProps) => {
  return (
    <BaseBlock
      icon={<div className='w-1/2 flex flex-col gap-1'>
        <div className='w-full h-3 bg-blue-800 rounded-md' />
        <div className='w-full h-3 bg-blue-800 rounded-md' />
        <div className='w-full h-3 bg-blue-800 rounded-md' />
      </div>}
      name='Formulario'
      {...props}
    />
  )
};

export default FormBlock