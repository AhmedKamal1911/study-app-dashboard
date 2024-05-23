import { useLocation } from "react-router-dom";

const HelmetWrapper = ({ pageTitle, children }) => {
  const location = useLocation();
  return (
    <>
      <div>
        helmet code{" "}
        {location.pathname === "/" ? `HIStudy-${pageTitle}` : pageTitle}
      </div>
      {children}
    </>
  );
};

export default HelmetWrapper;
