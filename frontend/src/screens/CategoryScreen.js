// frontend/src/screens/CategoryScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CategoryScreen.css';

// Components
import Product from '../components/Product';

// Actions
import { getProductsByCategory } from '../redux/actions/productActions';

const CategoryScreen = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const getProductsState = useSelector(state => state.getProducts);
  const { products, loading, error } = getProductsState;

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);

  return (
    <div className="category-screen">
      <h2>{category}</h2>
      <div className="category-products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map(product => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryScreen;