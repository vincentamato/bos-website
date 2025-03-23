interface CreditGroup {
  role: string;
  names: string[];
}

interface StructuredCreditsProps {
  creditGroups: CreditGroup[];
}

export default function StructuredCredits({ creditGroups }: StructuredCreditsProps) {
  return (
    <div className="text-white">
      {creditGroups.map((group, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-[22px] font-extrabold mb-2 border-b border-white/10 pb-1">
            <span style={{ color: 'rgb(255, 0, 0) !important' }}>{group.role}</span>
          </h3>
          <div>
            {group.names.map((name, nameIndex) => (
              <p key={nameIndex} className="text-gray-300 text-[18px] leading-relaxed font-normal">{name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 