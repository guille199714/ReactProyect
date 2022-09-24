import React from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { List, Button } from 'antd'
import VirtualList from 'rc-virtual-list'

type ActivitiesListProps = {
  data: RecordType[]
  isSelectedActivity?: boolean
  setRecord: (value: RecordType) => void
  removeRecord: (value: RecordType) => void
}

type RecordType = {
  title: string
  area: string
  materia: string
  secuencia: string
  unidad: string
}

const ActivitiesList: React.FC<ActivitiesListProps> = (props) => {
  const addNewValueToList = (item: RecordType) => {
    props.setRecord(item)
  }

  return (
    <List bordered>
      <VirtualList
        data={props.data}
        height={400}
        itemHeight={50}
        itemKey='title'
        style={{ padding: '1vh 0.8vw' }}
      >
        {(item: RecordType) => (
          <List.Item
            onClick={() => addNewValueToList(item)}
            key={item.title}
            style={{ textAlign: 'center', cursor: 'pointer', border: '1px solid #f0f0f0' }}
          >
            <List.Item.Meta title={item.title} />
            {props.isSelectedActivity && (
              <Button
                type='primary'
                style={{ position: 'absolute', marginTop: '-3.4vh', marginLeft: '12vw' }}
                onClick={() => props.removeRecord(item)}
                key={item.title}
                danger
                shape='circle'
                size={'small'}
                icon={<CloseOutlined />}
              />
            )}
          </List.Item>
        )}
      </VirtualList>
    </List>
  )
}

export default ActivitiesList
