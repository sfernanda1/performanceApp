import { TextareaAutosize, TextField, Typography } from "@mui/material";

interface FormFieldProps {
    id: string;
    label?: string;
    labelBetween?: string;
    register: any;
    required?: boolean;
    fullWidth?: boolean;
    type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ id, label, register, fullWidth = true, required = false, type, labelBetween }) => (
    <div className='flex items-center mb-1 justaphyify-between text-[#4E5D66]' >
        {label && <Typography className="w-36">{label}:</Typography>}
        {labelBetween && <Typography className="w-24 text-center"> {labelBetween} </Typography>}
        {
            type !== 'area' ?
                <TextField minRows={5} type={type || 'text'} required variant='outlined' id={id} {...register(id, { required })} size="small" fullWidth={fullWidth} className="bg-custom-input rounded-lg" />
                :
                <TextareaAutosize
                    minRows={3}
                    required
                    variant='outlined'
                    id={id}
                    {...register(id, { required })}
                    size="small"
                    fullWidth={fullWidth}
                    className="bg-custom-input rounded-lg resize-none w-full outline-none border-transparent p-3"
                    
                />
        }
    </div>
);