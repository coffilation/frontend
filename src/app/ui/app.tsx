import 'leaflet/dist/leaflet.css'
import 'antd/dist/antd.min.css'
import 'swiper/css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Path } from 'shared/config'

import { MapPage, Profile, Collections, Login } from './pages'
import { Discovery, Places, Place } from './widgets'
import { ProfileRedirect } from './features'

export const App = () => {
  return (
    <Routes>
      <Route path={Path.Map} element={<MapPage />}>
        <Route index element={<Discovery />} />
        <Route path={Path.MapPlaces} element={<Places />} />
        <Route path={Path.MapPlace} element={<Place />} />
      </Route>
      <Route path={Path.ProfileOwn} element={<ProfileRedirect />}>
        <Route path={Path.Profile} element={<Profile />} />
        <Route path={Path.ProfileLogin} element={<Login />} />
      </Route>
      <Route path={Path.Collections} element={<Collections />} />
      <Route path='*' element={<Navigate to={Path.Map} replace />} />
    </Routes>
  )
}

export default App
