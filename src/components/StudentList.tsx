import React from 'react'
import {CloseOutlined } from "@ant-design/icons";
import {Button, List} from 'antd';
import VirtualList from 'rc-virtual-list';

type RecordType = {
    key: string
    title: string
}

  type StudentListProps = {
    students: RecordType[],
    setSelectedStudent: (value: RecordType) => void,
    removeStudent: (value: RecordType) => void,
  }

const StudentList:React.FC<StudentListProps> = (props) =>{
    const addNewStudentToList = (item: RecordType) => {
        props.setSelectedStudent(item)
      }

    const {students, setSelectedStudent, removeStudent} = props


    return(
        <>
            <List bordered
            style={{ width: '100%' }}
            >
                <VirtualList
                    data={props.students}
                    height={150}
                    itemHeight={50}
                    itemKey="title"
                    style={{ padding: '1vh 0.8vw' }}
                >
                    {(item: RecordType) => (
                        <List.Item
                            key={item.title}
                            style={{ textAlign: 'center', cursor: 'pointer', border: '1px solid #f0f0f0' }}
                        >
                            <List.Item.Meta
                            title={item.title}
                            />
                            {
                            <Button type="primary" 
                                style={{position: 'absolute', marginLeft: '30vw' }} 
                                onClick={() => props.removeStudent(item)} 
                                key={item.title} 
                                danger 
                                shape="circle" 
                                size={"small"} 
                                icon={<CloseOutlined />} 
                                />
                            }
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </>
    )
}

export default StudentList;
