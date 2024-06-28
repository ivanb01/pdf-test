import { Document, Page, Text, View, Font, StyleSheet, Image, Svg, Polygon, Rect, Path } from '@react-pdf/renderer';
import {
  TEXT_FORMAT_STYLES,
  JUSTIFY_PARAGRAPH,
  FONTS,
  PDF_PADDING,
  PDF_DOCUMENT_WIDTH,
  HEADER_FOOTER_GAP,
  HEADER_FOOTER_PADDING,
  TOTAL_RATIO,
  PDF_FONT_SIZE,
  COLUMNS_GAP,
  PDF_FORM_ELEMENT,
  PDF_HEADING1_SIZE,
  PDF_HEADING2_SIZE,
  PDF_PARAGRAPH_MARGIN_BOTTOM,
  PDF_LIST_PADDING_LEFT,
  PDF_LIST_ITEM_VERTICAL_PADDING,
  PDF_LIST_ITEM_HORIZONTAL_PADDING,
  PDF_HEADING1_MARGIN_BOTTOM,
  PDF_HEADING2_MARGIN_BOTTOM,
} from '../utils/constants';
import { getAwsFileBlob } from '@api/files';
import { useEffect, useState } from 'react';
import moment from 'moment';

// Font.registerHyphenationCallback((word) => [word]);
Font.register(FONTS);

const styles = StyleSheet.create({
  fontFamily: 'Poppins',
  fontSize: PDF_FONT_SIZE,
});
const LogoOxford = () => {
  return (
    <Svg width="85" height="16" viewBox="0 0 85 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.6307 7.72727C13.6307 9.31345 13.33 10.6629 12.7287 11.7756C12.1321 12.8883 11.3177 13.7382 10.2855 14.3253C9.25805 14.9077 8.10275 15.1989 6.8196 15.1989C5.52699 15.1989 4.36695 14.9053 3.33949 14.3182C2.31203 13.7311 1.5 12.8812 0.903409 11.7685C0.306818 10.6558 0.00852273 9.30871 0.00852273 7.72727C0.00852273 6.1411 0.306818 4.79167 0.903409 3.67898C1.5 2.56629 2.31203 1.71875 3.33949 1.13636C4.36695 0.549242 5.52699 0.255681 6.8196 0.255681C8.10275 0.255681 9.25805 0.549242 10.2855 1.13636C11.3177 1.71875 12.1321 2.56629 12.7287 3.67898C13.33 4.79167 13.6307 6.1411 13.6307 7.72727ZM10.5128 7.72727C10.5128 6.69981 10.3589 5.83333 10.0511 5.12784C9.74811 4.42235 9.3196 3.88731 8.76562 3.52273C8.21165 3.15814 7.56297 2.97585 6.8196 2.97585C6.07623 2.97585 5.42756 3.15814 4.87358 3.52273C4.3196 3.88731 3.88873 4.42235 3.58097 5.12784C3.27794 5.83333 3.12642 6.69981 3.12642 7.72727C3.12642 8.75473 3.27794 9.62121 3.58097 10.3267C3.88873 11.0322 4.3196 11.5672 4.87358 11.9318C5.42756 12.2964 6.07623 12.4787 6.8196 12.4787C7.56297 12.4787 8.21165 12.2964 8.76562 11.9318C9.3196 11.5672 9.74811 11.0322 10.0511 10.3267C10.3589 9.62121 10.5128 8.75473 10.5128 7.72727ZM28.0749 0.454545V15H25.4187L19.0906 5.84517H18.984V15H15.9087V0.454545H18.6076L24.886 9.60227H25.0138V0.454545H28.0749ZM30.6158 15V0.454545H40.4169V2.99006H33.6911V6.45597H39.9126V8.99148H33.6911V12.4645H40.4453V15H30.6158Z"
        fill="#6292F2"
      />
      <Path
        d="M42.8619 15V0.454545H45.9371V12.4645H52.1729V15H42.8619ZM57.2848 0.454545V15H54.2095V0.454545H57.2848ZM71.9812 0.454545V15H69.3249L62.9968 5.84517H62.8903V15H59.815V0.454545H62.5138L68.7923 9.60227H68.9201V0.454545H71.9812ZM74.522 15V0.454545H84.3232V2.99006H77.5973V6.45597H83.8189V8.99148H77.5973V12.4645H84.3516V15H74.522Z"
        fill="#163369"
      />
    </Svg>
  );
};

const PdfHeader = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
        }}>
        <LogoOxford />
      </View>
      <View>
        <Text>5 West 37th Street, 12th Floor New York, NY 10018</Text>
      </View>
    </View>
  );
};
const PdfFooter = ({ signingDate = 'February 2024' }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}>
      <View>
        <Text>{signingDate}</Text>
      </View>
      <View>
        <Text>opgny.com</Text>
      </View>
      <View>
        <Text>hello@opgny.com</Text>
      </View>
    </View>
  );
};

const PersonalInformation = ({ personalInformation }) => {
  return (
    <View style={{ flexGrow: 1, width: '50%', letterSpacing: -0.5 }}>
      <Text style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.9, marginBottom: 10 }}>Personal Information</Text>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
          <Text>First Name:</Text>
          <Text>Last Name:</Text>
          <Text>Permanent Address:</Text>
          <Text>City:</Text>
          <Text>State:</Text>
          <Text>ZIP:</Text>
          <Text>Email:</Text>
          <Text>SSN:</Text>
          <Text>Date of Birth:</Text>
          <Text>Cell Phone:</Text>
          <Text>Credit Report Status:</Text>
          <Text>Background Check Status:</Text>
        </View>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
          <Text>{personalInformation.client_first_name}</Text>
          <Text>{personalInformation.client_last_name}</Text>
          <Text>{personalInformation.client_permanent_address}</Text>
          <Text>{personalInformation.client_city}</Text>
          <Text>{personalInformation.client_state}</Text>
          <Text>{personalInformation.client_zip_code}</Text>
          <Text>{personalInformation.client_email}</Text>
          <Text>{personalInformation.client_ssn}</Text>
          <Text>{personalInformation.client_birth_date}</Text>
          <Text>{personalInformation.client_phone_number}</Text>
          <Text>{'STATUS'}</Text>
          <Text>{'STATUS'}</Text>
        </View>
      </View>
    </View>
  );
};
const RentalInformation = ({ rentalInformation }) => {
  return (
    <View style={{ flexGrow: 1, width: '50%', letterSpacing: -0.5 }}>
      <Text style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.9, marginBottom: 10 }}>Rental Information</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
          <Text>Building Address:</Text>
          <Text>Apartment Number:</Text>
          <Text>Requested Start Date:</Text>
          <Text>Lease End Date:</Text>
          <Text>Monthly Rent:</Text>
          <Text>Pets:</Text>
          <Text>Present Landlord:</Text>
          <Text>Landlord Phone Number:</Text>
        </View>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
          <Text>{rentalInformation.property_address}</Text>
          <Text>{rentalInformation.client_unit_number}</Text>
          <Text>{rentalInformation.lease_start_date}</Text>
          <Text>{rentalInformation.lease_end_date}</Text>
          <Text>${rentalInformation.monthly_rent}</Text>
          <Text>{rentalInformation.client_has_pets ? 'Yes' : 'No'}</Text>
          <Text>{rentalInformation.landlord ?? 'N/A'}</Text>
          <Text>{rentalInformation.landlord_phone_number}</Text>
        </View>
      </View>
    </View>
  );
};
const EmploymentInformation = ({ employmentInformation }) => {
  const information = {};
  for (const key in employmentInformation) {
    information[key] = employmentInformation[key] ? employmentInformation[key] : 'N/A';
  }

  return (
    <View>
      <Text style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.9, marginBottom: 10 }}>
        Employment Information
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 30 }}>
        <View style={{ width: '50%', letterSpacing: -0.5 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
              <Text>Employer:</Text>
              <Text>Employer Address:</Text>
              <Text>Contact Person:</Text>
              <Text>Contact Person Phone No:</Text>
              <Text>Position Title:</Text>
              <Text>Annual Compensation:</Text>
              <Text>Employment Lenght:</Text>
              <Text>Employer Month:</Text>
              <Text>Employer Year:</Text>
            </View>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
              <Text>{information.employer}</Text>
              <Text>{information.employer_address}</Text>
              <Text>{information.contact_person}</Text>
              <Text>{information.contact_person_phone_number}</Text>
              <Text>{information.position_title}</Text>
              <Text>{information.annual_compensation}</Text>
              <Text>{information.employment_length}</Text>
              <Text>
                {information.employed_since_date ? moment(information.employed_since_date).format('MMMM') : 'N/A'}
              </Text>
              <Text>
                {information.employed_since_date ? moment(information.employed_since_date).format('YYYY') : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '50%', letterSpacing: -0.5 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
              <Text>Previous Employer:</Text>
              <Text>Employer Address:</Text>
              <Text>Contact Person:</Text>
              <Text>Phone Number:</Text>
              <Text>Position Title:</Text>
              <Text>Annual Compensation:</Text>
              <Text>Employment Lenght:</Text>
              <Text>Employer Month:</Text>
              <Text>Employer Year:</Text>
            </View>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
              <Text>{information.previous_employer}</Text>
              <Text>{information.previous_employer_address}</Text>
              <Text>{information.previous_employer_contact_person}</Text>
              <Text>{information.previous_employer_contact_person_phone_number}</Text>
              <Text>{information.previous_employer_position_title}</Text>
              <Text>{information.previous_employer_annual_compensation}</Text>
              <Text>{information.previous_employer_employment_length}</Text>
              <Text>
                {information.previous_employer_employed_since_date !== 'N/A'
                  ? moment(information.previous_employer_employed_since_date).format('MMMM')
                  : information.previous_employer_employed_since_date}
              </Text>
              <Text>
                {information.previous_employer_employed_since_date !== 'N/A'
                  ? moment(information.previous_employer_employed_since_date).format('YYYY')
                  : information.previous_employer_employed_since_date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const Financials = ({ financialsInformation }) => {
  const information = {};
  for (const key in financialsInformation) {
    information[key] = financialsInformation[key] ? financialsInformation[key] : 'N/A';
  }

  return (
    <View style={{ width: '50%', letterSpacing: -0.5 }}>
      <Text style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.9, marginBottom: 10 }}>Financials</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
          <Text>Bank Name:</Text>
          <Text>Type of Account:</Text>
          <Text>Account Number:</Text>
          <Text>Banking Accountant:</Text>
          <Text>Accounting Contact Info:</Text>
        </View>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
          <Text>{information.bank_name}</Text>
          <Text>{information.account_type}</Text>
          <Text>{information.account_number}</Text>
          <Text>{information.accountant}</Text>
          <Text>${information.accountant_phone_number}</Text>
        </View>
      </View>
    </View>
  );
};

const OccupantsAndOtherInfo = ({ info }) => {
  const { occupants, other_information } = info;
  const occupantsInfo = occupants.map((occupant) => {
    const information = {};
    for (const key in occupant) {
      information[key] = occupant[key] ? occupant[key] : 'N/A';
    }
    return information;
  });
  return (
    <View style={{ width: '50%', letterSpacing: -0.5 }}>
      <Text style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.9, marginBottom: 10 }}>
        Occupants & Other Info
      </Text>
      {occupantsInfo.map((occupant) => {
        return (
          <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }}>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
              <Text>Occupant Full Name:</Text>
              <Text>Relationship:</Text>
            </View>
            <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
              <Text>{occupant.full_name}</Text>
              <Text>{occupant.relationship_description}</Text>
            </View>
          </View>
        );
      })}
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 600, color: '#626262' }}>
          <Text>Emergency Contact Name:</Text>
          <Text>Emergency Phone Number:</Text>
        </View>
        <View style={{ display: 'flex', gap: 2, flexGrow: 1, fontSize: 9, fontWeight: 300 }}>
          <Text>{other_information.emergency_contact_name}</Text>
          <Text>{other_information.emergency_contact_phone_number}</Text>
        </View>
      </View>
    </View>
  );
};

