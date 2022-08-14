import React from 'react';
import { useSelector } from 'react-redux';

import { Categories, Sort, PizzaBlock } from '../components';
import Pagination from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const { categoryId, sort, searchValue } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId === 0 ? '' : `category=${categoryId}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    fetch(
      `https://62a2d5c25bd3609cee5b7a72.mockapi.io/items?page=${page}&limit=${4}&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, page]);

  const pizzas = items.map((pizza, index) => <PizzaBlock {...pizza} key={index} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination items={items} page={page} setPage={setPage} />
    </>
  );
};

export default Home;
