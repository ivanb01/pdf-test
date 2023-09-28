import AIChip from '@components/shared/chip/ai-chip';
import Chip from 'components/shared/chip';
import Text from 'components/shared/text';

export default function InfoCard({ label, showDot, content, iconContent, client }) {
  if (label == 'Import Source' && !content) {
    content = 'Manually Added';
  }
  return (
    <div className="flex flex-col my-3">
      <Text className="text-gray6 mb-1" h4>
        {label}
      </Text>
      <div className="flex flex-row">
        {typeof content === 'object' ? (
          content?.map((chip) => <Chip notClickable secondary key={chip} label={chip} />)
        ) : iconContent ? (
          <div className="flex flex-row items-center">
            <Text className="text-gray7 mr-1" p>
              {content}
            </Text>
            {iconContent}
          </div>
        ) : (
          <div className="flex items-center">
            {showDot >= 0 && (
              <span className={`block h-2 w-2 mr-1 rounded-full ${showDot ? 'bg-green5' : 'bg-red3'}`} />
            )}
            <Text className={`text-gray7`} p>
              {label == 'Import Source' ? (
                <div className="flex items-center">
                  {content == 'Smart Sync A.I.' && (
                    <AIChip reviewed={client.approved_ai ? true : false} className="mr-1" />
                  )}
                  {content}
                </div>
              ) : (
                content
              )}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
