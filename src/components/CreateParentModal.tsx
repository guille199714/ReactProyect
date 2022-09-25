import React, { useState, Dispatch, SetStateAction } from 'react';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Modal, Button, Form, Input, Select, Space, Row, Col,
  AutoComplete,
  message
} from 'antd';
import type { SelectProps } from 'antd/es/select';

import StudentList from './StudentList';

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const student = `${query}${idx}`
      return {
        value: student,
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              Found {query} on {' DB'}
              <p>{student}</p>
            </span>
            <span> {getRandomInt(200, 100)} results</span>
          </div>
        ),
      }
    })

type RecordType = {
  key: string
  title: string
}

type CreateParentProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const CreateParentModal: React.FC<CreateParentProps> = (props) => {
  const { setVisible, visible } = props
  const [options, setOptions] = useState<SelectProps<object>['options']>([])
  const [selectedStudents, setSelectedStudent] = useState<RecordType[]>([])
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)

  const [studentForm] = Form.useForm()
  const [parentForm] = Form.useForm()

  const [studentName, setStudentName] = useState('')
  const [searchHijo, setSearchHijo] = useState('')
  const [studentSurname, setStudentSurname] = useState('')
  const [studentMail, setStudentMail] = useState('')
  const [studentPassword, setStudentPassword] = useState('')

  const [parentName, setParentName] = useState('')
  const [parentSurname, setParentSurname] = useState('')
  const [parentMail, setParentMail] = useState('')
  const [parentPassword, setParentPassword] = useState('')

  const closeModal = () => {
    setStudentName('')
    setStudentSurname('')
    setStudentMail('')
    setStudentPassword('')
    setSelectedStudent([])

    setSearchHijo('')

    setParentName('')
    setParentSurname('')
    setParentMail('')
    setParentPassword('')

    parentForm.resetFields()
    studentForm.resetFields()

    setVisible(false)
    setComponentDisabled(true)
  }

  const handleSubmitParent = () => {
    if (selectedStudents.length > 0) {
      setSelectedStudent([])
      parentForm.resetFields()
      studentForm.resetFields()
      setVisible(false)
    } else {
      message.error('Debe Ingresar todos los datos antes de confirmar')
    }
  }

  const handleSubmitStudent = () => {
    if (studentName.length > 0 && studentSurname.length > 0) {
      const newStudent: RecordType = {
        key: studentName + ' ' + studentSurname,
        title: studentName + ' ' + studentSurname,
      }
      addStudentInSelectedStudents(newStudent)
    }

    studentForm.resetFields()

    setStudentName('')
    setStudentSurname('')
    setStudentMail('')
    setStudentPassword('')

    setComponentDisabled(true)
  }

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const handleAddNewStudent = () => {
    setComponentDisabled(false)
  };

  const addStudentInSelectedStudents = (value: RecordType) => {
    if (selectedStudents.findIndex((elem: RecordType) => elem.key === value.key) >= 0) {
      return;
    }

    setSelectedStudent([...selectedStudents, value])
  }

  const onSearchSelect = (value: string) => {
    if (value.length > 0) {
      const newStudent: RecordType = {
        key: value,
        title: value,
      }
      addStudentInSelectedStudents(newStudent)
    }
  }

  return (
    <div className="createParent">
      <Modal 
        visible={visible}
        title="Crear Padre"
        onCancel={() => closeModal()}
        afterClose={() => closeModal()}
        maskClosable = {false}
        footer = {null}
        width={700}>

        <Row>
          <Col flex={24}>
            <Form
              form={parentForm}
              name='Parent'
              initialValues={{ remember: true }}
              onFinish={handleSubmitParent}
              autoComplete='off'
              layout="vertical">

              <Row gutter={[50, 10]}>

                <Col flex={22}>
                  <Form.Item
                    name='ParentName'
                    rules={[{ required: true, message: 'Debe ingresar un Nombre' }]}>
                    <Input
                      placeholder='Nombre'
                      value={parentName}
                      style={{ width: '100%' }}
                      prefix={<UserOutlined />}
                      onChange={(event) => {
                        setParentName(event.target.value)
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name='ParentSurname'
                    rules={[{ required: true, message: 'Debe ingresar un apellido' }]}>
                    <Input
                      placeholder='Apellido'
                      value={parentSurname}
                      style={{ width: '100%' }}
                      prefix={<UserOutlined />}
                      onChange={(event) => {
                        setParentSurname(event.target.value)
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name='ParentEmail'
                    rules={[
                      { required: true, message: 'Debe ingresar un Email' },
                      { type: 'email', message: 'Ingrese un Email valido!' }
                    ]}>
                    <Input
                      value={parentMail}
                      placeholder='E-mail'
                      style={{ width: '100%' }}
                      prefix={<UserOutlined />}
                      onChange={(event) => {
                        setParentMail(event.target.value)
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name='ParentPassword'
                    rules={[{ required: true, message: 'Debe ingresar una Contraseña' }]}>
                    <Input.Password
                      value={parentPassword}
                      placeholder='Contraseña'
                      style={{ width: '100%' }}
                      prefix={<LockOutlined />}
                      onChange={(event) => {
                        setParentPassword(event.target.value)
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <p style={{ paddingTop: "25px", marginBottom: "0px" }} >Hijo/Pupilo:</p>
                <AutoComplete
                  dropdownMatchSelectWidth={252}
                  style={{ width: '100%' }}
                  options={options}
                  onSelect={onSearchSelect}
                  onSearch={handleSearch}
                  value={searchHijo}
                  onChange={(value) => setSearchHijo(value)}
                >

                  <Input.Search size="large" placeholder="input here" enterButton />
                </AutoComplete>

                <StudentList
                  students={selectedStudents}
                  removeStudent={(value) =>
                    setSelectedStudent([...selectedStudents.filter((item) => item.title !== value.title)])
                  }
                  setSelectedStudent={() => undefined}
                />
                <div 
                  className="AddStudentButton"
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    padding: 'auto',
                  }}
                >

                  <Button 
                    className="addBtn" 
                    color="currentColor" 
                    onClick={handleAddNewStudent}
                    style={{
                      width: '100%',
                      height: '3em',
                    }}
                  > 
                    {' '}
                    +{' '}
                  </Button>
                </div>
              </Row>
              <br />

              <Button type='primary' htmlType='submit' style={{ float: 'right' }}> 
                Crear Padre 
              </Button>
            </Form>
          </Col>
        </Row>
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        <div style={{ borderTop: '1px solid black', borderColor: '#f0f0f0', margin: '2% 0% 0% 0%', height: '1vh', width:'100%', }}></div>
        <Row >
          <Col flex={24}>
            <p style={{ paddingTop: "25px", marginBottom: "0px" }} > Crear estudiante:</p>
            <br />
            <Form
              form ={studentForm}
              name='Student'
              initialValues={{ remember: true }}
              onFinish={handleSubmitStudent}
              autoComplete='off'
              layout='vertical'
              disabled={componentDisabled}>

              <Form.Item
                name='StudentName'
                rules={[{ required: true, message: 'Debe ingresar un Usuario' }]}>
                <Input
                  value={studentName}
                  placeholder='Nombre'
                  style={{ width: '100%' }}
                  prefix={<UserOutlined />}
                  onChange={(event) => {
                    setStudentName(event.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item
                name='StudentSurname'
                rules={[{ required: true, message: 'Debe ingresar un apellido' }]}>
                <Input
                  value={studentSurname}
                  placeholder='Apellido'
                  style={{ width: '100%' }}
                  prefix={<UserOutlined />}
                  onChange={(event) => {
                    setStudentSurname(event.target.value)
                  }}
                />
              </Form.Item>


              <Form.Item
                name='StudentEmail'
                rules={[
                  { required: true, message: 'Debe ingresar un Email' },
                  { type: 'email', message: 'Ingrese un Email valido!' }
                ]}>
                <Input
                  placeholder='Email'
                  value={studentMail}
                  style={{ width: '100%' }}
                  prefix={<UserOutlined />}
                  onChange={(event) => {
                    setStudentMail(event.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item
                name='StudentPassword'
                rules={[{ required: true, message: 'Debe ingresar una contraseña' }]}>
                <Input.Password
                  value={studentPassword}
                  placeholder='Contraseña'
                  style={{ width: '100%' }}
                  prefix={<LockOutlined />}
                  onChange={(event) => {
                    setStudentPassword(event.target.value)
                  }}
                />
              </Form.Item>
              <Row >
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Form.Item name="ciclo" rules={[{ required: true, message: 'Debe ingresar un Ciclo' }]}>
                    <Select placeholder="Ciclo" style={{ width: '100%' }} >
                      <Select.Option value="Ciclo uno">Ciclo Uno </Select.Option>
                      <Select.Option value="Ciclo dos">Ciclo Dos </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="grado" rules={[{ required: true, message: 'Debe ingresar un grado' }]}>
                    <Select placeholder="Grado" style={{ width: '100%' }}>
                      <Select.Option value="Grado uno">Grado Uno </Select.Option>
                      <Select.Option value="Grado dos">Grado Dos </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="grupo" rules={[{ required: true, message: 'Debe ingresar un Grupo' }]}>
                    <Select placeholder="Grupo" style={{ width: '100%' }}>
                      <Select.Option value="Grupo uno">Grupo Uno </Select.Option>
                      <Select.Option value="Grupo dos">Grupo Dos </Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
              </Row>
              <Button style={{ float: 'right' }} type='primary' htmlType='submit' disabled={componentDisabled} size={"small"}> Confirmar </Button>
            </Form>
          </Col>
        </Row>
      </Modal>

    </div>
  );
}

export default CreateParentModal;
