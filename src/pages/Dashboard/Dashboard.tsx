import axios from 'axios';
import styles from './dashboard.module.css';
import { useEffect, useState } from 'react';
import { Chart } from './../../components/Chart/Chart';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');

const query = `query getData{
  dashboard{
    scenarios{
      active
      inactive
      completed
    }
    lists{
      active
      inactive
      completed
    }
    dialogs{
      active
      inactive
      completed
    }
  }
                }`;

async function responce(query: string) {
  const resp = await axios.post(
    'https://graphql-demo.dev.aicall.ru/graphql',
    {
      query,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );

  return resp;
}

interface IData {
  scenarios: {
    active: number;
    inactive: number;
    completed: number;
  };
  lists: {
    active: number;
    inactive: number;
    completed: number;
  };
  dialogs: {
    active: number;
    inactive: number;
    completed: number;
  };
}

export function Dashboard() {
  const [data, setData] = useState<IData>();

  useEffect(() => {
    if (!token) window.location.reload();

    responce(query)
      .then((resp) => setData(resp.data.data.dashboard))
      .catch(() => alert('Нет данных'));
  }, []);

  const handleClick = () => {
    localStorage.removeItem('token');
  };

  return (
    data && (
      <div className={styles.root}>
        <div className={styles.charts}>
          <Chart title='Сценарии' data={data.scenarios} />
          <Chart title='Списки' data={data.lists} />
          <Chart title='Диалоги' data={data.dialogs} />
        </div>
        <Link to={'/login'}>
          <button className={styles.btn} onClick={handleClick}>
            Выйти
          </button>
        </Link>
      </div>
    )
  );
}
