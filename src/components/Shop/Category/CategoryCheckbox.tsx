// CategoryCheckBox.tsx
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Checkbox } from "../../ui/checkbox";
import { CategoryObj } from "../../../model/Category";
import { useCategory } from "./CategoryContext";

interface FormFieldProps {
  name: string;
  item: CategoryObj;
}

const CategoryCheckBox: React.FC<FormFieldProps> = ({ name, item }) => {
  const { control, setValue } = useFormContext();
  const watchedItems = useWatch({ control, name });
  const { setSelectedCategories } = useCategory();

  //check categoryName is selected or by check exist in watchedItems
  const isChecked = watchedItems.some(
    (v: { categoryName: string }) => v.categoryName === item.categoryName
  );

  const handleCheckedChange = (checked: boolean) => {
    //check if a category is selected and put it in the watchedItems array, if not, remove it
    const newValue = checked
      ? [...watchedItems, { categoryName: item.categoryName }]
      : watchedItems.filter(
          (v: { categoryName: string }) => v.categoryName !== item.categoryName
        );
    //set name in form to newValue: category selected
    setValue(name, newValue);
    setSelectedCategories(
      newValue.map((v: { categoryName: string }) => v.categoryName)
    );
  };

  return (
    <div className="d-flex items-center">
      <Checkbox
        id={item.categoryId.toString()}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        className="mr-2"
      />
      <label
        htmlFor={item.categoryId.toString()}
        style={{ fontFamily: "Dosis" }}
        className="text-lg mb-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {item.categoryName}
      </label>
    </div>
  );
};

export default CategoryCheckBox;
