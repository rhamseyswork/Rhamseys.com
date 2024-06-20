import { Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Products/Product';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message.jsx' 
import Paginate from '../components/Paginate/Paginate';
import ProductCarousel from '../components/Products/ProductCarousel.jsx';
import Meta from '../components/Meta/Meta.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function Merch() {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
  
  return (
    <>
    {isLoading ? (
      <Loader />
    ) : error ? (<Message variant={'danger'}>{ error?.data?.message || error.error}</Message>) : (
    <>
        <Meta title="Shop Ryan Mitch MP3"/>
        <h1>Latest Products</h1>
        {!keyword ? <ProductCarousel /> : <Button as={Link} to="/merch" className='btn btn-dark mb-4'>Go Back</Button> }
        <Row style={{justifyContent: 'center', width: 'inherit'}}>
          {data.products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} style={{display: 'content'}}/>
            </Col>
          ))}
        </Row>
        <Paginate 
        pages={data.pages} 
        page={data.page}
        keyword={keyword ? keyword : ''}
        />

        {keyword && data.pages < 1 && <Message variant={'info'}>No products found</Message>}
        </>
      )}
      </>
  );
}

export default Merch;