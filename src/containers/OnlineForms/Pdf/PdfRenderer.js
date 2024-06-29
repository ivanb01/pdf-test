import { Document, Page, Text, View, Font, StyleSheet, Image } from '@react-pdf/renderer';
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
  PDF_HEADING1_LINE_HEIGHT,
  PDF_HEADING2_SIZE,
  PDF_HEADING2_LINE_HEIGHT,
  PDF_PARAGRAPH_MARGIN_BOTTOM,
  PDF_LIST_PADDING_LEFT,
  PDF_LIST_ITEM_VERTICAL_PADDING,
  PDF_LIST_ITEM_HORIZONTAL_PADDING,
  PDF_HEADING1_MARGIN_BOTTOM,
  PDF_HEADING2_MARGIN_BOTTOM,
} from '../constants';
import logo from '/public/images/oxford-logo-image.png';
import { createContext, useContext } from 'react';

const RendererContext = createContext();

Font.register(FONTS);

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  fontFamily: 'Poppins',
  fontSize: PDF_FONT_SIZE * 0.99,
});

const PdfLineBreak = () => {
  return (
    <Text
      style={{
        width: 500,
        height: 10 * TOTAL_RATIO,
      }}
    />
  );
};

const PdfHeading1 = ({ headingElement }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: JUSTIFY_PARAGRAPH[headingElement.format] }}>
      {headingElement.children.map((node, index) => {
        return (
          <Text
            style={{
              ...styles,
              fontSize: PDF_HEADING1_SIZE,
              marginBottom: PDF_HEADING1_MARGIN_BOTTOM,
              lineHeight: PDF_HEADING1_LINE_HEIGHT,
              textAlign: headingElement.format,
              ...TEXT_FORMAT_STYLES[node.format],
            }}
            key={index}>
            {node.text}
          </Text>
        );
      })}
    </View>
  );
};
const PdfHeading2 = ({ headingElement }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: JUSTIFY_PARAGRAPH[headingElement.format] }}>
      {headingElement.children.map((node, index) => {
        return (
          <Text
            style={{
              ...styles,
              fontSize: PDF_HEADING2_SIZE,
              marginBottom: PDF_HEADING2_MARGIN_BOTTOM,
              lineHeight: PDF_HEADING2_LINE_HEIGHT,
              textAlign: headingElement.format,
              ...TEXT_FORMAT_STYLES[node.format],
            }}
            key={index}>
            {node.text}
          </Text>
        );
      })}
    </View>
  );
};

const PdfWord = ({ text, format }) => {
  return (
    <>{text !== '' ? <Text style={{ ...TEXT_FORMAT_STYLES[format] }}>{text !== ' ' ? `${text} ` : ''}</Text> : <></>}</>
  );
};

const PdfImage = ({ src }) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <View
        style={{
          borderBottom: 1,
          borderBottomColor: 'black',
          width: 200 * 0.75,
          height: 50 * 0.75,
        }}>
        <Image
          src={src}
          alt=""
          style={{
            width: 200 * 0.75,
            height: 50 * 0.75,
            objectFit: 'contain',
          }}
        />
      </View>
    </View>
  );
};

const PdfFormInput = ({ text }) => (
  <Text
    style={{
      width: PDF_FORM_ELEMENT,
      borderBottom: 1,
      borderBottomColor: 'black',
      textAlign: 'center',
    }}>
    {text}
  </Text>
);

const EmptyPdfFormInput = () => {
  return (
    <Text
      style={{
        width: PDF_FORM_ELEMENT,
        height: 15.9,
        borderBottom: 1,
        borderBottomColor: 'black',
        textAlign: 'center',
      }}></Text>
  );
};

const EmptyPdfSignature = () => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          width: 200 * 0.75,
          height: 50 * 0.75,
        }}
      />
    </View>
  );
};

const PdfParagraph = ({ nodes, format, style }) => {
  const { isPreview, formValues } = useContext(RendererContext);
  return (
    <>
      {!nodes.length ? (
        <PdfLineBreak />
      ) : (
        <View
          style={{
            ...styles,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: JUSTIFY_PARAGRAPH[format],
            marginBottom: PDF_PARAGRAPH_MARGIN_BOTTOM,
            ...style,
          }}>
          {nodes.map(({ id, type, text, format, src }, index) => {
            console.log('tyype', type);
            if (text) {
              if (type === 'formNode') {
                let value = null;
                if (isPreview) value = text;
                else if (id) {
                  if (formValues && formValues[id]) {
                    if (formValues[id].answer !== '') value = formValues[id].answer;
                    else return <EmptyPdfFormInput />;
                  }
                }
                return <PdfFormInput text={value} key={index} />;
              } else {
                const breakText = text.split(' ');
                return breakText.map((word) => {
                  return <PdfWord text={word} format={format} key={index} />;
                });
              }
            }
            if (type === 'linebreak') {
              return <PdfLineBreak key={index} />;
            }
            if (type === 'image' && src) {
              if (isPreview) return <PdfImage src={src} key={index} />;
              else if (formValues && formValues[id]) {
                if (formValues[id].answer.imageData)
                  return <PdfImage src={formValues[id].answer.imageData} key={index} />;
                else return <EmptyPdfSignature />;
              }
            }
          })}
        </View>
      )}
    </>
  );
};

