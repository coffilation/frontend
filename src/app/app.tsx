import React from 'react'
import 'leaflet/dist/leaflet.css'
import 'antd/dist/antd.min.css'
import 'swiper/css'
import 'react-spring-bottom-sheet/dist/style.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Path } from 'shared/config'
import { MapPage } from 'pages/map'

export const App = () => {
  return (
    <Routes>
      <Route path={Path.Map} element={<MapPage />} />
      <Route path='*' element={<Navigate to={Path.Map} replace />} />
    </Routes>
  )
}

export default App
