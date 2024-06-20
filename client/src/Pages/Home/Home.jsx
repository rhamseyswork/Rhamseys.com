import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ProductCarousel from '../../components/Products/ProductCarousel.jsx';


function Home() {
  const { keyword } = useParams();

  return (
    <>
      {!keyword ? <ProductCarousel/> : <Button as={Link} to="/merch" className='btn btn-dark mb-4'>Go Back</Button> }
    </>
  );
}

export default Home;
