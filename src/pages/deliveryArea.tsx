import dynamic from "next/dynamic";
import { Typography } from "@mui/material";

const DeliveryAreaMap = dynamic(() => import("../components/DeliveryArea"), { ssr: false });

export default function DeliveryArea() {

    return (
        <div className="w-full">
            <Typography variant="h5" className="ml-5 font-semibold mb-5 ">
                Regiões de entrega
            </Typography>
            <DeliveryAreaMap />
        </div>
    );
}