// frontend/src/screens/CategoriesScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CategoriesScreen.css';

// Actions
import { getProducts } from '../redux/actions/productActions';

const CategoriesScreen = () => {
  const dispatch = useDispatch();

  const getProductsState = useSelector(state => state.getProducts);
  const { products, loading, error } = getProductsState;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="categories-screen">
      <h2>Categories</h2>
      <div className="categories">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          categories.map(category => (
            <Link to={`/category/${category}`} key={category} className="category-card">
              <h3>{category}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesScreen;