/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "@/components/ui/input";
import { User } from "@/model/User";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { AddressFormData } from "./type";

interface AddressFormProps {
  form: any; // Replace with correct type for useForm if possible
  onSubmit: (data: Partial<AddressFormData>) => void;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  form,
  onSubmit,
  user,
  loading,
  error,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="addressLine"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Address Line" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="District" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input value={user?.fullName} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name="default"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm leading-5 text-gray-900">
                    Default
                  </span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <DialogClose asChild>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};
