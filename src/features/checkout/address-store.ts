import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address } from './interfaces/address.interface';

interface State {
  address: Address;

  // Methods
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        countryId: '',
        phone: '',
        department: '',
        district: '',
        province: '',
        // rememberAddress: false,
      },
      setAddress: (address) => set({ address }),
    }),
    {
      name: 'address-storage',
    }
  )
);
