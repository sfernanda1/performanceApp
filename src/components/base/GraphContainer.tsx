import { Card, Typography } from "@mui/material";

interface CardWithTitleProps {
    children: React.ReactNode;
    title: string; 
}
export default function GraphContainer({ title, children }: CardWithTitleProps) {
    return (
        <Card className="w-[600px] p-3">
            <Typography className="text-lg font-bold">{title}</Typography>
            {children}
        </Card>     
    );
}
