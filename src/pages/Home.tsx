/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';

import { selectFilter, setCategoryId, setCurrentPage, setFilters, SortPropertyEnum } from '../redux/slices/filterSlice';
import { fetchPizzas, IPizza, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { Categories, Sort, PizzaBlock } from '../components';
import Pagination from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
// import { sortList } from '../components/Sort';
import { Status } from '../@types/enums';
import { useAppDispatch } from '../redux/store';

type TPizzaProps = {
  items: IPizza[];
  status: string;
};

type TFilterProps = {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: SortPropertyEnum;
  };
  searchValue: string;
  currentPage: number;
};

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isMounted = React.useRef(false);

  const { items, status }: TPizzaProps = useSelector(selectPizzaData);
  const { categoryId, currentPage, sort, searchValue }: TFilterProps = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((id: number): void => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number): void => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sortProp = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         categoryId: params.category,
  //         sort: sortProp || sortList[0],
  //         searchValue: params.search,
  //         currentPage: Number(params.currentPage),
  //       })
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте позже или воспользуйтесь поиском.</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
