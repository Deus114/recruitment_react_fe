import { Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';

const HomePage = () => {
    return (
        <div className={`${styles["container"]} ${styles["home-section"]}`}>

            <CompanyCard />
            <div style={{ margin: 50 }}></div>
            <Divider />
            <JobCard />
        </div>
    )
}

export default HomePage;