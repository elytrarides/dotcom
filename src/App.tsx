import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './app/Home';
import Support from './app/Support';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/support",
        element: <Support />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App;
