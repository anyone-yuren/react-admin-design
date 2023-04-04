import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

const HomeRoute: AppRoute[] = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
        meta: {
					title: '首页',
					key: 'home'
				}
      }
    ]
  }
]

export default HomeRoute