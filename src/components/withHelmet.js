import { Helmet } from "react-helmet-async";

const withHelmet = (PageComponent, pageTitle) => {
  // i can't use hooks because im in normal function
  function NewComponent() {
    // i can use hooks  because im inside functional component
    return (
      <>
        <Helmet>
          <title>HiStudy | {pageTitle}</title>
        </Helmet>
        <PageComponent />
      </>
    );
  }
  return NewComponent;
};
export default withHelmet;
