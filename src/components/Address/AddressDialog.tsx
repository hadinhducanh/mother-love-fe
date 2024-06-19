/* eslint-disable @typescript-eslint/no-unused-vars */
// components/AddressDialog.tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AddressObj } from "@/model/Address";

interface AddressDialogProps {
  address: AddressObj[];
  selectedAddressId: string | null;
  onRadioChange: (addressId: string) => void;
  onSubmit: (data: { selectedAddress: string }) => void;
}

const AddressDialog: React.FC<AddressDialogProps> = ({
  address,
  selectedAddressId,
  onRadioChange,
  onSubmit,
}) => {
  const FormSchema = z.object({
    selectedAddress: z
      .string()
      .nonempty({ message: "You need to select an address." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { selectedAddress: "" },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Address</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {address.map((addr) => (
              <FormField
                key={addr.addressId}
                control={form.control}
                name="selectedAddress"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          onRadioChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-4"
                      >
                        <FormItem className="flex items-center space-x-3 p-4 bg-gray-100 rounded-md shadow-sm">
                          <FormControl>
                            <RadioGroupItem
                              value={addr.addressId.toString()}
                              onChange={() =>
                                onRadioChange(addr.addressId.toString())
                              }
                            />
                          </FormControl>
                          <div className="flex items-center space-x-2">
                            <div>
                              <div className="font-bold text-lg">
                                {addr.user?.fullName}
                              </div>
                              <div className="text-gray-600">
                                {addr.user?.phone}
                              </div>
                              <div className="text-gray-600">
                                {addr.addressLine}
                              </div>
                              <div className="text-gray-600">
                                {addr.district}, {addr.city}
                              </div>
                            </div>
                          </div>
                          <a href="#" className="text-blue-500 ml-auto">
                            Cập nhật
                          </a>
                          <button className="ml-4 px-2 py-1 border border-red-500 text-red-500 rounded-md">
                            Mặc định
                          </button>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogClose asChild>
              <Button type="submit">Save Changes</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
