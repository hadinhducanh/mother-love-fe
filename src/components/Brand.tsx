/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import agent from "../api/agent";
import { BrandObj } from "../model/Brand";
import Loading from "./Loading";

export const Brand: FC = () => {
  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: false,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [brands, setBrands] = useState<BrandObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  const fetchProducts = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Brand.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setBrands(response.content);
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(pageNo, pageSize);
  }, [pageNo, pageSize]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="brand-section section section-padding pt-0">
      <div className="container-fluid">
        <div className="row">
          <Slider {...settings} className="brand-slider">
            {brands.map((brand) => {
              const images = brand.image
                .replace(/[\[\]]/g, "") // Remove square brackets
                .split(",");
              return (
                <div key={brand.brandId} className="brand-item col">
                  <img src={images[0]} alt="Brand 1" />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};
