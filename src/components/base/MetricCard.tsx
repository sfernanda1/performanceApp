import { Card, Typography } from "@mui/material";

interface MetricCardProps {
  title: string;
  positiveStatus: boolean;
  value: string;
  description?: string;
  totalValue: React.ReactNode;
  borderNone?: boolean;
}
export default function MetricCard({
  title,
  positiveStatus,
  value,
  description,
  totalValue,
  borderNone
}: MetricCardProps) {
  return (
    <div className="p-2 cursor-grab">
      <Card
        className={`text-[#4E5D66] justify-between flex flex-col p-3 h-44 w-64 gap-2 ${borderNone ? 'border-none shadow-none' : 'border border-gray-200 shadow-md'
          }`}
      >
        <Typography variant="subtitle1" className="font-bold  w-[260]">
          {title}
        </Typography>
        <div className="shadow-md rounded-md max-w-fit min-w-14 text-center mb-1 px-2">
          <Typography variant="caption" className={` font-bold ${positiveStatus ? 'text-[#109E8E]' : 'text-[#D6628E]'}`}>
            {positiveStatus && '+'} {value}
          </Typography>
        </div>
        <Typography variant="body2" className={`min-h-6 font-medium ${positiveStatus ? 'text-[#109E8E]' : 'text-[#D6628E]'}`}>
          {description}
        </Typography>
        {totalValue}

      </Card>
    </div>

  );
}