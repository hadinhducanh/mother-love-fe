import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { CategoryObj } from "../../model/Category";
import SidebarPopular from "./Sidebar-popular";
import agent from "@/api/agent";
import CategoryCheckBox from "./Category/CategoryCheckbox";
import { BrandObj } from "@/model/Brand";
import BrandCheckBox from "./Brand/BrandCheckbox";

const FormSchema = z.object({
  items: z
    .array(
      z.object({
        categoryId: z.string(),
        categoryName: z.string(),
      })
    )
    .refine(
      (value) => value.some((item) => item.categoryId && item.categoryName),
      {
        message: "You have to select at least one item.",
      }
    ),
  brandItems: z
    .array(
      z.object({
        brandId: z.string(),
        brandName: z.string(),
        image: z.string(),
      })
    )
    .refine((value) => value.some((item) => item.brandId && item.brandName), {
      message: "You have to select at least one item.",
    }),
});

const Sidebar: React.FC = () => {
  const [category, setCategory] = useState<CategoryObj[]>([]);
  const [brand, setBrand] = useState<BrandObj[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, ] = useState<number>(0);
  const [pageSize, ] = useState<number>(10);
  const { toast } = useToast();

  //fetch categories
  const fetchCategory = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Category.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setCategory(response.content);
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategory(pageNo, pageSize);
  }, [pageNo, pageSize]);
  // end of fetchCategory

  //fetchBrand
  const fetchBrand = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Brand.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setBrand(response.content);
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBrand(pageNo, pageSize);
  }, [pageNo, pageSize]);
  // end of fetchBrand

  const formMethods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
      brandItems: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-xl-3 col-lg-4 col-12 order-1 order-lg-1 mb-40">
      <div className="sidebar">
        <h4 className="sidebar-title">Category</h4>
        <ul className="sidebar-list mb-40">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {category.map((item) => (
                <CategoryCheckBox
                  key={item.categoryId}
                  name="items"
                  item={item}
                />
              ))}

              {/* <button type="submit">Submit</button> */}
            </form>
          </FormProvider>
        </ul>
        <h4 className="sidebar-title">Brand</h4>
        <ul className="sidebar-list">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {brand.map((item) => (
                <BrandCheckBox
                  key={item.brandId}
                  name="brandItems"
                  item={item}
                />
              ))}

              {/* <button type="submit">Submit</button> */}
            </form>
          </FormProvider>
        </ul>
      </div>
      <SidebarPopular />
    </div>
  );
};

export default Sidebar;
