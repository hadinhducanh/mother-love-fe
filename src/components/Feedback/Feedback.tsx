import agent from "@/api/agent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackDetail } from "@/model/FeedbackDetail";
import { ProductFeedback } from "@/model/ProductFeedback";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Separator } from "../ui/separator";
import Loading from "../Loading";
import Pagination from "../Pagination";

interface ProductFeedbackProps {
  productId: number;
}

const Feedback: React.FC<ProductFeedbackProps> = ({ productId }) => {
  const [feedback, setFeedback] = useState<ProductFeedback | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize] = useState<number>(4);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchFeedbackByProduct = async () => {
      try {
        const response = await agent.Feedback.listByProduct(
          productId,
          pageNo,
          pageSize
        );
        setFeedback(response);
        setTotalPages(response.feedbackDetails.totalPages);
      } catch (error) {
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
  const handlePageClick = (pageNumber: number) => {
    setPageNo(pageNumber - 1);
  };

  return (
    <>
      {feedback.feedbackDetails.content.map((fb: FeedbackDetail) => (
        <>
          <div key={fb.feedbackId} className="w-[80%]  mb-6">
            <div className="feedback d-flex justify-start items-start mb-3">
              <div className="avatar mr-3">
                <Avatar>
                  <AvatarImage src={fb.user.image} alt={fb.user.fullName} />
                  <AvatarFallback>{fb.user.fullName}</AvatarFallback>
                </Avatar>
              </div>
              <div className="feedback-content w-full">
                <span className="font-semibold">{fb.user.fullName}</span>
                <p>
                  <Rating name="rating" value={fb.rating} readOnly />
                </p>
                <span className="text-sm text-gray-500">
                  {new Date(fb.feedbackDate).toLocaleString("en-GB")}
                </span>
                <p className="mt-3 mb-3 text-base">{fb.comment}</p>
                <div className="w-[20%] h-fit relative overflow-visible pt-0 mt-0">
                  <img src={fb.image} alt="" className="object-cover " />
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </>
      ))}
      <Pagination
        pageNo={pageNo}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </>
  );
};

export default Feedback;
