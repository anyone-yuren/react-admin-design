import { lazy } from '@loadable/component'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import OrgTree from '@/views/tree/org-tree'
import AntdTree from '@/views/tree/antd-tree'

// tree module page
const TreeRoute: RouteObject = {
  path: '/tree',
  name: 'Tree',
  element: <LayoutGuard />,
  meta: {
    title: '树形结构',
    icon: 'tree',
    orderNo: 9
  },
  children: [
    {
      path: 'org-tree',
      name: 'OrgTree',
      // element: <OrgTree />,
      element: LazyLoad(lazy(() => import('@/views/tree/org-tree'))),
      meta: {
        title: '组织树',
        key: 'orgTree'
      }
    },
    {
      path: 'antd-tree',
      name: 'AntdTree',
      // element: <AntdTree />,
      element: LazyLoad(lazy(() => import('@/views/tree/antd-tree'))),
      meta: {
        title: '控件树',
        key: 'antdTree'
      }
    }
  ]
}

export default TreeRoute
