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
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import agent from "@/api/agent"; // Assuming this is your custom API agent
import { Separator } from "@/components/ui/separator";
import { User } from "@/model/User";
import { AddressForm } from "./AddressForm";
import { AddressFormData } from "./type";
import { useToast } from "@/components/ui/use-toast";

interface NewAddressDialogProps {}

const NewAddressDialog: React.FC<NewAddressDialogProps> = () => {
  const { isLoggedIn, getUserInfo } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
    }
  }, [userId]); // Added userId as dependency for useEffect

  const FormSchema = z.object({
    addressLine: z.string().nonempty({ message: "Address line is required" }),
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
      default: false,
      user: {
        userId: userId ?? null, // Set userId from state or null
      },
    },
  });

  const onSubmit = async (data: Partial<AddressFormData>) => {
    setLoading(true);
    setError(null);
    try {
      await agent.Address.addNewAddress(data); // Assuming agent handles API calls

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
