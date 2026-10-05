import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import App from "./App.jsx"
import Home from "./components/Home.jsx"
import Game from './components/Game.jsx';
import Leaderboard from './components/Leaderboard.jsx';

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<Home />} />
      <Route path="game" element={<Game />} />
      <Route path="leaderboard" element={<Leaderboard />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
