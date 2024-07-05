import { Loader } from "./Loader";

const Loading = () => {
  return (
    <div
      className="d-flex justify-center items-center"
      style={{ width: "50vw" }}
    >
      <Loader />
    </div>
  );
};

export default Loading;
