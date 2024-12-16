import React from "react";
import { Descriptions } from "antd";
import  dayjs  from "dayjs";

function DescriptionPerson(props) {
  const { person } = props;
  return (
    <Descriptions column={3}>
             <Descriptions.Item label="Họ và tên">
               {person.name}
             </Descriptions.Item>
             <Descriptions.Item label="Số điện thoại">
               {person.phone}
             </Descriptions.Item>
             <Descriptions.Item label="CCCD">
               {person.cic}
             </Descriptions.Item>
             <Descriptions.Item label="Ngày sinh">
             {dayjs(person.dob).format("YYYY-MM-DD")}
             </Descriptions.Item>
             <Descriptions.Item label="Quốc tịch">
               {person.nationality}
             </Descriptions.Item>
             <Descriptions.Item label="Giới tính">
               {person.gender}
             </Descriptions.Item>
             <Descriptions.Item label="Nghề Nghiệp">
               {person.occupation}
             </Descriptions.Item>
             <Descriptions.Item label="Quê quán">
               {person.hometown}
             </Descriptions.Item>
             <Descriptions.Item label="Dân tộc">
               {person.ethnic}
             </Descriptions.Item>
             <Descriptions.Item label="Trạng Thái">
               {person.status}
             </Descriptions.Item>
             <Descriptions.Item label="Thời gian đến">
             {dayjs(person.movingIn).format("YYYY-MM-DD")}
             </Descriptions.Item>
             {person.movingOut && <Descriptions.Item label="Thời gian đi">{dayjs(person.movingOut).format("YYYY-MM-DD")}</Descriptions.Item>}
    </Descriptions>
  );
}

export default DescriptionPerson;
