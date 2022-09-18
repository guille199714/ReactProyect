import React, {Dispatch, SetStateAction} from "react";

import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import {Button, List} from 'antd';
import VirtualList from 'rc-virtual-list';

import '../utils/ParentList.css'
import {RecordType} from '../utils/fetch-data'

/*  type ParentListProps = {
    
    parents: String[]
    selected: String[]
    setSelectedParents: Dispatch<SetStateAction<[]>>
  } */

  type StudentListProps = {
    students: RecordType[],
    setSelectedStudent: (value: RecordType) => void,
    removeStudent: (value: RecordType) => void,
  }

const StudentList:React.FC<StudentListProps> = (props) =>{
    /*  {parents = ['Pablo Rodriguez', 'Elena Fernandez']}*/

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
                    style={{ position:'absolute', padding: '1vh 0.8vw' }}
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
                            (<Button type="primary" style={{position: 'absolute', marginTop: '-3.4vh', marginLeft: '12vw' }} onClick={() => props.removeStudent(item)} key={item.title} danger shape="circle" size={"small"} icon={<CloseOutlined />} />)
                            }
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </>
    )


    /*
    return(
        <>
            <div className="ParentList">
                {parents.map((parent, index) =>
                    <div key={index} className="content">
                        <div className="ParentName" >
                            <p className="text">{parent}</p>
                        </div>
                        <div className="DeleteParentButton">
                            <Button type="primary" shape="circle" icon={<CloseOutlined/>} danger style={{margin: "20px"}}/>
                        </div>
                    </div>
                )}
            </div>
            <div className="AddParentButton">
                <Button className="addBtn" color="currentColor">+</Button>
            </div>
        </>
    )

    */
}

export default StudentList;
