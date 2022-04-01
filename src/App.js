import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from './context/UserContext';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import ProtectedRoute from './helpers/ProtectedRoute';
import UserIsLoggedIn from './helpers/UserIsLoggedIn';
import Login from './components/Login';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { auth, saveAuth, removeAuth, timer } = useAuth();

  return (
    <UserContext.Provider value={{ auth, saveAuth, removeAuth, timer }}>
      <div>
        <Header />
        <main>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute auth={auth} redirectPath='/login'>
                  <PostList />
                </ProtectedRoute>
              }
            />
            <Route
              path='/add-post'
              element={
                <ProtectedRoute auth={auth} redirectPath='/login'>
                  <AddPost />
                </ProtectedRoute>
              }
            />
            <Route
              path='/login'
              element={
                <UserIsLoggedIn auth={auth} redirectPath='/'>
                  <Login />
                </UserIsLoggedIn>
              }
            />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
