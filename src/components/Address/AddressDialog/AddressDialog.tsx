import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { AddressObj } from "@/model/Address";
import UpdateAddressDialog from "../UpdateAddress/UpdateAddressDialog";
import AddressList from "./AddressList";

interface AddressDialogProps {
  address: AddressObj[];
  selectedAddressId: string | null;
  onRadioChange: (addressId: string) => void;
  onSubmit: (data: { selectedAddress: string }) => void;
  onDelete: (addressId: string) => void;
  onUpdate: (address: AddressObj) => void;
}

const AddressDialog: React.FC<AddressDialogProps> = ({
  address,
  onRadioChange,
  selectedAddressId,
  onSubmit,
  onDelete,
  onUpdate,
}) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState<AddressObj | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const defaultAddressId =
    address.find((addr) => addr.default)?.addressId.toString() || "";

  const FormSchema = z.object({
    selectedAddress: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { selectedAddress: selectedAddressId || defaultAddressId },
  });

  useEffect(() => {
    if (dialogOpen) {
      form.setValue("selectedAddress", selectedAddressId || defaultAddressId);
    }
  }, [defaultAddressId, selectedAddressId, form, dialogOpen]);

  const handleSubmit = async (data: { selectedAddress: string }) => {
    await onSubmit(data);
    form.reset();
  };

  const handleDelete = async (addressId: number) => {
    await onDelete(addressId.toString());
  };

  const handleUpdate = (address: AddressObj) => {
    setAddressToUpdate(address);
    setUpdateDialogOpen(true);
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                  <AddressList
                    address={address}
                    selectedAddressId={form.watch("selectedAddress")}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </RadioGroup>
                <DialogClose asChild>
                  <Button type="submit" className="w-full">
                    Confirm
                  </Button>
                </DialogClose>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {addressToUpdate && (
        <UpdateAddressDialog
          open={updateDialogOpen}
          address={addressToUpdate}
          onClose={() => setUpdateDialogOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default AddressDialog;
