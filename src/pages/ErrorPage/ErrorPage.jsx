import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const routeError = useRouteError();
  console.log("error", routeError);
  // TODO: Implement
  return <div>ErrorPage</div>;
};

export default ErrorPage;
