import { Doughnut } from 'react-chartjs-2';
import Text from 'components/shared/text/index';

const DoughnutChart = ({ data, color = '#60A5FA', className, label }) => {
  const doughnutData = {
    datasets: [
      {
        data: [data[0], data[1] - data[0]],
        backgroundColor: [color, '#7388A95A'],
        borderColor: [color, '#7388A95A'],
        borderWidth: 0,
        cutout: '85%',
        spacing: -5,
        borderRadius: 100,
        datalabels: {
          color: '#ffffff',
          display: false,
        },
      },
    ],
  };
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
        {data[0] + '/' + data[1]}
      </div>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default DoughnutChart;
