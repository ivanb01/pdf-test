'use client';
import styles from './styles.module.scss';
import Lottie from 'lottie-react';
import Image from 'next/image';
import monitorCampaigns from '../../../assets/animations/monitor-campaigns.json';
import runCampaign1 from '/public/images/public/run-campaign-1.png';
import runCampaign2 from '/public/images/public/run-campaign-2.png';
import campaignReport1 from '/public/images/public/campaign-reports-1.png';
import campaignReport2 from '/public/images/public/campaign-reports-2.png';
import createCampaign1 from '/public/images/public/create-campaign-1.png';
import createCampaign2 from '/public/images/public/create-campaign-2.png';


const SectionMonitorCampaigns = () => {
  return (
    <div className={styles.section}>
      <div className="container-public">
        <div className={styles['section__text']}>
          <h3>Monitor your campaigns</h3>
          <p>“Good clients are result of good campaigns”</p>
        </div>
        <div className={styles['section__images']}>
          <div className={styles['section__images-animation']}>
            <Lottie animationData={monitorCampaigns} />
          </div>
          <div className={styles['section__middle-wrapper']}>
            <div className={styles['section__images-run-campaign']}>
              <Image src={runCampaign1} alt="run campaign image title"/>
              <Image src={runCampaign2} alt="run campaign image" />
            </div>
            <div className={styles['section__images-campaign-reports']}>
              <Image src={campaignReport1} alt="campaign reports image title"/>
              <Image src={campaignReport2} alt="campaign reports image" />
            </div>
          </div>
          <div className={styles['section__images-create-campaign']}>
            <Image src={createCampaign1} alt="create campaign image title"/>
            <Image src={createCampaign2} alt="create campaign image" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default SectionMonitorCampaigns;
