import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { useGetTopProductsQuery } from '../../slices/productsApiSlice';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> 
  : (
    <Carousel pause='hover' className='mb-4 text-center'>
        {products.map(product => (
            <Carousel.Item  style={{ width: "100vw"}} key={product._id}>
                <Link to ={`/merch/${product._id}`}>
                    <Image style={{height: '600px'}}src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel