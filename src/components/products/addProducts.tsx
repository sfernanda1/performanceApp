import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Select, MenuItem, InputLabel, Card } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';
import { useStatusAlertContext } from '@/context/StatusAlertContext';
import { addProduct } from '@/services/addProducts';

export type FormValues = {
    category: string;
    description: string;
    price: number;
    image: File | null;
};

interface AddProductsFormProps {
    closeModal: () => void;
}

const AddProductsForm: React.FC<AddProductsFormProps> = ({ closeModal }) => {
    const router = useRouter();
    const { register, handleSubmit, setValue, watch } = useForm<FormValues>();
    const { setStatus, setMessage } = useStatusAlertContext();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const onSubmit = (data: FormValues) => {
        if (!data.image) {
            setMessage('Adicione uma imagem.');
            setStatus('error');
            return;
        }
        async function includeProduct() {
            try {
                const response = await addProduct(data);
                if (!response) {
                    setMessage('Ocorreu um erro, tente novamente!');
                    setStatus('error');
                } else {
                    setMessage('Cadastro realizado com sucesso!');
                    setStatus('success');
                    router.push('/');
                }
            } catch (error) {
                setMessage('Ocorreu um erro, tente novamente!');
                setStatus('error');
            }
        }
        includeProduct();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList[0]) {
            const file = fileList[0];
            setSelectedImage(file);
            setValue('image', file);
        }
    };

    const handleImageRemove = () => {
        setSelectedImage(null);
        setValue('image', null);
    };

    const categories = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5'];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mr-3 '>
            <Typography className="text-[28px] text-[#4E5D66] font-medium my-5">Adicionar produto:</Typography>
            <Card className='p-4'>
                <div className='md:flex gap-4 mb-4'>
                    <div className='w-full flex flex-col gap-2 lg:pr-10'>
                        <InputLabel id="category-label">Categoria</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            {...register('category', { required: true })}
                            fullWidth
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            id="description"
                            label="Descrição"
                            {...register('description', { required: true })}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            id="price"
                            label="Preço"
                            type="number"
                            {...register('price', { required: true })}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-10'>
                    <Typography variant='h6' className="text-gray-800">Imagem</Typography>
                    <div className='flex items-center'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="image-input"
                        />
                        <label htmlFor="image-input">
                            {!selectedImage && <Button component="span" color='secondary' variant='contained' startIcon={<AddOutlinedIcon />}>
                                Adicionar Imagem
                            </Button>}

                        </label>
                        {selectedImage && (
                            <div style={{ position: 'relative', marginLeft: '10px' }}>
                                <img src={URL.createObjectURL(selectedImage)} alt="Product" style={{ width: '100px', height: '100px' }} />
                                <div className='absolute top-0 right-0 bg-white opacity-90'>
                                    <Button onClick={handleImageRemove}>
                                        <ClearIcon />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
            <div className='w-full flex justify-center lg:justify-end my-4'>
                <div className='flex gap-2'>
                    <Button onClick={() => closeModal()} variant="contained" color="inherit">Cancelar</Button>
                    <Button type="submit" variant="contained" color='secondary'>Criar</Button>
                </div>
            </div>
        </form>
    );
};

export default AddProductsForm;