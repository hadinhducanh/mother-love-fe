import agent from "@/api/agent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackDetail } from "@/model/FeedbackDetail";
import { ProductFeedback } from "@/model/ProductFeedback";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Separator } from "../ui/separator";
import Loading from "../Loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ReactImageMagnify from "react-image-magnify";

interface ProductFeedbackProps {
  productId: number;
}

const Feedback: React.FC<ProductFeedbackProps> = ({ productId }) => {
  const [feedback, setFeedback] = useState<ProductFeedback | null>(null);

  useEffect(() => {
    const fetchFeedbackByProduct = async () => {
      try {
        const response = await agent.Feedback.listByProduct(productId);
        console.log("feedbackByProduct", response);
        setFeedback(response);
      } catch (error) {
        console.error("Failed to fetch feedback", error);
      }
    };
    fetchFeedbackByProduct();
  }, [productId]);

  if (!feedback) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {feedback.feedbackDetails.map((fb: FeedbackDetail) => (
        <>
          <div key={fb.feedbackId}>
            <div className="feedback d-flex justify-start items-start mb-3">
              <div className="avatar mr-3">
                <Avatar>
                  <AvatarImage src={fb.user.image} alt={fb.user.fullName} />
                  <AvatarFallback>{fb.user.fullName}</AvatarFallback>
                </Avatar>
              </div>
              <div className="feedback-content">
                <span>{fb.user.fullName}</span>
                <p>
                  <Rating name="rating" value={fb.rating} readOnly />
                </p>
                <span>{new Date(fb.feedbackDate).toLocaleString("en-GB")}</span>
                <p className="mt-15 mb-15">{fb.comment}</p>
                <div className="carousel-wrapper relative d-flex items-center">
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                      {fb.image.split(",").map((img, index) => (
                        <CarouselItem key={index} className="pl-0">
                          <div className="flex  items-center justify-center p-0 ">
                            <div className="w-[150px] h-fit relative overflow-visible pt-0 mt-0">
                              <ReactImageMagnify
                                {...{
                                  smallImage: {
                                    alt: `Feedback Image ${index + 1}`,
                                    isFluidWidth: true,
                                    src: img,
                                  },
                                  largeImage: {
                                    src: img,
                                    width: 1800,
                                    height: 1800,
                                  },
                                  enlargedImageContainerDimensions: {
                                    width: "300%",
                                    height: "300%",
                                  },
                                  enlargedImagePosition: "beside",
                                  enlargedImageContainerStyle: {
                                    overflow: "visible",
                                    zIndex: 1000,
                                    position: "absolute",
                                    top: "50%", // Center vertically
                                    left: "50%", // Center horizontally
                                    transform: "translate(-50%, -50%)", // Centering trick
                                  },
                                  imageStyle: {
                                    width: "200%",
                                    height: "200%",
                                  },
                                  lensStyle: {
                                    backgroundColor: "rgba(0,0,0,.2)",
                                  },
                                  isHintEnabled: true,
                                  shouldUsePositiveSpaceLens: true,
                                }}
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious
                      style={{ position: "absolute", left: 0, zIndex: 1001 }}
                    />
                    <CarouselNext
                      style={{ position: "absolute", right: 0, zIndex: 1001 }}
                    />
                  </Carousel>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </>
      ))}
    </>
  );
};

export default Feedback;
