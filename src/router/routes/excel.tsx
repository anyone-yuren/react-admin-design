import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'
import ImportExcel from '@/views/excel/import-excel'

// excel module page
const ExcelRoute: RouteObject = {
  path: '/excel',
  element: <BasicLayout />,
  meta: {
      title: 'Excel',
      icon: 'excel',
      orderNo: 10
  },
  children: [
      {
          path: 'export-excel',
          element: <Home />,
          meta: {
              title: '导出Excel',
              key: 'exportExcel'
          }
      },
      {
          path: 'import-excel',
          element: <ImportExcel />,
          meta: {
              title: '导入Excel',
              key: 'importExcel'
          }
      }
  ]
}

export default ExcelRoute