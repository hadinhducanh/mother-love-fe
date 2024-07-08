import { Loader } from "./Loader";

const Loading = () => {
  return (
    <div
      className="d-flex justify-center items-center"
      style={{ width: "100vw" }}
    >
      <Loader />
    </div>
  );
};

export default Loading;
