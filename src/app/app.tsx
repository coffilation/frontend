import 'leaflet/dist/leaflet.css'
import 'antd/dist/antd.min.css'
import 'swiper/css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Path } from 'shared/config'
import { MapPage } from 'pages/map'
import { Discovery } from 'widgets/discovery/ui'
import { Places } from 'widgets/places/ui'
import { Place } from 'widgets/place/ui'
import { Login } from 'pages/login/ui'
import { ProfileRedirect } from 'features/profile-redirect/ui'
import { Profile } from 'pages/profile/ui'

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
      <Route path='*' element={<Navigate to={Path.Map} replace />} />
    </Routes>
  )
}

export default App
