import { useState } from 'react'

import { Space, Typography, Button } from 'antd'

import TarjetaAlumnos from '../components/TarjetaAlumnos'
import AsignActivities from '../components/AsignActivities'

const { Title } = Typography

/* lista hardcodeada de alumnos para prueba */
const data = Array.from({ length: 50 }).map((_, i) => ({
  title: `Alumno nro ${i + 1}`,
  ciclo: Math.floor(Math.random() * 3 + 1).toString(),
  grado: Math.floor(Math.random() * 6 + 1).toString(),
  avatar: 'https://cdn-icons-png.flaticon.com/512/599/599305.png',
  id: `5.${Math.floor(Math.random() * 900 + 100)}.${Math.floor(
    Math.random() * 900 + 100,
  )}-${Math.floor(Math.random() * 10)}`,
}))

type alumno = {
  title: string
  ciclo: string
  grado: string
  avatar: string
  id: string
}

const Alumnos: React.FC = () => {
  const arr: alumno[] = []
  const [seleccionados, setSeleccionados] = useState(arr)
  const [visibleEditModal, setVisibleEditModal] = useState(false)

  const handleEdit = () => {
    setVisibleEditModal(true)
  }
  return (
    <div>
      <Title level={4} style={{ textAlign: 'right', marginBottom: '2%', marginRight: '3%' }}>
        <Space>
          Asignar actividades:
          <Button type='primary' disabled={seleccionados.length === 0 } onClick={handleEdit}>
            Para hacer
          </Button>
          <Button type='primary' disabled={seleccionados.length === 0} onClick={handleEdit}>
            Para presentar
          </Button>
        </Space>
      </Title>
      <AsignActivities setVisible={setVisibleEditModal} visible={visibleEditModal} />
      <TarjetaAlumnos
        data={data}
        seleccionados={seleccionados}
        setSeleccionados={setSeleccionados}
      />
    </div>
  )
}

export default Alumnos
