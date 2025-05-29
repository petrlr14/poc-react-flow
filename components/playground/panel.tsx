import { useFlowContext } from '@/context/flow-context'
import { Dialog, DialogContent } from '../ui/dialog'

const Panel = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const {
    onAddNode
  } = useFlowContext();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent type="side">
        <div className='py-4'>
          <h1 className='text-[#1F2937] text-lg'>
            Agrega un elemento a tu flujo
          </h1>
          <p className='text-sm text-[#4B5563]'>Los nodos son los elementos principales que crean una acción dentro de tu flujo, selecciona todo lo que necesites.</p>
        </div>
        <div className='py-4'>
          <ul className='px-2 divide-y flex flex-col gap-2'>
            <li className='py-2'>
              <button type="button" className='w-full flex justify-start items-center gap-2 cursor-pointer'
                onClick={() => onAddNode('form')}
              >
                <div className='size-10 bg-blue-400 rounded-md' />
                <div className='flex flex-col items-start'>
                  <p>Formulario</p>
                  <p>Crea un formulario personalizado</p>
                </div>
              </button>
            </li>
            <li className='py-2'>
              <button type="button" className='w-full flex justify-start items-center gap-2 cursor-pointer'>
                <div className='size-10 bg-blue-400 rounded-md' />
                <div className='flex flex-col items-start'>
                  <p>Formulario</p>
                  <p>Crea un formulario personalizado</p>
                </div>
              </button>
            </li>
            <li className='py-2'>
              <button type="button" className='w-full flex justify-start items-center gap-2 cursor-pointer'>
                <div className='size-10 bg-blue-400 rounded-md' />
                <div className='flex flex-col items-start'>
                  <p>Formulario</p>
                  <p>Crea un formulario personalizado</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Panel