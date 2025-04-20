import { Row, Col } from 'antd';
import styles from '@/styles/footer.module.scss';
import {
    MailOutlined,
    PhoneOutlined,
    SendOutlined,
} from '@ant-design/icons';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <Row gutter={[24, 24]} className={styles.row}>
                    <Col xs={24} md={6}>
                        <h3>About Us</h3>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>AI Match Service</li>
                            <li>Contact Us</li>
                            <li>All Jobs</li>
                            <li>FAQ</li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <h3>Campaign</h3>
                        <ul>
                            <li>IT Story</li>
                            <li>Writing Contest</li>
                            <li>Featured IT Jobs</li>
                            <li>Annual Survey</li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <h3>Terms & Conditions</h3>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Operating Regulation</li>
                            <li>Complaint Handling</li>
                            <li>Terms & Conditions</li>
                            <li>Press</li>
                        </ul>
                    </Col>
                    <Col xs={24} md={6}>
                        <h3>Want to post a job? Contact us at:</h3>
                        <ul className={styles.contactList}>
                            <li><PhoneOutlined /> Ho Chi Minh: (+84) 977 000 123</li>
                            <li><PhoneOutlined /> Ha Noi: (+84) 977 000 123</li>
                            <li><MailOutlined /> Email: love@recruitment.com</li>
                            <li><SendOutlined /> Submit contact information</li>
                        </ul>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default Footer;