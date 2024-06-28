import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import AddressItem from "./AddressItem";
import { AddressObj } from "@/model/Address";

interface AddressListProps {
  address: AddressObj[];
  selectedAddressId: string;
  onDelete: (addressId: number) => void;
  onUpdate: (address: AddressObj) => void;
}

const AddressList: React.FC<AddressListProps> = ({
  address,
  selectedAddressId,
  onDelete,
  onUpdate,
}) => (
  <>
    {address.map((addr) => (
      <FormField
        key={addr.addressId}
        name="selectedAddress"
        render={({ field }) => (
          <FormItem className="space-y-3 w-full">
            <FormControl>
              <div className="flex  items-center space-x-2 p-4 bg-gray-100 rounded-md shadow-sm">
                <RadioGroupItem
                  value={addr.addressId.toString()}
                  checked={field.value === addr.addressId.toString()}
                />
                <AddressItem
                  addr={addr}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </>
);

export default AddressList;
