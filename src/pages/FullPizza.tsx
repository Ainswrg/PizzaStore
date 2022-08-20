import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IPizza } from '../redux/pizza/types';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<Omit<IPizza, 'quantity'>>();
  const { id } = useParams();
  const navigate = useNavigate();

  const BASE_URL = 'https://62a2d5c25bd3609cee5b7a72.mockapi.io/items';

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response: AxiosResponse = await axios.get(`${BASE_URL}/${id}`);
        const pizzas: IPizza = response.data;
        setPizza(pizzas);
      } catch (error) {
        alert('Ошибка при загрузке данных');
        navigate('/');
      }
    }
    fetchData();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
