import * as pages from 'pages'
import { Path } from 'shared/config'

import { Paths } from './routing'

export const paths: Paths = [
  { path: Path.Collections, component: pages.CollectionsPage },
  { path: Path.Collection, component: pages.CollectionPage },
  { path: Path.Profile, component: pages.UserPage },
  { path: Path.Map, component: pages.MapPage, default: true },
]
