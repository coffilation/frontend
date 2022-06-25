import React from 'react'
import 'leaflet/dist/leaflet.css'
import 'antd/dist/antd.min.css'
import { Layout } from 'widgets/layout/ui/layout/layout'
import { Routing } from 'app/routing/routing'
import { paths } from 'app/routing/paths'

export const App = () => {
  return (
    <Layout>
      <Routing paths={paths} />
    </Layout>
  )
}

export default App
