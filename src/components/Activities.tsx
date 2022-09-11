import React, { Dispatch, SetStateAction, useState } from 'react'

import { Button, Checkbox, Form, Input, Modal } from 'antd'
import styled from 'styled-components'

const SubmitButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 0;
`

type TestFormProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const TestForm: React.FC<TestFormProps> = (props) => {
  const { setVisible, visible } = props
  const [componentDisabled, setComponentDisabled] = useState(false)

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled)
  }

  const handleSubmit = () => {
    setVisible(false)
  }

  return (
    <Modal title='TestForm' visible={visible} footer={false} onCancel={() => setVisible(false)}>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        onFinish={handleSubmit}
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item label='Chekbox' name='disabled' valuePropName='checked'>
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label='Input'>
          <Input />
        </Form.Item>
        <SubmitButtonContainer>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </SubmitButtonContainer>
      </Form>
    </Modal>
  )
}

export default TestForm
