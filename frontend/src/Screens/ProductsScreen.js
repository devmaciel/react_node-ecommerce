import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductScreen from './ProductScreen';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {

  const [modelVisible, setModalVisible] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state => state.productSave); 
  const { loading: loadingSave, sucesss: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingSave, sucesss: successSave, error: errorSave } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if(successSave){
        setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave]);


  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setRating(product.rating);
    setNumReviews(product.numReviews);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({_id: id, name, price, image, brand, category, countInStock, description }));
  }

  const deleteHandler = (product) => {
      dispatch(deleteProduct(product._id));
  }


  return <div className="content content-margined">

    <div className="product-header">
        <h3>Products</h3>
        <button onClick={() => openModal({})}>Create Product</button>
    </div>

    <div className="product-list">

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {products.map(product => (<tr>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button onClick={() => openModal(product)}>Edit</button>
                            <button onClick={() => deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>))}
                </tr>
            </tbody>
        </table>

    </div>

    { modalVisible && 

    <div className="form">
        <form onSubmit={submitHandler} >
        <ul className="form-container">
            <li>
            <h2>Create Product</h2>
            </li>
            <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{error}</div>}
            </li>

            <li>
            <label htmlFor="name">
                Name
            </label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="price">
                Price
            </label>
            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="image">
                Image
            </label>
            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="brand">
                Brand
            </label>
            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="countInStock">
                Count in Stock
            </label>
            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="category">
                Category
            </label>
            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            </input>
            </li>

            <li>
            <label htmlFor="description">
                Description
            </label>
            <textarea type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)}>
                {description}
            </textarea>
            </li>

            <li>
                <button type="submit" className="button primary">{_id ? "Update" : "Create"}</button>
            </li>
            
            <li>
                <button type="submit" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
            </li>

        </ul>
        </form>
    </div> 
    }

  </div>

}
export default ProductScreen;