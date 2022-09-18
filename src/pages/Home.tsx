import React, { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

import Title1 from '../components/Title'
import CreateParent from '../components/CreateParent'
import CreateParentModal from '../components/CreateParentModal'

const Home: React.FC = () => {
  const [visibleEditModal, setVisibleEditModal] = useState(false)

  const handleEdit = () => {
    setVisibleEditModal(true)
  }

  return (
    <>
      <Divider orientation='right' orientationMargin='0'>
        <EditOutlined onClick={handleEdit} />
      </Divider>
      {/*<TestForm setVisible={setVisibleEditModal} visible={visibleEditModal} />*/}
      {/*<CreateTeacher setVisible={setVisibleEditModal} visible={visibleEditModal}/>*/}
      {/* <CreateParent setVisible={setVisibleEditModal} visible={visibleEditModal}/> */}  
        <CreateParentModal setVisible={setVisibleEditModal} visible={visibleEditModal}/>
      <Title1 text='Esto es un titulo'/>
    </>
  )
}

export default Home
