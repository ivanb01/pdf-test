import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieData, type }) => {
  const totalSum = pieData.map((data) => data.value).reduce((partialSum, a) => partialSum + a, 0);

  const getPercentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };
  let pieDataNumber = pieData.map((data) => data.value);
  let pieDataPercentage = pieData.map((data) => getPercentage(data.value, totalSum));

  const chart = {
    labels: pieData.map((data) => data.label),
    datasets: [
      {
        data: type == 'number' ? pieDataNumber : pieDataPercentage,
        backgroundColor: pieData.map((el) => el.color),
        borderColor: pieData.map((el) => el.color),
        borderWidth: 1,
        datalabels: {
          color: '#ffffff',
          font: {
            size: 16,
            weight: 600,
            family: 'Inter',
          },
          formatter: function (value) {
            return type == 'percentage' ? Math.round(value) + '%' : value;
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="mx-auto w-[170px]">
        {pieData[0].value == 0 && pieData[1].value == 0 ? (
          <div className="mx-auto h-[170px] w-[170px] bg-borderColor rounded-full flex items-center justify-center text-gray5 italic text-xs">
            No contacts to show
          </div>
        ) : (
          <Pie data={chart} />
        )}
      </div>
      <div className="mt-6 pie-legend flex items-center justify-between">
        {pieData.map((data, index) => {
          return (
            <div key={index} className="flex items-center text-sm font-medium px-12 py-2">
              <span
                key={data.id}
                className={`mr-2 block h-[10px] w-[10px] rounded-full ring-2 ring-white`}
                style={{ background: data.color }}
              />
              {type == 'number' && `${data.value} ${data.label}`}
              {type == 'percentage' &&
                `${
                  Math.round(getPercentage(data.value, totalSum)) ? Math.round(getPercentage(data.value, totalSum)) : 0
                }% ${data.label}`}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PieChart;