const ApplicationAgreement = ({ applicationData }) => {
  return (
    <View style={{ display: 'flex', gap: 10, fontSize: 8 }}>
      <Text>I hereby warrant that all statements set forth above are true.</Text>
      <Text>
        I understand that a consumer report and/or an investigative consumer report may be requested in connection with
        my prospective o continuing housing and/or employment application through Oxford Property Group, and its
        affiliates collectively referred to as "Oxford". I understand that these reports may include information
        concerning my character, employment history, general reputation, person characteristics, public records
        information, criminal records information, education, qualifications, motor vehicle record, mode of living,
        credit and indebtedness information, and any other information which may reflect upon my potential for tenancy
        or employment gathered from any individual, organization, entity, agency, or another source which may have
        knowledge concerning any such items of information.
      </Text>
      <Text>
        I understand that I have the right to make a written request, within a reasonable period of time, for complete
        and accurate disclosure of the nature and scope of the investigation requested. I understand that I have the
        right, upon submitting proper identification, to request from Oxford the nature and substance of the information
        in the consumer report or investigative consumer report, including the sources of information and the recipients
        of any reports on myself, which Oxford has previously obtained about me within a two-year period preceding my
        request.
      </Text>
      <Text>
        I consent to the delivery of all notices or disclosures required by law via any medium so chosen by the property
        owner or Oxford, including but not limited to email or other electronic transmission. I understand that all
        notices shall be deemed received upon being sent.
      </Text>
      <Text>
        By submitting this application, I certify that I have read and fully understand the disclosures and my rights
        detailed above and authorize Oxford to obtain, for the purpose of determining my eligibility for initial or
        continued tenancy, and/or employment a consumer report and/o investigative consumer report and to disclose all
        information obtained by Oxford to the landlord, its affiliates, and assigns now and in the future. I also
        certify that I have read and fully understand my rights un at
        https://files.consumerfinance.gov/f/201504_cfpb_summary_your-rights-under-fcra.pdf
      </Text>
      {applicationData && applicationData.client_signature.imageData && (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Image
            alt={'client signature'}
            src={applicationData.client_signature.imageData}
            style={{ width: 160, height: 80, objectFit: 'contain', borderBottomWidth: 1 }}
          />
        </View>
      )}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 9 }}>{moment.utc(applicationData?.created_at).format('YYYY-MM-DD hh:mm:s')}</Text>
      </View>
    </View>
  );
};

