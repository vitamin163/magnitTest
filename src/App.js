import './App.css';
import { Form, Table } from './components';

const App = () => (
 <div className="App">
    <h1>Тестовое задание</h1>
    <a className='App__link' target='_blank' href='https://codeforces.com/ratings' rel="noreferrer">Рейтинг пользователей codeforces.com</a>
    <Form />
    <Table />
 </div>
);

export default App;
