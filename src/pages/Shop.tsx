// Shop.tsx
import React, { useState, useEffect } from "react";
import agent from "../api/agent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { CartItems, useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { useCategory } from "@/components/Shop/Category/CategoryContext";
import axios from "axios";
import { useBrand } from "@/components/Shop/Brand/BrandContext";
import ProductItem from "@/components/Shop/ProductItem";
import Pagination from "@/components/Pagination";
import { NotFoundProduct } from "@/components/Shop/NoProduct";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, TextField } from "@mui/material";

const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { selectedCategories } = useCategory();
  const { selectedBrand } = useBrand();
  const [products, setProducts] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortDir, setSortDir] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    console.log("brand", selectedBrand);
    console.log("cate", selectedCategories);

    try {
      let response;
      console.log("ct len", selectedCategories.length);

      if (!selectedCategories && !selectedBrand.length && !searchTerm) {
        // Fetch all products without search
        response = await agent.Products.list(pageNo, pageSize, sortDir).then(
          (response) => {
            if (response && Array.isArray(response.data.content)) {
              setProducts(response.data.content);
              // Adjust this based on your API response structure
              setTotalPages(response.totalPages);
            }
          }
        );
      } else {
        // Construct search parameters
        const searchParams: any = {
          pageNo,
          pageSize,
          sortBy: "price",
          sortDir,
        };

        if (selectedCategories.length > 0) {
          searchParams.categoryName = selectedCategories.join(",");
        }

        if (selectedBrand.length > 0) {
          searchParams.brandName = selectedBrand.join(",");
        }

        if (searchTerm) {
          searchParams.productName = searchTerm;
        }

        // Call the searchProducts API
        response = await axios.get(
          "http://localhost:8080/api/v1/product/search",
          {
            params: searchParams,
          }
        );
      }
      // console.log(response.data.content);
      console.log(products);

      if (response && Array.isArray(response.data.content)) {
        setProducts(response.data.content);
        // Adjust this based on your API response structure
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error("Fetched data is not in expected format");
      }
    } catch (error: any) {
      setError("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    pageNo,
    pageSize,
    sortDir,
    selectedCategories,
    selectedBrand,
    searchTerm,
  ]);

  const handlePageClick = (pageNumber: number) => {
    setPageNo(pageNumber - 1);
  };

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      addToCart(productToAdd);
      toast.success("Product added to cart!");
    }
  };

  const handleAddToWishlist = (productId: number) => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      addToWishlist(productToAdd);
      toast.success("Product added to wishlist!");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      <div className="">
        <div className="mb-3 d-flex justify-between">
          <div className="sort-price">
            <Button
              variant="outlined"
              className="mr-2"
              style={{
                borderColor: "#eaeaea",
                backgroundColor: sortDir === "desc" ? "#94c7eb" : "transparent",
                color: sortDir === "desc" ? "white" : "black",
              }}
              onClick={() => setSortDir("desc")}
            >
              High to Low
            </Button>
            <Button
              variant="outlined"
              style={{
                borderColor: "#eaeaea",
                backgroundColor: sortDir === "asc" ? "#94c7eb" : "transparent",
                color: sortDir === "asc" ? "white" : "black",
              }}
              onClick={() => setSortDir("asc")}
            >
              Low to High
            </Button>
          </div>

          <Autocomplete
            className="w-[40%]"
            options={products}
            getOptionLabel={(option) => option.productName}
            onChange={(event, value) => {
              if (value) {
                setSearchTerm(value.productName);
              } else {
                setSearchTerm("");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Products"
                variant="outlined"
              />
            )}
          />
        </div>

        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <ProductItem
                key={product.productId}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}

            <Pagination
              pageNo={pageNo}
              totalPages={totalPages}
              onPageClick={handlePageClick}
            />
          </div>
        ) : (
          <NotFoundProduct />
        )}
      </div>
      {/* <Sidebar /> */}
    </>
  );
};

export default Shop;
