/* This example requires Tailwind CSS v2.0+ */

export default function Alert({ type, className, children, ...props }) {
  let localClassName = '';
  if (type === 'warning')
    localClassName = 'bg-yellow1 border-l-4 border-yellow2';
  if (type === 'success') localClassName = 'bg-green1 border-l-4 border-green5';
  if (type === 'error') localClassName = 'bg-red1 border-l-4 border-red4';
  return <div className={`${localClassName} p-4 ${className}`}>{children}</div>;
}
