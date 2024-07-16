import { useState } from "react";
import Banner from "../components/Banner";
import { Brand } from "../components/Brand";
import { useAuth } from "@/context/auth/AuthContext";
import agent from "@/api/agent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

export const Contact = () => {
  const { userId, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState({
    content: "",
    reportType: 0, // Default to "About website"
    response: "",
    image: "",
    reason: "",
    questioner: {
      userId: userId,
    },
    answerer: {
      userId: 2, // Adjust this according to your needs
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await agent.Reports.createReport(reportData);
      toast.success("Report created successfully!", {});
      setReportData((prevData) => ({
        ...prevData,
        content: "",
      }));
    } catch (error) {
      console.error("Error creating report:", error);
      toast.error("Failed to create report.", {});
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitEvent = e as unknown as SubmitEvent; // Type assertion to handle SubmitEvent
    const submitButton = submitEvent.submitter as HTMLInputElement; // Type assertion to handle HTMLInputElement
    if (submitButton?.value === "Send") {
      handleSubmit(e);
    } else {
      navigate("/login-register");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      <Banner
        pageName={"Report"}
        singleName={"Report"}
        pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
      />
      <div>
        {/* Contact Section Start */}
        <div className="page-section section section-padding">
          <div className="container">
            <div className="row row-30 mbn-40">
              <div className="contact-form-wrap col-md-6 col-12 mb-40">
                <h3>Report</h3>
                <form id="contact-form" onSubmit={handleFormSubmit}>
                  <div className="contact-form">
                    <div className="row">
                      <div className="col-12 mb-30">
                        <textarea
                          name="content"
                          placeholder="Report Content"
                          value={reportData.content}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12 mb-30">
                        <p style={{fontWeight:600}}>Report type</p>
                        <select
                          name="reportType"
                          value={reportData.reportType}
                          onChange={handleInputChange}
                        >
                          <option value={0}>About website</option>
                          <option value={1}>About staff</option>
                        </select>
                      </div>
                      <div className="col-12">
                        {isLoggedIn ? (
                          <input type="submit" value="Send" />
                        ) : (
                          <input type="submit" value="Login or register to report" />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                <p className="form-messege" />
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section End */}
      </div>
      <Brand />
    </>
  );
};
