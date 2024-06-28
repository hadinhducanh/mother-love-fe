import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { AddressObj } from "@/model/Address";
import { AddressFormData } from "../type/type";
import { UpdateAddressForm } from "./UpdateAddressForm";
import agent from "@/api/agent";

interface UpdateAddressDialogProps {
  open: boolean;
  address: AddressObj;
  onClose: () => void;
  onUpdate: (address: AddressObj) => void;
}

const UpdateAddressDialog: React.FC<UpdateAddressDialogProps> = ({
  open,
  address,
  onClose,
  onUpdate,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FormSchema = z.object({
    addressId: z.number(),
    addressLine: z.string().nonempty({ message: "Address line is required" }),
    district: z.string().nonempty({ message: "District is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    default: z.boolean(),
    user: z.object({
      userId: z.number(),
      fullName: z.string().nonempty({ message: "Full name is required" }),
    }),
  });

  const form = useForm<AddressFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addressId: address.addressId || 1,
      addressLine: address.addressLine || "",
      district: address.district || "",
      city: address.city || "",
      default: address.default || false,
      user: {
        userId: address.user?.userId || 0,
        fullName: address.user?.fullName || "",
      },
    },
  });

  useEffect(() => {
    form.reset({
      addressId: address.addressId || 1,
      addressLine: address.addressLine || "",
      district: address.district || "",
      city: address.city || "",
      default: address.default || false,
      user: {
        userId: address.user?.userId || 0,
        fullName: address.user?.fullName || "",
      },
    });
  }, [address, form]);

  const handleSubmit = async (data: Partial<AddressFormData>) => {
    console.log("Submitting update with data:", data); // Check if data is correct
    setLoading(true);
    setError(null);

    try {
      // Perform API call to update address
      await agent.Address.updateAddress(address.addressId, data);
      // Optionally, update local state or notify parent component

      toast({
        title: "Address updated successfully",
        description: "Your address has been updated.",
      });
      onUpdate({ ...address, ...data });
      onClose(); // Close the dialog upon successful update
    } catch (error) {
      console.error("Failed to update address:", error);
      setError("An error occurred while updating the address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
          <Separator />
        </DialogHeader>
        <UpdateAddressForm form={form} onSubmit={handleSubmit} />
        {error && <p className="text-red-500">{error}</p>}
        <DialogClose asChild>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="mt-2"
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressDialog;
