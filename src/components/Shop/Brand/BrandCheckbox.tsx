// CategoryCheckBox.tsx
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Checkbox } from "../../ui/checkbox";
import { useBrand } from "./BrandContext";
import { BrandObj } from "@/model/Brand";

interface FormFieldProps {
  name: string;
  item: BrandObj;
}

const BrandCheckBox: React.FC<FormFieldProps> = ({ name, item }) => {
  const { control, setValue } = useFormContext();
  const watchedItems = useWatch({ control, name });
  const { setSelectedBrand } = useBrand();

  const isChecked = watchedItems.some(
    (v: { brandName: string }) => v.brandName === item.brandName
  );

  const handleCheckedChange = (checked: boolean) => {
    const newValue = checked
      ? [...watchedItems, { brandName: item.brandName }]
      : watchedItems.filter(
          (v: { brandName: string }) => v.brandName !== item.brandName
        );

    setValue(name, newValue);
    setSelectedBrand(newValue.map((v: { brandName: string }) => v.brandName));
  };

  return (
    <div className="d-flex items-center">
      <Checkbox
        id={item.brandId.toString()}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        className="mr-2"
      />
      <img src={item.image} alt={item.brandName} className="w-12" />
      <label
        htmlFor={item.brandId.toString()}
        style={{ fontFamily: "Dosis" }}
        className="text-lg mb-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.brandName}
      </label>
    </div>
  );
};

export default BrandCheckBox;
