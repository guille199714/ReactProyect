import React, {createRef, useState, Dispatch, SetStateAction} from 'react';

import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input, Select, Space, Row, Col, Avatar, 
AutoComplete, List} from 'antd';
import type { SelectProps } from 'antd/es/select';
import styled from 'styled-components'

import StudentList from './StudentList';
import {RecordType, mockData} from '../utils/fetch-data'

const ButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  min-widht: 250px
`

const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{display: 'flex',justifyContent: 'space-between'}}>
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });


type CreateStudentProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const CreateStudentModal: React.FC<CreateStudentProps> = (props) => {
  
  /*  const {parents, setSelectedParents} = props*/
  const { setVisible, visible } = props
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const save = () => {
      setModal(false)
  }

  const [studentName, setStudentName] = useState('');
  const [studentSurame, setStudentSurname] = useState('');
  const [studentMail, setStudentMail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const handleSubmitStudent = () => {
    setModal(false)
  }

  const [parentName, setParentName] = useState('');
  const [parentSurame, setParentSurname] = useState('');
  const [parentMail, setParentMail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  
  const handleSubmitParent = () => {
    const newParent : RecordType = { 
      key: parentName + ' ' + parentSurame,
      title: parentName + ' ' + parentSurame,
      description: parentName + ' ' + parentSurame
    }
    
    addParentInSelectedParents (newParent)

    setParentName('')
    setParentSurname('')
    setParentMail('')
    setParentPassword('')

    setComponentDisabled(true)
  }

  const [options, setOptions] = useState<SelectProps<object>['options']>([]);


  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleAddNewParent = () => {
      setComponentDisabled(false)
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const [selectedParents, setSelectedParent] = useState<RecordType[]>([])
  const [parent, setParent] = useState<RecordType[]>(mockData)

  const addParentInSelectedParents = (value: RecordType) => {
    if (selectedParents.includes(value)) {
      return;
    }
    setSelectedParent([...selectedParents, value])
  }


  return (
    <div className="createParent">
      <StyledSpace direction='vertical' size={40} align='center' style={{ backgroundColor: '#fff' }}> 
        <br/><br/>
        <Button type = "primary" onClick = {openModal}> Crear Padre</Button>
      </StyledSpace>  

      <Modal visible={visible} 
        title = "Crear Padre"
        onCancel={() => setVisible(false)}
        onOk = {save}
        width={700}>

          <Row>
            <Col flex={24}>
              <Form
                name='Parent'
                initialValues={{ remember: true }}
                onFinish={ handleSubmitStudent }
                autoComplete='off'
                layout="vertical">

                <Row gutter={[50,10]}>

                  <Col flex={22}>
                    <Form.Item
                        name='ParentName'
                        rules={[{ required: true, message: 'Ingrese un Nombre de Usuario' }]}>
                      <Input
                        placeholder='Nombre'
                        style={{ width: '100%' }}
                        prefix={ <UserOutlined /> }
                        onChange={(event) => {
                          setStudentName(event.target.value)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                        name='ParentSurname'
                        rules={[{ required: true, message: 'Ingrese un Nombre de Usuario' }]}>
                      <Input
                        placeholder='Apellido'
                        style={{ width: '100%' }}
                        prefix={ <UserOutlined /> }
                        onChange={(event) => {
                          setStudentSurname(event.target.value)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                        name='ParentEmail'
                        rules={[
                          { required: true, message: 'Ingrese su Email' }, 
                          { type: 'email', message: 'ingrese un E-mail valido!' }
                        ]}>
                      <Input
                        placeholder='E-mail'
                        style={{ width: '100%' }}
                        prefix={ <UserOutlined /> }
                        onChange={(event) => {
                          setStudentMail(event.target.value)
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                        name='ParentPassword'
                        rules={[{ required: true, message: 'Ingrese una Contraseña' }]}>
                      <Input.Password
                        placeholder='Contraseña'
                        style={{ width: '100%' }}
                        prefix={ <LockOutlined /> }
                        onChange={(event) => {
                          setStudentPassword(event.target.value)
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <p style={{paddingTop:"25px", marginBottom:"0px"}} >Hijo/Pupilo:</p>
                  <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{ width: '100%' }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}>

                    <Input.Search size="large" placeholder="input here" enterButton />
                  </AutoComplete>
                
                  <StudentList
                    students={selectedParents}
                    removeStudent={(value) =>
                      setSelectedParent([...selectedParents.filter((item) => item.title !== value.title)])
                    }
                    setSelectedStudent={() => undefined}
                  />
                   <div className="AddStudentButton">
                      <Button className="addBtn" color="currentColor" onClick={handleAddNewParent}> + </Button>
                   </div>
                </Row>
                <br/>

                <Button type='primary' htmlType='submit' size={"small"}> Guardar </Button>
              </Form>
            </Col>
          </Row>
          &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;
          <div style={{ borderTop: '1.5px solid gray', borderColor: '#f0f0f0', margin: '1% 0% 0% 0%', height: '2vh'}}></div>
          <Row >
            <Col flex={24}>
              <p style={{paddingTop:"25px", marginBottom:"0px"}} > Crear estudiante:</p>  
              <br/>          
              <Form
              name='Student'
              initialValues={{ remember: true }}
              onFinish={handleSubmitParent}
              autoComplete='off'
              layout='vertical'
              disabled={componentDisabled}>

                <Form.Item
                    name='StudentName'
                    rules={[{ required: true, message: 'Ingrese un Nombre de Usuario' }]}>
                  <Input
                    placeholder='Nombre'
                    style={{ width: '100%' }}
                    prefix={<UserOutlined />}
                    onChange={(event) => {
                      setParentName(event.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                    name='StudentSurname'
                    rules={[{ required: true, message: 'Ingrese un Nombre de Usuario' }]}>
                  <Input
                    placeholder='Apellido'
                    style={{ width: '100%' }}
                    prefix={ <UserOutlined /> }
                    onChange={(event) => {
                      setParentSurname(event.target.value)
                    }}
                  />
                </Form.Item>
                
    
                <Form.Item
                    name='StudentEmail'
                    rules={[
                      { required: true, message: 'Ingrese su Email' }, 
                      { type: 'email', message: 'ingrese un E-mail valido!' }
                    ]}>
                  <Input
                    placeholder='Email'
                    style={{ width: '100%' }}
                    prefix={<UserOutlined />}
                    onChange={(event) => {
                      setParentMail(event.target.value)
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                    name='StudentPassword'
                    rules={[{ required: true, message: 'Ingrese una Contraseña' }]}>
                  <Input.Password
                    placeholder='Contraseña'
                    style={{ width: '100%' }}
                    prefix={<LockOutlined />}
                    onChange={(event) => {
                      setParentPassword(event.target.value)
                    }}
                  />
                </Form.Item>
                <Row >
                  <Space direction='vertical' style={{ width: '100%' }}>
                  <Form.Item> 
                    <Select placeholder="Ciclo" style={{ width: '100%' }}>
                      <Select.Option value="Ciclo uno">Ciclo Uno </Select.Option>
                      <Select.Option value="Ciclo dos">Ciclo Dos </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item> 
                    <Select placeholder="Grado" style={{ width: '100%' }}>
                      <Select.Option value="Grado uno">Grado Uno </Select.Option>
                      <Select.Option value="Grado dos">Grado Dos </Select.Option>
                    </Select>
                  </Form.Item> 
                  <Form.Item> 
                    <Select placeholder="Grupo" style={{ width: '100%' }}>
                        <Select.Option value="Grupo uno">Grupo Uno </Select.Option>
                        <Select.Option value="Grupo dos">Grupo Dos </Select.Option>
                    </Select>
                  </Form.Item>
                  </Space>
                </Row>
                <Button style={{float: 'right'}} type='primary' htmlType='submit'disabled={componentDisabled} size={"small"}> Confirmar </Button>
              </Form>
            </Col>
          </Row>
      </Modal>
      
    </div>
  );
}

export default CreateStudentModal;
