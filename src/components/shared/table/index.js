const Table = ({ children, tableFor, isInCampaign }) => {
  return (
    <div className="h-full ">
      <div className="h-full flex flex-col">
        <div
          className={`h-full ${isInCampaign && 'border border-gray2 rounded-md'} ${tableFor === 'categorized' || tableFor === 'inCampaignContacts' ? 'overflow-x-hidden' : 'overflow-x-auto'}`}>
          <div className="h-full inline-block min-w-full align-middle">
            <div className="ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-200">{children}</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
