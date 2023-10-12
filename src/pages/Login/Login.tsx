import axios from 'axios';
import styles from './login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = `mutation Mutation {
        login(username: "${name}", password: "${password}") {
            username
            password
            token
        }
        }`;

    await axios
      .post(
        'https://graphql-demo.dev.aicall.ru/graphql',
        {
          query: user,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((resp) => {
        setToken(resp.data.data.login.token);
      })
      .catch(() => alert('Убедитесь, что данные введены верно!'));
  };

  useEffect(() => {
    if (token === '') return;
    localStorage.setItem('token', token);
  }, [token]);

  return token !== '' ? (
    <Navigate to='/dashboard' />
  ) : (
    <div className={styles.root}>
      <h1 className={styles.title}>Вход</h1>
      <h2 className={styles.subTitle}>
        Уникальная технология <br /> доступна для вашего бизнеса уже сейчас
      </h2>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.inp}
          type='text'
          placeholder='Логин'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.inp}
          type='text'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btn} type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
}

// curl --request POST \
// --url http://172.19.0.2:8080/graphql \
// --header 'Authorization: Bearer ee7fbd80-a9ac-4dcf-8e43-7c98a969c34c' \
// --data '{"query":"{User{id,username}}"}'

// curl 'https://graphql-demo.dev.aicall.ru/graphql'
// -H 'Accept-Encoding: gzip, deflate, br' - H 'Content-Type: application/json' - H 'Accept: application/json' - H 'Connection: keep-alive' - H 'DNT: 1'
//     - H 'Origin: https://graphql-demo.dev.aicall.ru'
// --data - binary

('{"query":"mutation Mutation {login(username: "UserOne", password: "pass") {username password token}}');

// query Query {
//       me {
//         username
//     password
//     token
//   }
// }
// "}' --compressed
