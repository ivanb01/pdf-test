import React, { useEffect, useState } from 'react';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import FolderIcon from '/public/icons/folder.svg';
import FoldersIcon from '/public/icons/folders.svg';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/solid';
import TrashTypeOverlay from 'containers/OnlineForms/TrashTypeOverlay';

const TypesAccordionElement = ({
  title,
  types,
  hoveredFilterId,
  setHoveredFilterId,
  currentFilterId,
  setCurrentFilter,
  handlePreviewTemplate,
  handleEditTemplate,
  hideActionsMenu,
  handleDeleteTemplate,
  isDeletingTemplate,
}) => {
  const [openAccordion, setOpenAccordion] = useState(false);
  const [isTrashOverlayOpened, setTrashOverlayOpened] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  const onTemplateDelete = async () => {
    if (templateToDelete) {
      await handleDeleteTemplate(templateToDelete.id.hex);
      setTrashOverlayOpened(false);
    }
  };

  useEffect(() => {
    !title && setOpenAccordion(true);
  }, []);

  const Actions = [
    {
      action: 'edit',
      name: (
        <div className="flex item-center gap-3 text-gray6  cursor-pointer leading-5 py-[2px]">
          <PencilIcon className="w-5 h-5" />
          <span>Edit Form</span>
        </div>
      ),
      handleClick: (template) => {
        handleEditTemplate(template);
      },
    },
    {
      action: 'preview',
      name: (
        <div className="flex item-center gap-3 text-gray6  cursor-pointer py-[2px]">
          <RemoveRedEyeIcon className="w-5 h-5" />
          <span>Preview Form</span>
        </div>
      ),
      handleClick: async (template) => {
        handlePreviewTemplate(template);
      },
    },
    {
      action: 'delete',
      name: (
        <div className="flex items-center gap-3 text-red5  cursor-pointer py-[2px]">
          <TrashIcon className="w-5 h-5" />
          <span>Move to Trash</span>
        </div>
      ),
      handleClick: (template) => {
        setTrashOverlayOpened(true);
        setTemplateToDelete(template);
      },
    },
  ];

  return (
    <div>
      {title && (
        <button
          type="button"
          onClick={() => setOpenAccordion(!openAccordion)}
          className="w-full flex justify-between bg-gray1 text-[12px] text-gray7 font-medium tracking-[.6px] py-2 pl-6 pr-3">
          <div className="uppercase">{title}</div>

          <ChevronDownIcon className={clsx('w-4 h-4 ', { 'rotate-180': openAccordion })} />
        </button>
      )}
      {openAccordion && (
        <ul>
          {types?.map((filter) => {
            return (
              <li
                className={`group flex w-full h-[50px] text-sm font-medium text-gray7 items-center cursor-pointer hover:bg-lightBlue1  ${
                  currentFilterId.id.hex === filter.id.hex ? 'bg-lightBlue1' : ''
                } `}
                key={filter.id.hex}
                onMouseEnter={() => {
                  setHoveredFilterId(filter.id.hex);
                }}
                onMouseLeave={() => {
                  setHoveredFilterId(null);
                }}>
                <div
                  className={`w-[6px] h-[50px] ${
                    currentFilterId.id.hex === filter.id.hex ? 'bg-lightBlue3 ' : 'bg-white '
                  } `}
                />
                <div className="w-full" onMouseDown={() => setCurrentFilter(filter)}>
                  <div className={`flex px-[10px] py-[12px] gap-[8px] items-center text-left	`}>
                    {filter?.id.hex ? (
                      <Image src={FolderIcon} className="h-5 w-5" alt="Form type filter" />
                    ) : (
                      <Image src={FoldersIcon} className="h-5 w-5" alt="All forms" />
                    )}
                    {filter?.name}
                  </div>
                </div>
                {!hideActionsMenu && (
                  <div>
                    {hoveredFilterId !== '' ? (
                      <div
                        className={clsx('opacity-0 mr-6 ', {
                          ['opacity-100']: hoveredFilterId === filter.id.hex,
                        })}>
                        <FilterDropdown
                          types={Actions}
                          icon={<DotsHorizontalIcon className="w-5 cursor-pointer text-lightBlue3" />}
                          data={filter}
                          align={'start'}
                          side={'bottom'}
                        />
                      </div>
                    ) : (
                      <div className="w-5 h-5  mr-6"></div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {isTrashOverlayOpened && (
        <TrashTypeOverlay
          onCancel={() => setTrashOverlayOpened(false)}
          onDelete={onTemplateDelete}
          isDeleting={isDeletingTemplate}
        />
      )}
    </div>
  );
};

export default TypesAccordionElement;
