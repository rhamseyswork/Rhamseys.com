import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message/Message.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import Paginate from '../../components/Paginate/Paginate.jsx'
import { 
    useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProductMutation
} from '../../slices/productsApiSlice.js'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './ProductLists.css'

function ProductList() {
    const { pageNumber} = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                await deleteProduct(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if(window.confirm('Are you sure you want to create a product?')) {
           try {
            await createProduct();
            toast.success('Product created successfully');
           } catch (err) {
            toast.error(err?.data?.message || err.error);
           }
        }
    };

  return (
    <div className='Pl-Container'>
    <ToastContainer />
    <Row className='align-items-center'>
      <Col>
        <h1>Products</h1>
      </Col>
      <Col className='text-end'>
        <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
        </Button>
      </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
        <>
        <Table 
        striped 
        bordered 
        hover 
        responsive 
        className='table-sm'
        >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm mx-2'>
                                    <FaEdit />
                                </Button>
                            </LinkContainer>
                            <Button onClick={()=>deleteHandler(product._id)} variant='danger' className='btn-sm'>
                                <FaTrash style={{color: 'white'}}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Paginate 
                pages={data.pages} 
                page={data.page} 
                isAdmin={true} 
                />
        </>
      )}
      <ToastContainer />
    </div>
  )
}

export default ProductList;