import { App, Button, Col, Form, Input, Modal, Row, Select, Table, Tabs, message, notification } from "antd";
import { isMobile } from "react-device-detect";
import type { TabsProps } from 'antd';
import { IResume } from "@/types/backend";
import { useState, useEffect } from 'react';
import { callFetchResumeByUser, callGetSubscriberSkills, callUpdateSubscriber, callUpdateUserInfo, callUpdateUserPasswordApi } from "@/config/api";
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { MonitorOutlined } from "@ant-design/icons";
import { SKILLS_LIST } from "@/config/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormProps } from "antd/lib";
import { fetchAccount, setLogoutAction } from "@/redux/slice/accountSlide";
import { useNavigate } from "react-router-dom";

interface IProps {
    open: boolean;
    onClose: (v: boolean) => void;
}

const UserResume = (props: any) => {
    const [listCV, setListCV] = useState<IResume[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            setIsFetching(true);
            const res = await callFetchResumeByUser();
            if (res && res.data) {
                setListCV(res.data as IResume[])
            }
            setIsFetching(false);
        }
        init();
    }, [])

    const columns: ColumnsType<IResume> = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        {(index + 1)}
                    </>)
            }
        },
        {
            title: 'Công Ty',
            dataIndex: ["companyId", "name"],

        },
        {
            title: 'Vị trí',
            dataIndex: ["jobId", "name"],

        },
        {
            title: 'Trạng thái',
            dataIndex: "status",
        },
        {
            title: 'Ngày rải CV',
            dataIndex: "createdAt",
            render(value, record, index) {
                return (
                    <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
        },
        {
            title: '',
            dataIndex: "",
            render(value, record, index) {
                return (
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/images/resume/${record?.url}`}
                        target="_blank"
                    >Chi tiết</a>
                )
            },
        },
    ];

    return (
        <div>
            <Table<IResume>
                columns={columns}
                dataSource={listCV}
                loading={isFetching}
                pagination={false}
            />
        </div>
    )
}

type FieldTypeUserInfo = {
    _id: string;
    name: string;
    email: string;
}

const UserUpdateInfo = () => {
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.account.user);
    const [isubmit, setIsSubmit] = useState<boolean>(false);
    const { message, notification } = App.useApp();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                _id: user._id,
                email: user.email,
                name: user.name,
            })
        }
    }, [user])

    const onFinish: FormProps<FieldTypeUserInfo>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { _id, name } = values;

        const res = await callUpdateUserInfo(
            _id, name
        )

        console.log(res);

        if (res && res.data) {
            dispatch(fetchAccount());
            message.success('Cập nhật thành công!');
            localStorage.removeItem("access_token")
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message
            })
        }

        setIsSubmit(false);
    }

    return (
        <div >
            <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col sm={24} md={12} >
                    <Form
                        form={form}
                        name="user-info"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<FieldTypeUserInfo>
                            labelCol={{ span: 24 }}
                            label="_id"
                            name="_id"
                            hidden
                        >
                            <Input disabled hidden />
                        </Form.Item>
                        <Form.Item<FieldTypeUserInfo>
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Hãy nhập email người dùng!' }]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item<FieldTypeUserInfo>
                            labelCol={{ span: 24 }}
                            label="Tên người dùng"
                            name="name"
                            rules={[{ required: true, message: 'Hãy nhập tên người dùng!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => form.submit()} type="primary">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

const JobByEmail = () => {
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.account.user);

    useEffect(() => {
        const init = async () => {
            const res = await callGetSubscriberSkills();
            if (res && res.data) {
                form.setFieldValue("skills", res.data.skills);
            }
        }
        init();
    }, [])

    const onFinish = async (values: any) => {
        const { skills } = values;
        const res = await callUpdateSubscriber({
            email: user.email,
            name: user.name,
            skills: skills ? skills : []
        });
        if (res.data) {
            message.success("Cập nhật thông tin thành công");
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }

    }

    return (
        <>
            <Form
                onFinish={onFinish}
                form={form}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Form.Item
                            label={"Kỹ năng"}
                            name={"skills"}
                            rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 skill!' }]}

                        >
                            <Select
                                mode="multiple"
                                allowClear
                                showArrow={false}
                                style={{ width: '100%' }}
                                placeholder={
                                    <>
                                        <MonitorOutlined /> Tìm theo kỹ năng...
                                    </>
                                }
                                optionLabelProp="label"
                                options={SKILLS_LIST}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button onClick={() => form.submit()}>Cập nhật</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

type FieldTypeChangePass = {
    email: string;
    oldPassword: string;
    newPassword: string
}

const ChangePassword = () => {
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.account.user);
    const [isubmit, setIsSubmit] = useState<boolean>(false);
    const { message, notification } = App.useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                email: user.email,
            })
        }
    }, [user])

    const onFinish: FormProps<FieldTypeChangePass>['onFinish'] = async (values) => {
        setIsSubmit(true);
        const { email, oldPassword, newPassword } = values;

        const res = await callUpdateUserPasswordApi(
            email, oldPassword, newPassword
        )

        if (res && res.data) {
            message.success('Cập nhật thành công! Vui lòng đăng nhập lại');
            localStorage.removeItem("access_token");
            dispatch(setLogoutAction({}));
            navigate("/login");
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra!',
                description: res.message
            })
        }

        setIsSubmit(false);
    }

    return (
        <div>
            <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col sm={24} md={12} >
                    <Form
                        form={form}
                        name="user-info"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item<FieldTypeChangePass>
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Hãy nhập email người dùng!' }]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item<FieldTypeChangePass>
                            labelCol={{ span: 24 }}
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            rules={[{ required: true, message: 'Hãy nhập Mật khẩu cũ!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldTypeChangePass>
                            labelCol={{ span: 24 }}
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: 'Hãy nhập Mật khẩu mới!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => form.submit()} type="primary">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

const ManageAccount = (props: IProps) => {
    const { open, onClose } = props;

    const onChange = (key: string) => {
        // console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'user-resume',
            label: `Rải CV`,
            children: <UserResume />,
        },
        {
            key: 'email-by-skills',
            label: `Nhận Jobs qua Email`,
            children: <JobByEmail />,
        },
        {
            key: 'user-update-info',
            label: `Cập nhật thông tin`,
            children: <UserUpdateInfo />,
        },
        {
            key: 'user-password',
            label: `Thay đổi mật khẩu`,
            children: <ChangePassword />,
        },
    ];


    return (
        <>
            <Modal
                title="Quản lý tài khoản"
                open={open}
                onCancel={() => onClose(false)}
                maskClosable={false}
                footer={null}
                destroyOnClose={true}
                width={isMobile ? "100%" : "1000px"}
            >

                <div style={{ minHeight: 400 }}>
                    <Tabs
                        defaultActiveKey="user-resume"
                        items={items}
                        onChange={onChange}
                    />
                </div>

            </Modal>
        </>
    )
}

export default ManageAccount;