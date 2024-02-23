import {create} from 'zustand'

interface ConfittiStore {
  isOpen: boolean;
  onOpen:()=>void;
  onClose:()=>void;
}

export const useConfitti = create<ConfittiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))