const RenderedDocument = ({ applicationData }) => {
  const [formattedDocuments, setFormattedDocuments] = useState([]);

  useEffect(() => {
    const { documents } = applicationData;
    const documentsArray = Object.entries(documents)
      .map(([key, value]) => {
        let otherDocuments = [];
        if (key === 'other_documents' && value) {
          value.forEach((other) => otherDocuments.push(other));

          return otherDocuments;
        }

        return value;
      })
      .filter((document) => !!document)
      .flat();
    setFormattedDocuments(documentsArray);
  }, [applicationData]);

  return (
    <Document>
      <Page
        dpi={72}
        style={{
          position: 'relative',
          padding: 50,
          paddingTop: 80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // PDF_PADDING - 20 + (PDF_FONT_SIZE * 0.9 + HEADER_FOOTER_PADDING + HEADER_FOOTER_GAP * 2 + 1 + 20.78),
          // paddingBottom: PDF_PADDING - 20 + (PDF_FONT_SIZE * 0.9 + HEADER_FOOTER_PADDING + HEADER_FOOTER_GAP + 1),
          // paddingHorizontal: PDF_PADDING,
          ...styles,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 50,
            paddingHorizontal: 50,
            left: 0,
            right: 0,
          }}>
          <PdfHeader />
        </View>
        <View style={{ fontSize: 80, fontWeight: 700, lineHeight: 1, marginBottom: 40 }}>
          <Text>Rental</Text>
          <Text>Application</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <View
            style={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', fontSize: 15, fontWeight: 400 }}>
            <Text>General Information</Text>
            {formattedDocuments?.map((document) => {
              return <Text key={document.id}>{document.name}</Text>;
            })}
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            paddingHorizontal: 50,
            left: 0,
            right: 0,
          }}>
          <PdfFooter />
        </View>
      </Page>
      <Page style={{ padding: 35, ...styles }}>
        <View>
          <View style={{ marginBottom: 30 }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 30, marginBottom: 30 }}>
              <PersonalInformation personalInformation={applicationData} />
              <RentalInformation
                rentalInformation={{
                  ...applicationData,
                  pets: applicationData.client_has_pets,
                }}
              />
            </View>
            <View style={{ marginBottom: 30 }}>
              <EmploymentInformation employmentInformation={applicationData} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
              <Financials financialsInformation={applicationData} />
              <OccupantsAndOtherInfo
                info={{
                  occupants: applicationData.occupants,
                  other_information: applicationData,
                }}
              />
            </View>
          </View>
          <ApplicationAgreement applicationData={applicationData} />
        </View>
      </Page>
    </Document>
  );
};

export default RenderedDocument;

export const ImageRender = ({ source }) => {
  return (
    <Document>
      <Page style={{ padding: 35, ...styles }}>
        <Image
          alt={source}
          src={source}
          // style={{ width: 160, height: 80, objectFit: 'contain', borderBottomWidth: 1 }}
        />
      </Page>
    </Document>
  );
};
