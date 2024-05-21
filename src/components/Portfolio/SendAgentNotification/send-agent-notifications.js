import { Body, Head, Html, Container, Img, Section, Text, Link } from '@react-email/components';
import PropTypes from 'prop-types';
import { main, container, logo, mainContainer, paragraph, button, buttonText } from './send-agent-notification-style';
import { getBaseUrl } from '@global/functions';

const SendNotificationsToAgent = ({ userProperties, status, propertyId }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img src={`https://i.imgur.com/GPHstEx.png`} width="134" height="28" alt="OxfordLogo" style={logo} />
          <Section style={mainContainer}>
            <Text style={paragraph}>Hi,</Text>
            <Text style={paragraph}>
              Your client {status} a property:{' '}
              <Link href={`${getBaseUrl()}/property?id=${propertyId ?? ''}`}>Property Link</Link>
            </Text>
            <Text style={paragraph}>
              Please visit client profile to see their preferences:{' '}
              <Link href={`${getBaseUrl()}/contacts/details?id=${userProperties?.properties[0]?.contact_id ?? ''}`}>
                Client Details
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SendNotificationsToAgent;
SendNotificationsToAgent.propTypes = {
  userProperties: PropTypes.object,
  status: PropTypes.string,
  propertyId: PropTypes.string,
};
