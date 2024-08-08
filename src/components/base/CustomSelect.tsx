import React from 'react';
import { Select, MenuItem, Chip, SelectChangeEvent, Box, Typography } from '@mui/material';

interface CustomSelectProps {
    label: string;
    value: string[];
    options: string[];
    onChange: (event: SelectChangeEvent<string[]>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange }) => {
    return (
        <div>
            <Typography className="mb-2 text-gray-800" variant='h6' >{label}:</Typography>
            <Select
                required
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                className='w-full bg-custom-input rounded-lg'
                size='small'
                fullWidth
                multiple
                value={value}
                onChange={onChange}
                renderValue={(selected) => (
                    <Box display="flex" flexWrap="wrap">
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>

    );
}

export default CustomSelect;