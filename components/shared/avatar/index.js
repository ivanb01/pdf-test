export default function Avatar({ img, size, className, src, ...props }) {
  let localSize = 'h-12 w-12';
  if (size === 'large') localSize = 'h-14 w-14';
  if (size) localSize = size;
  
  return (
    <>
      {src ? (
        <img
          className={`inline-block ${localSize} rounded-full ${className}`}
          src={src}
          alt=""
        />
      ) : (
        <span
          className={`inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100 ${className}`}
        >
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </>
  );
}
