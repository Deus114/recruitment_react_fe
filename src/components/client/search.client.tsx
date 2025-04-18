import { Button, Col, Form, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { useState } from 'react';
interface IProps {
    setQs: (v: string) => void;
}
const SearchClient = (prop: IProps) => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();
    const { setQs } = prop;
    const [location, setLocation] = useState<string>("");
    const [skills, setSkills] = useState<string>("");

    const onChangeLocation = (values: string[]) => {
        let l = values.join(',');
        setLocation(`&location=${l}`);
    }

    const onChangeSkills = (values: string[]) => {
        let s = values.join(',');
        setSkills(`&skills=${s}`);
    }

    const onFinish = async () => {
        setQs(`${location}${skills}`);
    }

    return (
        <ProForm
            form={form}
            onFinish={onFinish}
            submitter={
                {
                    render: () => <></>
                }
            }
        >
            <Row gutter={[20, 20]}>
                <Col span={24}><h2>Việc Làm IT Cho Developer "Chất"</h2></Col>
                <Col span={24} md={16}>
                    <ProForm.Item
                        name="skills"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <MonitorOutlined /> Tìm theo kỹ năng...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsSkills}
                            onChange={(values) => {
                                onChangeSkills(values);
                            }}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} md={4}>
                    <ProForm.Item name="location">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <EnvironmentOutlined /> Địa điểm...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsLocations}
                            onChange={(values) => {
                                onChangeLocation(values);
                            }}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} md={4}>
                    <Button type='primary' onClick={(value) => {
                        onFinish()
                    }
                    }>Search</Button>
                </Col>
            </Row>
        </ProForm>
    )
}
export default SearchClient;