import React, { useEffect } from 'react';
import Image from 'next/image';
import ApplyForPropertyEmail from '/public/animations/apply-for-property.gif';
import ApplicationSentSuccess from '/public/animations/application-sent-success.gif';
import { useSendEmail } from '@helpers/queries/mutations';
import ApplicationSubmitBody from '../EmailTemplates/ApplicationSubmit';
import { render as renderEmail } from '@react-email/components';

const PaymentSuccessContainer = () => {
  const { mutate: mutateSendEmail } = useSendEmail();

  const handleSendEmail = (email, name) => {
    const emailBody = {
      to: [email],
      subject: 'Opgny Property Application',
      body: renderEmail(<ApplicationSubmitBody email={email} first_name={name} />, {
        pretty: true,
      }),
    };

    mutateSendEmail(emailBody);
  };

  useEffect(() => {
    const clientEmail = new URLSearchParams(decodeURIComponent(window.location.search)).get('client_email');
    const clientName = new URLSearchParams(decodeURIComponent(window.location.search)).get('client_name');

    if (clientEmail && clientName) {
      handleSendEmail(clientEmail, clientName);
    }
  }, [mutateSendEmail]);

  return (
    <div className="h-full">
      <div className="w-full bg-[#F3EEFA]">
        <div className="max-w-[1280px] mx-auto px-[20px] pb-[100px]">
          <div className="flex items-center gap-[114px]  pt-[100px]  pb-[63px] px-[20px]">
            <div>
              <span className="px-[12px] py-[4px] bg-[#E8F2FF] text-[#477FC8] text-[14px] font-semibold leading-5 rounded-[14px] mix-blend-multiply	mb-[9px]">
                APPLY ONLINE
              </span>
              <h2 className="text-[38px] leading-[60px] font-semibold	text-gray6 mb-[15px]">
                Apply Now, Your Ideal Property Awaits!
              </h2>
              <p className="text-gray5 text-[20px] leading-[30px] max-w-[761px]">
                Apply now to find your perfect spot! Our streamlined online application makes it quick and easy. Don't
                miss out – start your journey to homeownership today!
              </p>
            </div>

            <Image src={ApplyForPropertyEmail} className="w-[250px] h-[250px]" />
          </div>

          <div className="bg-white px-[20px] ">
            <div className="w-full h-full flex flex-col  justify-center items-center p-[30px] text-center text-[24px] font-medium leading-[32px] text-gray6">
              <div className="py-[233px] flex flex-col justify-center items-center">
                <Image src={ApplicationSentSuccess} width={250} height={250} className="mb-[60px]" />
                <p>All good!</p>
                <p>Application was submitted successfully!</p>
                <p className="text-base font-medium text-gray4 leading-[24px] mt-[12px]">
                  Please check your gmail, we’ve sent you an email confirmation too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[100px] flex justify-center items-center px-[24px] text-center">
        <p className="text-gray3 leading-6">
          © 2023 by Oxford Property Group & Oxford Property Partners & Oxford Property Group USA - Licensed Real Estate
          Brokers
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessContainer;
