import { WarningAmber } from '@mui/icons-material';
import { useRouter } from 'next/router';
const FloatingAlert = ({ message, className }) => {
  const router = useRouter();
  return (
    <div className={`${className} bg-[#FFFCF5] p-4 border border-[#FEC84B] rounded-xl`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.99982 6.49998V9.83331M9.99982 13.1666H10.0081M8.84591 2.24308L1.99184 14.0819C1.61167 14.7386 1.42159 15.0669 1.44968 15.3364C1.47419 15.5714 1.59733 15.785 1.78846 15.924C2.00759 16.0833 2.38698 16.0833 3.14575 16.0833H16.8539C17.6127 16.0833 17.992 16.0833 18.2112 15.924C18.4023 15.785 18.5254 15.5714 18.55 15.3364C18.578 15.0669 18.388 14.7386 18.0078 14.0819L11.1537 2.24308C10.7749 1.58878 10.5855 1.26163 10.3384 1.15175C10.1229 1.0559 9.87678 1.0559 9.66123 1.15175C9.41413 1.26163 9.22472 1.58878 8.84591 2.24308Z"
              stroke="#DC6803"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-orange-700">{message}</h3>
          <div className="mt-1 text-sm text-orange-700">
            <p>
              New contacts have automatically been pulled from your email and categorized by AI. Click below on "See
              Summary" to see and review them.
            </p>
          </div>
          <div className="mt-2">
            <div className="-mx-2 -my-1.5 flex">
              <button
                onClick={() => router.push('/ai-summary')}
                type="button"
                className="rounded-md px-2 py-1.5 text-sm font-medium text-orange-700 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-orange-50">
                See Summary {'->'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAlert;
