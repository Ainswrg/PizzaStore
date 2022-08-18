import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState(null);
  const navigate = useNavigate();

  const BASE_URL = 'https://62a2d5c25bd3609cee5b7a72.mockapi.io/items';

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при загрузке данных");
        navigate('/');
      }
    }
    fetchData();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
