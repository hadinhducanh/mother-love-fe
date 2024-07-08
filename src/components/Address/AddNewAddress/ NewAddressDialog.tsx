/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth/AuthContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import agent from "@/api/agent"; // Assuming this is your custom API agent
import { Separator } from "@/components/ui/separator";
import { User } from "@/model/User";
import { AddressForm } from "./AddressForm";
import { AddressFormData } from "../type/type";
import { useToast } from "@/components/ui/use-toast";
import { AddressObj } from "@/model/Address";

interface NewAddressDialogProps {
  onAddressAdded: (address: AddressObj) => void;
}

const NewAddressDialog: React.FC<NewAddressDialogProps> = ({
  onAddressAdded,
}) => {
  const { isLoggedIn, getUserInfo } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [, setNewAddress] = useState<AddressObj | null>(null);
  const [hasExistingAddresses, setHasExistingAddresses] =
    useState<boolean>(false);
  const [pageNo] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId);
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, getUserInfo]);

  useEffect(() => {
    if (userId != null) {
      form.setValue("user.userId", userId);
      const fetchUserAddresses = async () => {
        try {
          const addresses = await agent.Address.listByUserId(
            userId,
            pageNo,
            pageSize
          );
          setHasExistingAddresses(addresses.length > 0);
        } catch (error) {
          console.error("Failed to fetch user addresses:", error);
        }
      };

      fetchUserAddresses();
    }
  }, [userId, pageNo, pageSize]); // Added userId as dependency for useEffect

  const FormSchema = z.object({
    addressLine: z.string().min(1, { message: "Address line is required" }),
    district: z.string().nonempty({ message: "District is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    default: z.boolean(),
    user: z.object({
      userId: z.number().nullable(), // Ensure userId is a number or null
    }),
  });

  const form = useForm<Partial<AddressFormData>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addressLine: "",
      district: "",
      city: "",
      default: !hasExistingAddresses,
      user: {
        userId: userId ?? undefined, // Set userId from state or null
      },
    },
  });

  const onSubmit = async (data: Partial<AddressFormData>) => {
    setLoading(true);
    setError(null);
    console.log("submit", data);

    try {
      const addedAddress = await agent.Address.addNewAddress(data); // Assuming agent handles API calls
      onAddressAdded(addedAddress);
      setNewAddress(null);
      form.reset(); // Reset the form after successful submission
      toast({
        title: "Create new Address successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (userId == null) {
    return null; // Return null or a loading indicator while userId is being fetched
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <Separator />
        </DialogHeader>
        <AddressForm
          form={form}
          onSubmit={onSubmit}
          user={user}
          loading={loading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewAddressDialog;
