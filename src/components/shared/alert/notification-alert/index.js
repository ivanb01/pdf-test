
export default function NotificationAlert({ type, className, children, ...props }) {
    let localClassName = '';
    if (type === 'warning')
      localClassName = 'text-sm font-medium bg-yellow-50 text-yellow-800 rounded-md';
    if (type === 'success') localClassName = 'text-sm font-medium bg-green-50 text-green-800 rounded-md';
    if (type === 'error') localClassName = 'text-sm font-medium bg-red-50 text-red-800 rounded-md';
    return <div className={`${localClassName} ${className}`}>{children}</div>;
  }
  