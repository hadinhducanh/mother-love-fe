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
import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";

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
  const defaultAddressId =
    address.find((addr) => addr.default)?.addressId.toString() || "";

  const FormSchema = z.object({
    selectedAddress: z
      .string()
      .nonempty({ message: "You need to select an address." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { selectedAddress: defaultAddressId },
  });

  useEffect(() => {
    form.setValue("selectedAddress", defaultAddressId);
  }, [defaultAddressId, form]);

  const handleSubmit = async (data: { selectedAddress: string }) => {
    // Call the onSubmit prop function
    await onSubmit(data);
    // Optionally reset the form
    form.reset();
    // Close the dialog using your dialog close method (not shown here)
    // Example: closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          Change Address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Address</DialogTitle>
          <Separator />
        </DialogHeader>
        <ScrollArea className="h-96 w-full rounded-md border p-4 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full space-y-6"
            >
              <RadioGroup
                onValueChange={(value) => {
                  form.setValue("selectedAddress", value);
                  onRadioChange(value);
                }}
                value={form.watch("selectedAddress")}
                className="flex flex-col space-y-4"
              >
                {address.map((addr) => (
                  <FormField
                    key={addr.addressId}
                    control={form.control}
                    name="selectedAddress"
                    render={({ field }) => (
                      <FormItem className="space-y-3 w-full">
                        <FormControl>
                          <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-md shadow-sm">
                            <RadioGroupItem
                              value={addr.addressId.toString()}
                              checked={
                                field.value === addr.addressId.toString()
                              }
                            />
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
                              Update
                            </a>
                            {addr.default && (
                              <button className="ml-4 px-2 py-1 border border-red-500 text-red-500 rounded-md">
                                Default
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </RadioGroup>
            </form>
          </Form>
        </ScrollArea>
        <DialogClose>
          <Button onClick={form.handleSubmit(handleSubmit)}>
            Save Changes
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
