import { Body, Head, Html, Container, Img, Section, Text, Link } from '@react-email/components';
import PropTypes from 'prop-types';
import {
  main,
  container,
  logo,
  mainContainer,
  paragraph,
  button,
  buttonText,
  signatureParagraph,
  signatureContainer,
} from './portfolio-email-template-style';

const PortfolioEmailTemplate = ({
  portfolioLink,
  first_name,
  agent_first_name,
  agent_last_name,
  companyName,
  agent_phone_number,
  companyLogo,
  agent_email,
}) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img src={`https://i.imgur.com/GPHstEx.png`} width="134" height="28" alt="OxfordLogo" style={logo} />
          <Section style={mainContainer}>
            <Text style={paragraph}>Hey {first_name},</Text>
            <Text style={paragraph}>
              I've compiled a portfolio for you to take a look at. Feel free to browse through and let me know if
              anything catches your eye. You can indicate if there are any properties you particularly like or dislike
              to help keep your search organized.
            </Text>
            <Text style={paragraph}>Looking forward to hearing your thoughts!</Text>
            <Text style={paragraph}>{agent_first_name}</Text>
            <Container style={button}>
              <Link href={portfolioLink} style={buttonText}>
                View Properties in Your Portfolio
              </Link>{' '}
            </Container>
          </Section>
        </Container>
        <Container style={signatureContainer}>
          <Text style={signatureParagraph}>
            {agent_first_name} {agent_last_name}
          </Text>
          <Text style={signatureParagraph}>{companyName}</Text>
          <Text style={signatureParagraph}>{agent_phone_number}</Text>
          <Text style={signatureParagraph}>{agent_email}</Text>
          <Img src={companyLogo} width="134" height="28" alt="OxfordLogo" />
        </Container>
      </Body>
    </Html>
  );
};

export default PortfolioEmailTemplate;
PortfolioEmailTemplate.propTypes = {
  portfolioLink: PropTypes.string,
  first_name: PropTypes.string,
  agent_first_name: PropTypes.string,
  agent_last_name: PropTypes.string,
};
