import React, { Dispatch, SetStateAction } from 'react'

import { Avatar, List, Space, Checkbox } from 'antd'

type alumno = {
  title: string
  ciclo: string
  grado: string
  avatar: string
  id: string
}

type ListaAlumnosProps = {
  alumnos: alumno[]
  seleccionados: alumno[]
  setSeleccionados: Dispatch<SetStateAction<alumno[]>>
}

const ListaAlumnos: React.FC<ListaAlumnosProps> = (props) => {

  return (
    <List
      size='small'
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 6,
        showSizeChanger: false,
      }}
      itemLayout='horizontal'
      dataSource={props.alumnos}
      renderItem={(item) => (
        <List.Item style={{ paddingTop: '0.1%', paddingBottom: '0.1%' }}>
          <List.Item.Meta
            avatar={
              <Space style={{ marginTop: '6%' }} size={'middle'}>
                <Checkbox checked={props.seleccionados.includes(item)} onChange={(e) => {
                  if (e.target.checked) {
                    props.setSeleccionados([...props.seleccionados, item])
                  } else {
                    props.setSeleccionados(props.seleccionados.filter(function (e) {
                      return e != item
                    }))
                  }
                }} />
                <Avatar size={'large'} src={item.avatar} />
              </Space>
            }
            title={<a>{item.title}</a>}
            description={
              <div style={{ marginLeft: '1%' }}>
                <Space>
                  <div>CI: {item.id}</div>-<div>{item.ciclo}º ciclo</div>-
                  <div>{item.grado}º grado</div>
                </Space>
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default ListaAlumnos
