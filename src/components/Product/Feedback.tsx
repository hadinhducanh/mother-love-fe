import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState<string>();
  return (
    <>
      <div className="feedback d-flex justify-start items-start">
        <div className="avatar mr-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="feedback-content">
          <p>nguyenducson</p>
          <p>rating</p>
          <p>date</p>
          <p>comment</p>
          <img src="https://github.com/shadcn.png" alt="" />
        </div>
      </div>
      <Separator />
    </>
  );
};
export default Feedback;
