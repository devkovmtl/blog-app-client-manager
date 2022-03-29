import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import PostList from './components/PostList';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<PostList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
