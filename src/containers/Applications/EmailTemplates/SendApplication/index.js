import { Body, Head, Html, Container, Img, Section, Text, Link, Row, Column } from '@react-email/components';

import {
  main,
  container,
  logo,
  mainContainer,
  paragraph,
  button,
  footer,
  footerParagraph,
  link,
  footerIcons,
  icons,
  buttonText,
} from './emailTemplateStyle';

const SendApplicationBody = ({ applicationLink, landlord_name, client_first_name, agent_first_name, email }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img src={`https://i.imgur.com/GPHstEx.png`} width="134" height="28" alt="OxfordLogo" style={logo} />
          <Section style={mainContainer}>
            <Text style={paragraph}>Hey {landlord_name},</Text>
            <Text style={paragraph}>{client_first_name} submitted an application for your review.</Text>
            <Section style={button}>
              <Link href={applicationLink} style={buttonText}>
                Click here to view details
              </Link>
            </Section>
          </Section>
          <Section style={footer}>
            <Text style={footerParagraph}>
              This email was sent to{' '}
              <Link href={`mailto:${email}`} style={link} target="_blank" rel="noopener noreferrer">
                {email}
              </Link>
              . If you'd rather not receive this kind of email, you can unsubscribe or manage your email preferences.
            </Text>
            <Row>
              <Column>
                <Img src={`https://i.imgur.com/GPHstEx.png`} width="90" height="19" alt="OxfordLogo" />
              </Column>
              <Column>
                <Row style={icons}>
                  <Column style={footerIcons}>
                    <Link href={'https://twitter.com/OPGNY'}>
                      <Img src={'https://i.imgur.com/qtkmvva.png'} height={20} width={20} />
                    </Link>
                  </Column>
                  <Column style={footerIcons}>
                    <Link href={'https://www.facebook.com/OxfordPropertyGp'}>
                      <Img src={'https://i.imgur.com/WtX2o1b.png'} height={20} width={20} />
                    </Link>
                  </Column>
                  <Column style={footerIcons}>
                    <Link href={'https://www.instagram.com/oxfordspiregroup/'}>
                      <Img src={'https://i.imgur.com/w6tXgrr.png'} height={20} width={20} />
                    </Link>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SendApplicationBody;
