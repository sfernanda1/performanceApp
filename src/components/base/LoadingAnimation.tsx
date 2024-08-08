import { Card, CircularProgress } from "@mui/material";
export function LoadingAnimation() {
    return (
        <Card className="w-full flex justify-center items-center h-screen ">
            <CircularProgress />
        </Card>
    )
}
