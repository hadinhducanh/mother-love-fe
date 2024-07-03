import { UseFormReturn } from "react-hook-form";
import { AddressFormData } from "../type/type";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import agent from "@/api/agent";
import { ProvinceObj, District } from "@/model/Address";
import { Autocomplete, TextField } from "@mui/material";

interface UpdateAddressFormProps {
  form: UseFormReturn<AddressFormData>;
  onSubmit: (data: Partial<AddressFormData>) => void;
}

export const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
  form,
  onSubmit,
}) => {
  const [cities, setCities] = useState<ProvinceObj[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<ProvinceObj | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [districtError, setDistrictError] = useState<string | null>(null);

  useEffect(() => {
    const initialCity = cities.find(
      (city) => city.ProvinceName === form.getValues().city
    );
    if (initialCity) {
      setSelectedCity(initialCity);
      fetchDistricts(initialCity.ProvinceID);
    }
    const initialDistrict = districts.find(
      (district) => district.DistrictName === form.getValues().district
    );
    if (initialDistrict) {
      setSelectedDistrict(initialDistrict);
    }
  }, [cities, districts, form]);

  const fetchCities = async () => {
    try {
      setLoadingCities(true);
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
      setLoadingCities(false);
    }
  };

  const fetchDistricts = async (provinceId: number | null) => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }
    try {
      setLoadingDistricts(true);
      const response = await agent.ExternalAPI.getDistrictByProvince(
        provinceId
      );
      if (response.data) {
        setDistricts(response.data);
        console.log("districts:", response.data);
      } else {
        setErrorData("Data format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setErrorData("Failed to fetch districts");
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const validateDistrict = () => {
    if (selectedCity && selectedDistrict) {
      return districts.some(
        (district) =>
          district.DistrictName === selectedDistrict.DistrictName &&
          district.ProvinceID === selectedCity.ProvinceID
      );
    }
    return true;
  };

  const handleSubmit = (data: Partial<AddressFormData>) => {
    if (!validateDistrict()) {
      setDistrictError(
        "The selected district does not belong to the selected city."
      );
      return;
    }
    setDistrictError(null);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="addressId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address ID</FormLabel>
              <FormControl>
                <Input placeholder="ID" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input placeholder="Address Line" {...field} />
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
              <Autocomplete
                id="city"
                options={cities}
                getOptionLabel={(option) => option.ProvinceName}
                value={selectedCity}
                onChange={(event, value) => {
                  form.setValue("city", value ? value.ProvinceName : "");
                  setSelectedCity(value);
                  setSelectedDistrict(null);
                  console.log("Selected City:", value?.ProvinceID);
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
                      autoComplete: "new-password",
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
          render={({ field }) => (
            <FormItem>
              <Autocomplete
                id="district"
                options={districts}
                getOptionLabel={(option) => option.DistrictName}
                value={selectedDistrict}
                onChange={(event, value) => {
                  form.setValue("district", value ? value.DistrictName : "");
                  setSelectedDistrict(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    key={params.id}
                    label="Select District"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
              {districtError && (
                <p className="text-red-500 text-sm mt-1">{districtError}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Fullname" {...field} readOnly />
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
        <Button type="submit" className="w-full">
          Update Address
        </Button>
      </form>
    </Form>
  );
};
