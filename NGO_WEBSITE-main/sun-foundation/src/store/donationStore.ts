import { create } from "zustand"

interface DonationState {
  amount: number
  donorInfo: {
    name: string
    email: string
    phone: string
    pan?: string
    message?: string
  } | null
  setAmount: (amount: number) => void
  setDonorInfo: (info: DonationState["donorInfo"]) => void
  reset: () => void
}

export const useDonationStore = create<DonationState>((set) => ({
  amount: 500,
  donorInfo: null,
  setAmount: (amount) => set({ amount }),
  setDonorInfo: (info) => set({ donorInfo: info }),
  reset: () => set({ amount: 500, donorInfo: null }),
}))
