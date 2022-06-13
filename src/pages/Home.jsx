import React from 'react';
import { SearchContext } from '../App';

import { Categories, Sort, PizzaBlock } from '../components';
import Pagination from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
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
  }, [categoryId, sortType, searchValue, page]);

  const pizzas = items
  .map((pizza, index) => (
    <PizzaBlock {...pizza} key={index} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination items={items} page={page} setPage={setPage} />
    </>
  );
};

export default Home;
