import Button from 'components/shared/button';
import { CheckCircleIcon, MinusCircleIcon, ExclamationIcon, PlusIcon } from '@heroicons/react/solid';

export const steps = [
  {
    id: 0,
    name: 'EVENT NAME 1',
    // description: 'Vitae sed mi luctus laoreet.',
    href: '#',
    status: 1,
  },
  {
    id: 1,
    name: 'EVENT NAME 2',
    href: '#',
    status: 1,
  },
  {
    id: 2,
    name: 'EVENT NAME 3',
    href: '#',
    status: 2,
  },
  {
    id: 3,
    name: 'EVENT NAME 4',
    href: '#',
    status: 2,
  },
  {
    id: 4,
    name: 'EVENT NAME 5',
    href: '#',
    status: 2,
  },
];

export const alerts = (handleAssignCampaignChange, handleUnassignCampaignChange) => [
  {
    icon: <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />,
    text: 'To be able to receive these emails. Client must need to be assigned to this campaign.',
    button: (
      <Button className="p-0" label="Assign" leftIcon={<PlusIcon />} primary onClick={handleAssignCampaignChange} />
    ),
    type: 'warning',
  },
  {
    icon: <CheckCircleIcon className="text-green6" />,
    text: 'This campaign is running succesfully.',
    button: (
      <Button
        white
        className="text-red5"
        leftIcon={<MinusCircleIcon className="text-red5" />}
        label="Unassign"
        onClick={handleUnassignCampaignChange}
      />
    ),
    type: 'success',
  },
];
