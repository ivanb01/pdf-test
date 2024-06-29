import Overlay from '@components/shared/overlay';
import { Button } from '@components/public/Button';

const AgreementOverlay = ({ handleClose, handleAgree }) => {
  return (
    <Overlay title="Application Agreement" handleCloseOverlay={handleClose} className={'max-w-[939px]'}>
      <div className="p-[24px] pt-[4px]">
        <p className="py-[24px]">
          I hereby warrant that all statements set forth above are true.
          <br />
          <br />I understand that a consumer report and/or an investigative consumer report may be requested in
          connection with my prospective or continuing housing and/or employment application through{' '}
          <span className="underline">Oxford Property Group, OPG USA</span>, and its affiliates collectively referred to
          as <span className="underline">"Broker"</span>. I understand that these reports may include information
          concerning my character, employment history, general reputation, personal characteristics, public records
          information, criminal records information, education, qualifications, motor vehicle record, mode of living,
          credit and indebtedness information, and any other information which may reflect upon my potential for tenancy
          or employment gathered from any individual, organization, entity, agency, or another source which may have
          knowledge concerning any such items of information.
          <br />
          <br />
          I understand that I have the right to make a written request, within a reasonable period of time, for complete
          and accurate disclosure of the nature and scope of the investigation requested. I understand that I have the
          right, upon submitting proper identification, to request from Broker the nature and substance of the
          information in the consumer report or investigative consumer report, including the sources of information and
          the recipients of any reports on myself, which Broker has previously obtained about me within a two-year
          period preceding my request.
          <br />
          <br />
          I consent to the delivery of all notices or disclosures required by law via any medium so chosen by the
          property owner or Broker, including but not limited to email or other electronic transmission. I understand
          that all notices shall be deemed received upon being sent.
          <br />
          <br />
          By submitting this application, I certify that I have read and fully understand the disclosures and my rights
          detailed above and authorize Broker to obtain, for the purpose of determining my eligibility for initial or
          continued tenancy, and/or employment a consumer report and/or investigative consumer report and to disclose
          all information obtained by Broker to the landlord, its affiliates, and assigns now and in the future. I also
          certify that I have read and fully understand my rights under the FCRA available at {`${' '}`}
          <span>
            <a
              target="_blank"
              href="https://files.consumerfinance.gov/f/201504_cfpb_summary_your-rights-under-fcra.pdf">
              https://files.consumerfinance.gov/f/201504_cfpb_summary_your-rights-under-fcra.pdf
            </a>
          </span>
        </p>
        <div className="w-full flex justify-end gap-[12px]">
          <Button type="primaryLight" onClick={handleClose}>
            Close
          </Button>
          <Button type="primary" onClick={handleAgree}>
            I agree
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default AgreementOverlay;
