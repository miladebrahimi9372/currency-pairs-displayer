import { FC, ReactNode } from 'react'

type ModalProps = {
 open: boolean
 onClose: () => void
 children: ReactNode
}

const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
 return (
  <div
   className={`bg-[#000000a6] w-screen h-screen flex justify-center items-center absolute ${
    open ? 'block' : 'hidden'
   } `}
   onClick={() => {
    onClose()
   }}
  >
   {children}
  </div>
 )
}

export default Modal
