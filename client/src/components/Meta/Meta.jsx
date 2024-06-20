import { Helmet } from "react-helmet-async";

const Meta = ({ 
  title = "Rhamseys Garcia", 
  description = "Rhamseys Garcia Portfolio", 
  keywords =  "portfolio, blog, Rhamseys Garcia", 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};


export default Meta;