const PdfNumberList = ({ listItems }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', paddingLeft: PDF_LIST_PADDING_LEFT }}>
      {listItems.map(({ children, value }, index) => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
            key={index}>
            <View
              style={{
                paddingVertical: PDF_LIST_ITEM_VERTICAL_PADDING,
                paddingHorizontal: PDF_LIST_ITEM_HORIZONTAL_PADDING,
              }}>
              <View
                style={{
                  width: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  paddingVertical: PDF_LIST_ITEM_VERTICAL_PADDING,
                  ...styles,
                }}>
                <Text>{`${value}. `}</Text>
              </View>
              <PdfParagraph nodes={children} style={{ fontSize: PDF_FONT_SIZE, marginBottom: 0 }} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const PdfBulletList = ({ listItems }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', paddingLeft: PDF_LIST_PADDING_LEFT }}>
      {listItems.map(({ children }, index) => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
            key={index}>
            <View
              style={{
                paddingVertical: PDF_LIST_ITEM_VERTICAL_PADDING,
                paddingHorizontal: PDF_LIST_ITEM_HORIZONTAL_PADDING,
              }}>
              <View
                style={{
                  width: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  paddingVertical: PDF_LIST_ITEM_VERTICAL_PADDING + 5,
                }}>
                <View
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 3,
                    backgroundColor: 'black',
                  }}
                />
              </View>
              <PdfParagraph nodes={children} style={{ fontSize: PDF_FONT_SIZE, marginBottom: 0 }} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const TableCell = ({ tableCell }) => {
  return (
    <View>
      {tableCell.children.map((cell, index) => {
        if (cell.tag === 'h1' && cell.type === 'heading') {
          return <PdfHeading1 headingElement={cell} key={index} />;
        } else if (cell.tag === 'h2' && cell.type === 'heading') {
          return <PdfHeading2 headingElement={cell} key={index} />;
        } else if (!cell.tag && cell.type === 'paragraph') {
          return <PdfParagraph nodes={cell.children} format={cell.format} key={index} />;
        } else if (cell.tag === 'ol' && cell.listType === 'number') {
          return <PdfNumberList listItems={cell.children} key={index} />;
        } else if (cell.tag === 'ul' && cell.listType === 'bullet') {
          return <PdfBulletList listItems={cell.children} key={index} />;
        }
      })}
    </View>
  );
};
const PdfColumns = ({ nodes }) => {
  const columnsNumber = nodes.children[0].children.length;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: PDF_DOCUMENT_WIDTH,
        paddingBottom: 10,
        gap: 7,
      }}>
      {nodes?.children[0]?.children.map((column, index) => {
        return (
          <View
            key={index}
            style={{
              width: (PDF_DOCUMENT_WIDTH - (columnsNumber - 1) * COLUMNS_GAP) / columnsNumber,
            }}>
            <TableCell tableCell={column} />
          </View>
        );
      })}
    </View>
  );
};
const PdfHeader = () => {
  return (
    <View
      fixed
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: HEADER_FOOTER_PADDING,
        paddingTop: HEADER_FOOTER_PADDING,
        gap: HEADER_FOOTER_GAP,
      }}>
      <Image
        alt={'logo'}
        src={logo.src}
        style={{ fontSize: PDF_FONT_SIZE, width: 100, height: 20.78, objectFit: 'contain' }}
      />
      <Text style={{ fontSize: PDF_FONT_SIZE * 0.9 }}>
        5 West 37th Street, 12th Floor | New York, NY 10018 | P: (212)300-6412 | F: (212)937-3757 | www.opgny.com
      </Text>
      <View style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
    </View>
  );
};
const PdfFooter = () => {
  return (
    <View
      fixed
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: HEADER_FOOTER_PADDING,
        paddingBottom: HEADER_FOOTER_PADDING,
        gap: HEADER_FOOTER_GAP,
      }}>
      <View style={{ backgroundColor: 'black', height: 1, width: '100%' }} />
      <Text style={{ fontSize: PDF_FONT_SIZE * 0.9 }}>
        5 West 37th Street, 12th Floor, New York, NY 10018 | O: (212)300-6412 | www.opgny.com
      </Text>
    </View>
  );
};

const RenderedDocument = ({ editor, isPreview, formValues }) => {
  console.log('editor', editor);
  const editorElements = editor?.root.children;
  return (
    <RendererContext.Provider
      value={{
        isPreview,
        formValues,
      }}>
      <Document>
        <Page
          dpi={72}
          style={{
            position: 'relative',
            paddingTop:
              PDF_PADDING - 20 + (PDF_FONT_SIZE * 0.9 + HEADER_FOOTER_PADDING + HEADER_FOOTER_GAP * 2 + 1 + 20.78),
            paddingBottom: PDF_PADDING - 20 + (PDF_FONT_SIZE * 0.9 + HEADER_FOOTER_PADDING + HEADER_FOOTER_GAP + 1),
            paddingHorizontal: PDF_PADDING,
          }}>
          <PdfHeader />
          {editor && (
            <View>
              {editorElements.map((editorElement, index) => {
                if (editorElement.tag === 'h1' && editorElement.type === 'heading') {
                  return <PdfHeading1 headingElement={editorElement} key={index} />;
                } else if (editorElement.tag === 'h2' && editorElement.type === 'heading') {
                  return <PdfHeading2 headingElement={editorElement} key={index} />;
                } else if (!editorElement.tag && editorElement.type === 'paragraph') {
                  return <PdfParagraph nodes={editorElement.children} format={editorElement.format} key={index} />;
                } else if (!editorElement.tag && editorElement.type === 'table') {
                  return <PdfColumns nodes={editorElement} key={index} />;
                } else if (editorElement.tag === 'ol' && editorElement.listType === 'number') {
                  return <PdfNumberList listItems={editorElement.children} key={index} />;
                } else if (editorElement.tag === 'ul' && editorElement.listType === 'bullet') {
                  return <PdfBulletList listItems={editorElement.children} key={index} />;
                }
              })}
            </View>
          )}
          <PdfFooter />
        </Page>
      </Document>
    </RendererContext.Provider>
  );
};

export default RenderedDocument;
