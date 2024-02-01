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
import { sendEmailFromContactForm } from '@api/marketing';
import toast from 'react-hot-toast';
import ClearIcon from '@mui/icons-material/Clear';

const validateSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('This field is required'),
  body: Yup.string().required('This field is required').min(10),
});

export const SectionContact = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      body: '',
    },
    isInitialValid: false,
    validationSchema: validateSchema,
    onSubmit: () => {},
  });

  const sendMessage = async (formik) => {
    try {
      return await sendEmailFromContactForm({ from: formik.values.email, message: formik.values.body });
    } catch (e) {
      throw e;
    }
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    formik.resetForm();
    toast.custom((t) => {
      return (
        <div
          className={`p-4 items-center  gap-3 border border-[#D5DDFA] shadow-lg rounded-lg pointer-events-auto flex ring-1 bg-white ring-black ring-opacity-5 text-sm text-gray7`}>
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
    sendMessage(formik).catch((e) => {
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
              <Image src={contactUs} alt="contact-us-bg.png" height={550} />
            </div>
          </div>
          <div className={styles['section__right']}>
            <h5 style={{ fontWeight: 500 }}>Send message</h5>
            <div className={styles['section__form']}>
              <form>
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
                  <Button type="primary" disabled={!formik.isValid} onClick={(e) => handleButtonClick(e)}>
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
