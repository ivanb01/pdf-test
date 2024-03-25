import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { createPortal } from 'react-dom';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import DropdownList from '../DropdownList';
import { INSERT_FORM_ELEMENT_COMMAND } from './FormPlugin';
import { FORM_DROPDOWN_OPTIONS, BLOCK_TYPE_TO_BLOCK_NAME } from '../../constants';
import { INSERT_SIGNATURE_COMMAND } from './SignaturePlugin';
import mockSignature from '/public/images/signature.png';

import { INSERT_TABLE_COMMAND } from '@lexical/table';
import Button from '@components/shared/button';
import ChevronDown from '/public/images/icons/chevron-down.svg';
import Image from 'next/image';

const LowPriority = 1;

function Divider() {
  return <div className="w-px mt-0 mx-1 bg-[#eee] shrink-0" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [blockTypeIcon, setBlockTypeIcon] = useState('text/paragraph');
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [showFormElementsDropdown, setShowFormElementsDropdown] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const formsButtonRef = useRef(null);
  const formatButtonRef = useRef(null);

  const FORMAT_OPTIONS = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Normal',
        type: 'paragraph',
        icon: 'bg-[url(/images/icons/text-paragraph.svg)]',
        onClick: () => {
          if (blockType !== 'paragraph') {
            editor.update(() => {
              const selection = $getSelection();

              if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createParagraphNode());
              }
            });
          }
          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 2,
        label: 'Heading 1',
        type: 'h1',
        icon: 'bg-[url(/images/icons/type-h1.svg)]',
        onClick: () => {
          if (blockType !== 'h1') {
            editor.update(() => {
              const selection = $getSelection();

              if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createHeadingNode('h1'));
              }
            });
          }
          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 3,
        label: 'Heading 2',
        type: 'h2',
        icon: 'bg-[url(/images/icons/type-h2.svg)]',
        onClick: () => {
          if (blockType !== 'h2') {
            editor.update(() => {
              const selection = $getSelection();

              if ($isRangeSelection(selection)) {
                $wrapNodes(selection, () => $createHeadingNode('h2'));
              }
            });
          }
          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 4,
        label: 'Bullet List',
        icon: 'bg-[url(/images/icons/list-ul.svg)]',
        type: 'ul',
        onClick: () => {
          if (blockType !== 'ul') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND);
          }
          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 5,
        label: 'Numbered List',
        icon: 'bg-[url(/images/icons/list-ol.svg)]',
        type: 'ol',
        onClick: () => {
          if (blockType !== 'ol') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND);
          }
          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 6,
        label: '2 columns',
        icon: 'bg-[url(/images/icons/list-ol.svg)]',

        onClick: () => {
          editor.dispatchCommand(INSERT_TABLE_COMMAND, {
            columns: '2',
            rows: '1',
          });

          setShowBlockOptionsDropDown(false);
        },
      },
      {
        id: 7,
        label: '3 columns',
        icon: 'bg-[url(/images/icons/list-ol.svg)]',
        onClick: () => {
          editor.dispatchCommand(INSERT_TABLE_COMMAND, {
            columns: '3',
            rows: '1',
          });

          setShowBlockOptionsDropDown(false);
        },
      },
    ];
  }, [blockType, editor]);

  const FORM_ELEMENTS_OPTIONS = useMemo(() => {
    const onFormElementClick = (option) => {
      if (option.id === 4 || option.id === 5) {
        editor.dispatchCommand(INSERT_SIGNATURE_COMMAND, {
          altText: 'Signature',
          src: mockSignature.src,
          width: 200,
          height: 50,
          textValue: option.label,
        });
      } else {
        editor.dispatchCommand(INSERT_FORM_ELEMENT_COMMAND, {
          text: option.label,
        });
      }

      setShowFormElementsDropdown(false);
    };
    return FORM_DROPDOWN_OPTIONS.map((formOption) => {
      return {
        ...formOption,
        onClick: () => onFormElementClick(formOption),
      };
    });
  }, [editor]);

  useEffect(() => {
    switch (blockType) {
      case 'h1':
      case 'h2':
        setBlockTypeIcon(`type-${blockType}`);
        break;
      case 'ol':
      case 'ul':
        setBlockTypeIcon(`list-${blockType}`);
        break;
      case 'paragraph':
        setBlockTypeIcon(`text-${blockType}`);
        break;
      default:
        setBlockTypeIcon(`text-paragraph`);
    }
  }, [blockType]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  return (
    <div className="flex mb-px bg-white p-1 rounded-tr-[10px] rounded-tl-[10px] border-b" ref={toolbarRef}>
      <>
        <div ref={formsButtonRef}>
          <Button
            rightIcon={<Image src={ChevronDown} alt="Dropdown" className="object-none" />}
            onClick={() => setShowFormElementsDropdown(!showFormElementsDropdown)}
            className="focus:ring-transparent">
            Form Elements
          </Button>
        </div>

        {showFormElementsDropdown &&
          createPortal(
            <DropdownList
              toolbarRef={toolbarRef}
              setShowBlockOptionsDropDown={setShowFormElementsDropdown}
              options={FORM_ELEMENTS_OPTIONS}
              buttonRef={formsButtonRef}
            />,
            document.body,
          )}
      </>
      <Divider />

      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
        className={`border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px] ${
          !canUndo ? ' opacity-20 cursor-not-allowed ' : ''
        }`}
        aria-label="Undo">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle  opacity-60	bg-[url(/images/icons/arrow-counterclockwise.svg)]" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
        className={`border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle ${
          !canRedo ? 'opacity-20 cursor-not-allowed' : ''
        }`}
        aria-label="Redo">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle opacity-60	bg-[url(/images/icons/arrow-clockwise.svg)]" />
      </button>
      <Divider />

      <button
        className="border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle block-controls items-center shrink-0"
        onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
        aria-label="Formatting Options"
        ref={formatButtonRef}>
        <span className={`flex w-5 h-5 select-none	mr-3 leading-4 bg-contain bg-[url(/icons/${blockTypeIcon}.svg)]`} />
        <span className="flex leading-5 align-middle font-sm text-[#777] text-ellipsis h-5 text-left mr-4">
          {BLOCK_TYPE_TO_BLOCK_NAME[blockType]}
        </span>
        <i className=" select-none bg-[url(/images/icons/chevron-down.svg)]  bg-transparent bg-contain inline-block h-4 w-4 " />
      </button>
      {showBlockOptionsDropDown &&
        createPortal(
          <DropdownList
            editor={editor}
            toolbarRef={toolbarRef}
            setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
            options={FORMAT_OPTIONS}
            buttonRef={formatButtonRef}
          />,
          document.body,
        )}
      <Divider />

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={`border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px] ${
          isBold ? 'bg-[#dfe8fa] bg-opacity-50' : ''
        }`}
        aria-label="Format Bold">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle opacity-60	bg-[url(/images/icons/type-bold.svg)]" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={`border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px] ${
          isItalic ? 'bg-[#dfe8fa] bg-opacity-50' : ''
        }`}
        aria-label="Format Italics">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle opacity-60	bg-[url(/images/icons/type-italic.svg)]" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={`border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px] ${
          isUnderline ? 'bg-[#dfe8fa] bg-opacity-50' : ''
        }`}
        aria-label="Format Underline">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle opacity-60	bg-[url(/images/icons/type-underline.svg)]" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px]"
        aria-label="Left Align">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle  opacity-60	bg-[url(/images/icons/text-left.svg)]" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px]"
        aria-label="Center Align">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle  opacity-60	bg-[url(/images/icons/text-center.svg)]" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="border-0 flex bg-none rounded-[10px] p-[8px] cursor-pointer align-middle mr-[2px]"
        aria-label="Right Align">
        <i className="bg-contain inline-block w-[18px] h-[18px] mt-0.5 align-middle  opacity-60	bg-[url(/images/icons/text-right.svg)]" />
      </button>
    </div>
  );
}
