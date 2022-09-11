import React from 'react';

import { Typography } from 'antd';

const { Title } = Typography;

type Title1Props = {
  text: string
}

const Title1: React.FC<Title1Props> = (props) => {
  const { text } = props;
  return (
    <>
      <Title
        type="danger"
      >
        {text}
      </Title>
    </>
  )
}

export default Title1;