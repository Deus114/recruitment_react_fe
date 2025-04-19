import { callGetDashboard } from "@/config/api";
import { IDashboard } from "@/types/backend";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const DashboardPage = () => {
    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    const [dashboard, setDashboard] = useState<IDashboard>();

    useEffect(() => {
        getDashboard();
    }, [])

    const getDashboard = async () => {
        let res = await callGetDashboard();
        if (res && res.data) setDashboard(res.data);
    }

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={8}>
                <Card title="Người dùng" bordered={false} >
                    <Statistic
                        title="Số người dùng"
                        value={dashboard?.countUser}
                        formatter={formatter}
                    />

                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Công ty" bordered={false} >
                    <Statistic
                        title="Số công ty"
                        value={dashboard?.countCompany}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Công việc" bordered={false} >
                    <Statistic
                        title="Số công việc đã được tạo"
                        value={dashboard?.countJob}
                        formatter={formatter}
                    />
                </Card>
            </Col>

        </Row>
    )
}

export default DashboardPage;