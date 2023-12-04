'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { InfoItem } from '../InfoItem';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import Image from 'next/image';
import contactUs from '/public/images/public/contact-us-bg.svg';
import iconPhone from '/public/images/public/icon-phone.png';
import iconEmail from '/public/images/public/icon-mail.png';
import { sendMarketingEmail } from '@api/marketing';
import toast from 'react-hot-toast';
import ClearIcon from '@mui/icons-material/Clear';

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Please enter a valid email').required('This field is required'),
  phone: Yup.number(),
  subject: Yup.string().required('This field is required'),
  body: Yup.string().required('This field is required'),
});

export const SectionContact = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      body: '',
    },
    isInitialValid: false,
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  const sendMessage = async (formik) => {
    const sendEmail = {
      to: ['jasuncion@opgny.com'],
      subject: formik?.values.subject,
      body: `<html>
          <h4>First name : ${formik?.values.firstName}</h4>
          <h4>Last name : ${formik?.values.lastName}</h4>
          <h4>Phone number :${formik?.values.phone}</h4>
          <h4>Email: ${formik.values.email}</h4>
          <p>${formik?.values.body}</p>
        </html>`,
    };
    try {
      return await sendMarketingEmail(sendEmail);
    } catch (e) {
      console.log(e, 'error');
    }
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    sendMessage(formik)
      .then(() => {
        toast.custom((t) => {
          return (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } p-4 bg-white items-center  gap-3 border border-[#D0E3FD] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 text-sm text-gray7`}>
              <div>
                <p>Thanks for reaching out! We'll get back to you soon.</p>
              </div>

              <ClearIcon
                className={'text-gray4 h-5 w-5 cursor-pointer'}
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              />
            </div>
          );
        });
      })
      .then(() => {
        formik.resetForm();
      })
      .catch((e) => {
        console.log(e, 'error');
        toast.error('Something went wrong');
      });
  };

  return (
    <div className={styles.section}>
      <div className="container-public">
        <div className={styles['section__wrapper']}>
          <div className={styles['section__left']}>
            <div className={styles['section__left-content']}>
              <h5>Contact information</h5>
              <p className={styles['section__left-content-text']}>5 west 37th street 12th Floor, NY NY 10018</p>
              <InfoItem text="+1 (123) 123-1234" icon={iconPhone} />
              <InfoItem text="support@opgny.com" icon={iconEmail} />
            </div>
            <div className={styles['section__bg']}>
              <Image src={contactUs} alt="contact-us-bg.png" />
            </div>
          </div>
          <div className={styles['section__right']}>
            <h5>Send message</h5>
            <div className={styles['section__form']}>
              <form>
                <div className={styles['section__form-row']}>
                  <Input
                    placeholder="First name"
                    label="First name"
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  <Input
                    placeholder="Last name"
                    label="Last name"
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </div>
                <div className={styles['section__form-row']}>
                  <Input
                    placeholder="Email"
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <Input
                    placeholder="Phone"
                    label="Phone"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </div>
                <div className={styles['section__form-row']}>
                  <Input
                    placeholder="Subject"
                    label="Subject"
                    id="subject"
                    name="subject"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                  />
                </div>
                <div className={styles['section__form-row']}>
                  <Textarea
                    placeholder="Message"
                    label="Message"
                    id="body"
                    name="body"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                  />
                </div>
                <div className={styles['section__actions']}>
                  <Button type="primary" disabled={!formik.isValid}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
