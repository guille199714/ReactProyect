import { useState, Dispatch, SetStateAction } from 'react'

import { Card, Space, Select, Input } from 'antd'

import ListaAlumnos from './ListaAlumnos'

const { Search } = Input
const { Option } = Select

type alumno = {
  title: string
  ciclo: string
  grado: string
  avatar: string
  id: string
}

type TarjetaAlumnosProps = {
  data: alumno[]
  seleccionados: alumno[]
  setSeleccionados: Dispatch<SetStateAction<alumno[]>>
}

const TarjetaAlumnos: React.FC<TarjetaAlumnosProps> = (props) => {
  const [alumnosCiclo, setAlumnosCiclo] = useState(props.data)
  const [alumnosBusqueda, setAlumnosBusqueda] = useState(props.data)
  return (
    <Card
      size='small'
      style={{ width: '100%' }}
      title={
        <div style={{ textAlign: 'right' }}>
          <Space size={30} style={{ textAlign: 'left', paddingRight: '5%' }}>
            <Select
              placeholder='Filtrar por ciclo'
              style={{ width: 160 }}
              onChange={(value: string) =>
                setAlumnosCiclo(
                  props.data.filter(function (e) {
                    if (value === '0') {
                      return true
                    } else {
                      return value === e.ciclo
                    }
                  }),
                )
              }
            >
              <Option value='0'>Todos los ciclos</Option>
              <Option value='1'>Primer ciclo</Option>
              <Option value='2'>Segundo ciclo</Option>
              <Option value='3'>Tercer ciclo</Option>
            </Select>
            <Search
              placeholder='Buscar alumnos'
              allowClear
              style={{ width: 260 }}
              onChange={(holder) =>
                setAlumnosBusqueda(
                  props.data.filter(function (e) {
                    if (holder.target.value === '') {
                      return true
                    } else {
                      return e.title.toUpperCase().includes(holder.target.value.toUpperCase())
                    }
                  }),
                )
              }
            />
          </Space>
        </div>
      }
    >
      <ListaAlumnos
        alumnos={alumnosCiclo.filter((value) => alumnosBusqueda.includes(value))} // interseccion de los dos filtros
        seleccionados={props.seleccionados}
        setSeleccionados={props.setSeleccionados}
      />
    </Card>
  )
}

export default TarjetaAlumnos
