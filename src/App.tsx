import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Alumnos from './pages/Alumnos'
import Home from './pages/Home'
import Login from './pages/Login'

const AnotherPage = () => <h1>AnotherPage</h1>

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/home'
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path='/planning'
        element={
          <Layout>
            <Alumnos />
          </Layout>
        }
      />
      <Route
        path='/another-page'
        element={
          <Layout>
            <AnotherPage />
          </Layout>
        }
      />
      <Route path='/' element={<Login />}>
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App