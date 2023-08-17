import React, { useState } from 'react'
import type { ColumnType } from 'antd/es/table'
import { Form, Button, Table, Select, Switch, InputNumber, Input, DatePicker, Radio, Checkbox, Card, Popconfirm, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting'
import { tableData, DataItem } from './data'

type CellType = 'number' | 'text' | 'radio' | 'date' | 'select' | 'checkbox' | 'switch'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  cellType: CellType
  record: DataItem
  index: number
  children: React.ReactNode
}

const theadMap = {
  key: '数字输入框',
  name: '输入框',
  sex: '单选框',
  birth: '日期选择框',
  education: '选择器',
  hobby: '多选框',
  forbid: '开关',
  action: '按钮'
}

const nodeType = (type: CellType) => {
  switch (type) {
    case 'number':
      return <InputNumber />
    case 'text':
      return <Input />
    case 'radio':
      return <Radio.Group />
    case 'date':
      return <DatePicker />
    case 'select':
      return <Select />
    case 'checkbox':
      return <Checkbox.Group />
    case 'switch':
      return <Switch />
  }
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  cellType,
  record,
  index,
  children,
  ...restProps
}) => {
  const cellNode = nodeType(cellType)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
        >
          {cellNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const TableEditRow: React.FC = () => {
  const { Column } = Table

  const [form] = Form.useForm()
  const [data, setData] = useState(tableData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: DataItem) => record.key === editingKey

  const edit = (record: Partial<DataItem> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', sex: '', birth: '', education: '', hobby: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataItem

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  return (
    <PageWrapper plugin={TABLE_EDIT_COMPO}>
      <Card bordered={false}>
        <Table
          dataSource={tableData}
          pagination={false}
        >
          <Column
            title={
              () => (
                <>
                  <span>编号</span>
                  <p className='sub-title'>(数字输入框)</p>
                </>
              )
            }
            dataIndex='key'
            align='center'
            width={70}
            sorter
            render={
              (text, record: any) => (
                record.editable
                ? <InputNumber
                    defaultValue={record.key}
                    onChange={(value) => record.key = value}
                    min={1000}
                    max={2000}
                  />
                : <span>{text}</span>
              )
            }
          />
        </Table>
      </Card>
    </PageWrapper>
  )
}

export default TableEditRow