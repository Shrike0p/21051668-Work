// src/components/AllProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-paginate';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('price');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; 


  useEffect(() => {
    axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000') 
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;


  const sortedProducts = [...products].sort((a, b) => {
    if (sortField === 'price') {
      return a.price - b.price;
    } else if (sortField === 'rating') {
      return b.rating - a.rating; 
    } else if (sortField === 'discount') {
      return b.discount - a.discount;  
    }
  });

  const displayedProducts = sortedProducts.slice(offset, offset + itemsPerPage);

  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Products</h1>
      <label>Sort by: </label>
      <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="discount">Discount</option>
      </select>
      <ul>
        {displayedProducts.map((product) => (
          <li key={product.productName}>
            <Link to={`/product/${product.productName}`}>
              {product.productName} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default AllProducts;
