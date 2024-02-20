import React from 'react';
import { formatPrice, getBaseUrl } from '@global/functions';

export const Emails = ({ chunkedArray, firstName, agentName, email }) => {
  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        fontSize: '16px',
        lineHeight: '1.3',
        msTextSizeAdjust: '100%',
        WebkitTextSizeAdjust: '100%',
        margin: '0',
        padding: '0',
      }}>
      <table
        role="presentation"
        border="0"
        cellPadding="0"
        cellSpacing="0"
        style={{
          backgroundColor: '#f4f5f6',
          width: '100%',
          margin: 'auto',
        }}>
        <tr>
          <td
            style={{
              margin: '0 auto !important',
              maxWidth: '600px',
              padding: '0',
              paddingTop: '24px',
              paddingRight: '130px',
              width: '600px',
            }}>
            <div
              style={{
                boxSizing: 'border-box',
                display: 'block',
                margin: '0 auto',
                maxWidth: '600px',
                padding: '0',
              }}>
              <table
                role="presentation"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  background: '#ffffff',
                  border: '1px solid #eaebed',
                  width: '100%',
                  marginBottom: '60px',
                }}>
                <tr>
                  <td
                    style={{
                      boxSizing: 'border-box',
                      padding: '32px',
                    }}>
                    <div style={{ padding: '24px 0' }}>
                      <img
                        src="https://opgny.com/newdist/images/theme_setting_images/36486919104_images_Oxford_logo_coloR.png"
                        style={{ height: '30px', marginBottom: '24px' }}
                        alt="Oxford Logo"
                      />
                    </div>
                    <p style={{ color: '#344054', marginBottom: '32px' }}>
                      Hey {firstName},
                      <br />
                      <br />
                      Please let me know which properties you are interested in, or if you have any specific questions
                      about any of the properties we selected below. <br />
                      <br />
                      Best Regards,
                      <br />
                      {agentName}
                    </p>

                    <table width="100%" cellSpacing="0" cellPadding="0">
                      <tr>
                        <td align="center">
                          <table style={{ width: '600px' }} cellSpacing="0" cellPadding="5">
                            {chunkedArray.length > 0 &&
                              chunkedArray.map((chunk, index) => (
                                <tr key={index}>
                                  {chunk.map((property, subIndex) => (
                                    <td
                                      style={{
                                        width: '50%',
                                        padding: '10px',
                                        boxSizing: 'border-box',
                                      }}>
                                      <table
                                        width="100%"
                                        border="0"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        style={{
                                          fontFamily: 'Arial, sans-serif',
                                          boxShadow: '0px 4px 6px -2px #0000000D, 0px 10px 15px -3px #0000001A',
                                        }}>
                                        <tr>
                                          <td
                                            align="center"
                                            style={{
                                              border: '1px solid #F3F4F6',
                                              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                            }}>
                                            <table
                                              width="350"
                                              border="0"
                                              cellSpacing="0"
                                              cellPadding="0"
                                              bgcolor="#FFFFFF"
                                              style={{ overflow: 'hidden' }}>
                                              <tr>
                                                <td style={{ position: 'relative' }}>
                                                  <img
                                                    src={property.PHOTOS && property.PHOTOS[0].PHOTO_URL}
                                                    width="350"
                                                    height="115"
                                                    style={{
                                                      display: 'block',
                                                      width: '100%',
                                                      height: '115px',
                                                      objectFit: 'cover',
                                                    }}
                                                    alt="Property Image"
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style={{ padding: '15px' }}>
                                                  <a
                                                    style={{
                                                      fontSize: '14px',
                                                      fontWeight: '600',
                                                      color: '#333333',
                                                      textDecoration: 'none',
                                                    }}
                                                    href={`${getBaseUrl()}/property?id=${property.ID}${
                                                      property.STATUS === 'Rented'
                                                        ? '&status=22'
                                                        : property.STATUS === 'Sold'
                                                        ? '&status=19'
                                                        : ''
                                                    }`}>
                                                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                                      <tr>
                                                        <td
                                                          style={{
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#333333',
                                                          }}>
                                                          {property.PROPERTY_TYPE} in {property.ADDRESS}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ paddingTop: '10px' }}>
                                                          <table
                                                            width="100%"
                                                            border="0"
                                                            cellSpacing="0"
                                                            cellPadding="0">
                                                            <tr>
                                                              <td
                                                                style={{
                                                                  display: 'inline-flex',
                                                                  alignItems: 'center',
                                                                  justifyContent: 'center',
                                                                  fontSize: '14px',
                                                                  color: '#555555',
                                                                  borderRadius: '22px',
                                                                  background: '#F3F4F6',
                                                                  padding: '2px 10px',
                                                                  marginRight: '5px',
                                                                  textAlign: 'center',
                                                                  verticalAlign: 'middle',
                                                                  whiteSpace: 'nowrap',
                                                                }}>
                                                                <img
                                                                  style={{ marginRight: '5px' }}
                                                                  src="https://i.imgur.com/5SNx5uf.png"
                                                                  alt="Room"
                                                                />
                                                                {property.BEDROOMS}
                                                              </td>
                                                              <td
                                                                style={{
                                                                  display: 'inline-flex',
                                                                  alignItems: 'center',
                                                                  justifyContent: 'center',
                                                                  fontSize: '14px',
                                                                  color: '#555555',
                                                                  borderRadius: '22px',
                                                                  background: '#F3F4F6',
                                                                  padding: '2px 10px',
                                                                  marginRight: '5px',
                                                                  textAlign: 'center',
                                                                  verticalAlign: 'middle',
                                                                  whiteSpace: 'nowrap',
                                                                }}>
                                                                <img
                                                                  style={{ marginRight: '5px' }}
                                                                  src="https://i.imgur.com/WXRetUp.png"
                                                                  alt="Bathroom"
                                                                />{' '}
                                                                {property.BATHROOMS}
                                                              </td>
                                                              {property.SQUARE_FOOTAGE != 0 && (
                                                                <td
                                                                  style={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: '14px',
                                                                    color: '#555555',
                                                                    borderRadius: '22px',
                                                                    background: '#F3F4F6',
                                                                    padding: '2px 10px',
                                                                    textAlign: 'center',
                                                                    verticalAlign: 'middle',
                                                                    whiteSpace: 'nowrap',
                                                                  }}>
                                                                  <img
                                                                    style={{
                                                                      marginRight: '5px',
                                                                      verticalAlign: 'middle',
                                                                    }}
                                                                    src="https://i.imgur.com/pbeWiP9.png"
                                                                    alt="Sqft"
                                                                  />{' '}
                                                                  {property.SQUARE_FOOTAGE} sqft
                                                                </td>
                                                              )}
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          style={{
                                                            paddingTop: '15px',
                                                            fontSize: '24px',
                                                            fontWeight: 'bold',
                                                            color: '#333333',
                                                          }}>
                                                          {formatPrice(property.PRICE)}
                                                          {property.STATUS.toLowerCase() == 'for rent' && (
                                                            <span className="text-gray-500 font-normal">/month</span>
                                                          )}
                                                        </td>
                                                        <td>
                                                          <div
                                                            style={{
                                                              fontWeight: 500,
                                                              padding: '2px 4px',
                                                              fontSize: '12px',
                                                              background: '#ECFEFF',
                                                              color: '#155E75',
                                                              borderRadius: '12px',
                                                              width: '60px',
                                                              textAlign: 'center',
                                                              marginTop: '10px',
                                                            }}>
                                                            {property.STATUS}
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </a>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style={{ color: '#344054', marginTop: '32px', fontFamily: 'Inter' }}>
                      This email was sent to {email}. If you'd rather not receive this kind of email, you can
                      unsubscribe or manage your email preferences.
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Emails;
