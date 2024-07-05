import React, { useEffect, useState } from "react";
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
import { AddressFormData } from "../type/type";
import agent from "@/api/agent";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { District, ProvinceObj } from "@/model/Address";

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
  const [cities, setCities] = useState<ProvinceObj[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCity, ] = useState<number | null>(null);
  const [, setLoadingCities] = useState<boolean>(false);
  const [, setLoadingDistricts] = useState<boolean>(false);
  const [, setErrorData] = useState<string | null>(null);

  // Function to fetch cities from API
  const fetchCities = async () => {
    try {
      setLoadingCities(true); // Set loading to true before fetching
      const response = await agent.ExternalAPI.getProvinces();
      if (response.data) {
        setCities(response.data);
      } else {
        setErrorData("Data format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setErrorData("Failed to fetch cities");
    } finally {
      setLoadingCities(false); // Set loading to false after fetching
    }
  };

  // Function to fetch districts based on selected city
  const fetchDistricts = async (provinceId: number | null) => {
    if (!provinceId) {
      setDistricts([]); // Clear districts if no city is selected
      return;
    }
    try {
      setLoadingDistricts(true); // Set loading to true before fetching
      const response = await agent.ExternalAPI.getDistrictByProvince(
        provinceId
      );
      if (response.data) {
        setDistricts(response.data);
        console.log("districts:", response.data); // Improved logging
      } else {
        setErrorData("Data format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setErrorData("Failed to fetch districts");
    } finally {
      setLoadingDistricts(false); // Set loading to false after fetching
    }
  };

  // Effect to fetch cities when component mounts
  useEffect(() => {
    fetchCities();
  }, []);
  useEffect(() => {
    if (selectedCity) {
      fetchDistricts(selectedCity);
    }
  }, [selectedCity]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="addressLine"
          render={() => (
            <FormItem>
              <FormControl>
                <Input placeholder="Address Line" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={() => (
            <FormItem>
              <Autocomplete
                id="city"
                options={cities}
                getOptionLabel={(option) => option.ProvinceName}
                onChange={(_, value) => {
                  form.setValue("city", value ? value.ProvinceName : "");
                  console.log("Selected City:", value?.ProvinceID); // Log selected city ID
                  // Fetch districts based on selected city
                  fetchDistricts(value?.ProvinceID || null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    label="Select City"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: "new-password", // Fix for Chrome autofill issue
                    }}
                  />
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={() => (
            <FormItem>
              <Autocomplete
                id="district"
                options={districts}
                getOptionLabel={(option) => option.DistrictName}
                onChange={(_, value) => {
                  form.setValue("district", value ? value.DistrictName : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    label="Select District"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: "new-password", // Fix for Chrome autofill issue
                    }}
                  />
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user.userId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input value={user?.fullName} readOnly />
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
