import { auth } from '@/auth';
import { AddressForm, getCountries, getUserAddress } from '@/features/checkout';
import { Title } from "@/features/ui";

export default async function CheckoutAddressPage() {

  const countries = await getCountries()
  const session = await auth()

  const userAddress = await getUserAddress(session?.user.id!)
  
  return (
    <div className="flex flex-col sm:justify-center sm:items-center pb-16 md:pb-0 md:mb-36 px-2 md:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoredAddress={userAddress || undefined} />
      </div>
    </div>
  );
}
