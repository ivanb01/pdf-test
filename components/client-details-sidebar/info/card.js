import Chip from 'components/shared/chip';
import Text from 'components/shared/text';

export default function InfoCard({ label, content, iconContent }) {
  return (
    <div className="flex flex-col my-3">
      <Text className="text-gray6 mb-1" h4>
        {label}
      </Text>
      <div className="flex flex-row">
        {typeof content === 'object' ? (
          content.map((chip) => (
            <Chip notClickable secondary key={chip} label={chip} />
          ))
        ) : iconContent ? (
          <div className="flex flex-row items-center">
            <Text className="text-gray7 pl-3" p>
              {content}
            </Text>
            {iconContent}
          </div>
        ) : (
          <Text className="text-gray7 pl-3 italic" p>
            {content}
          </Text>
        )}
      </div>
    </div>
  );
}
