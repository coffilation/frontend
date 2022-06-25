import * as pages from 'pages'
import { Path } from 'shared/config'

import { Paths } from './routing'

export const paths: Paths = [
  { path: Path.Collections, component: pages.CollectionsPage, default: true },
  { path: Path.User, component: pages.UserPage },
]
