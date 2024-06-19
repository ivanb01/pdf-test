import React, { useEffect, useState, useMemo } from 'react';
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
import { NO_FORMS_MESSAGE } from 'containers/OnlineForms/constants';

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
  type,
  onRestoreFormTemplate,
}) => {
  const [openAccordion, setOpenAccordion] = useState(false);
  const [isTrashOverlayOpened, setTrashOverlayOpened] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [openedPopoverTemplateId, setOpenPopovertemplateId] = useState('');

  const onTemplateDelete = async () => {
    if (templateToDelete) {
      await handleDeleteTemplate(templateToDelete.id);
      setTrashOverlayOpened(false);
    }
  };

  useEffect(() => {
    if (((type === 'DEFAULT_FORMS' || type === 'MY_FORMS') && types.length > 0) || type === 'ALL_FORMS')
      setOpenAccordion(true);
  }, []);

  const Actions = useMemo(() => {
    const actionsTypes = [
      {
        action: 'edit',
        name: (
          <div className="flex item-center gap-3 text-gray6  cursor-pointer leading-5 py-[2px]">
            <PencilIcon className="w-5 h-5" />
            <span>Edit Form</span>
          </div>
        ),
        handleClick: handleEditTemplate,
      },
      {
        action: 'preview',
        name: (
          <div className="flex item-center gap-3 text-gray6  cursor-pointer py-[2px]">
            <RemoveRedEyeIcon className="w-5 h-5" />
            <span>Preview Form</span>
          </div>
        ),
        handleClick: handlePreviewTemplate,
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
      {
        action: 'restore',
        name: (
          <div className="flex items-center gap-3 text-red5  cursor-pointer py-[2px]">
            <TrashIcon className="w-5 h-5" />
            <span>Restore from Trash</span>
          </div>
        ),
        handleClick: (template) => {
          onRestoreFormTemplate(template);
        },
      },
    ];

    return actionsTypes
      .map((action) => {
        if (type === 'DEFAULT_FORMS' && action.action === 'preview') return action;
        else if (
          type === 'MY_FORMS' &&
          (action.action === 'edit' || action.action === 'preview' || action.action === 'delete')
        )
          return action;
        else if (
          type === 'TRASH_FORMS' &&
          (action.action === 'edit' || action.action === 'preview' || action.action === 'restore')
        )
          return action;
      })
      .filter((action) => !!action);
  }, []);

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
        <div>
          {types.length ? (
            <ul>
              {types?.map((filter) => {
                return (
                  <li
                    className={`group flex w-full h-[50px] text-sm font-medium text-gray7 items-center cursor-pointer hover:bg-lightBlue1  ${
                      currentFilterId.id === filter.id ? 'bg-lightBlue1' : ''
                    } `}
                    key={filter.id}
                    onMouseEnter={() => {
                      setHoveredFilterId(filter.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredFilterId(null);
                    }}>
                    <div
                      className={`w-[6px] h-[50px] ${
                        currentFilterId.id === filter.id ? 'bg-lightBlue3 ' : 'bg-white '
                      } `}
                    />
                    <div className="w-full" onMouseDown={() => setCurrentFilter(filter)}>
                      <div className={`flex px-[10px] py-[12px] gap-[8px] items-center text-left	`}>
                        {filter?.id ? (
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
                              ['opacity-100']: hoveredFilterId === filter.id || filter.id === openedPopoverTemplateId,
                            })}>
                            <FilterDropdown
                              types={Actions}
                              icon={<DotsHorizontalIcon className="w-5 cursor-pointer text-lightBlue3" />}
                              data={filter}
                              align={'start'}
                              side={'bottom'}
                              onOpenChange={(state) => {
                                if (state) setOpenPopovertemplateId(filter.id);
                                else setOpenPopovertemplateId(null);
                              }}
                              id={filter.id}
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
          ) : (
            <div className="text-[14px] text-gray4 font-medium leading-5 pl-[18px] py-[15px] pr-6">
              <span>{NO_FORMS_MESSAGE[type]}</span>
            </div>
          )}
        </div>
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
