import React, { useEffect, useState } from 'react';
import {
    TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card,
    Typography, TablePagination, IconButton, Skeleton, Dialog, DialogContent, Button
} from '@mui/material';
import { getProducts } from '@/services/home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import AddProductsForm from './addProducts';

interface Product {
    name: string;
    category: string;
    price: number;
    description: string;
    id: string;
    image?: string;
}

export default function ProductsTable() {
    const [textFieldValue, setTextFieldValue] = useState<string>('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const itemsPerPage = 10;

    const filterProducts = (filter: string) => {
        console.log(allProducts)
        const filtered = allProducts.filter(product =>
            product.category.toLowerCase().includes(filter.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredProducts(filtered);
        setPage(0);
    };

    const getProductsList = async () => {
        setLoading(true);
        const fetchedProducts = await getProducts('', 0, 0);
        setAllProducts(fetchedProducts || []);
        setFilteredProducts(fetchedProducts || []);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        getProductsList();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setTextFieldValue(text);
        filterProducts(text);
    };

    const handleSearchButtonClick = () => {
        filterProducts(textFieldValue);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currentProducts = filteredProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <Card className='p-4 mt-2 mr-6 ml-2'>
            <div className='flex justify-between'>
                <Typography className="text-lg font-bold">Listagem de produtos</Typography>
                <div className="flex gap-2">
                    <TextField
                        label="Pesquisar produtos"
                        variant="outlined"
                        value={textFieldValue}
                        onChange={handleFilterChange}
                        className='mb-4'
                        InputProps={{
                            endAdornment: (
                                <>
                                    <IconButton onClick={handleSearchButtonClick}><SearchOutlinedIcon /></IconButton>
                                </>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className="mb-4"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                    >Adicionar Produto</Button>
                </div>
            </div>
            <TableContainer component={Paper} className="border-none shadow-none">
                <Table size="small">
                    <TableHead >
                        <TableRow >
                            <TableCell className="bg-header text-white font-semibold border-none ">Produto</TableCell>
                            <TableCell className="bg-header text-white font-semibold border-none ">Categoria</TableCell>
                            <TableCell className="bg-header text-white font-semibold border-none">Especificações</TableCell>
                            <TableCell className="bg-header text-white font-semibold border-none ">Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <>
                                {Array.from({ length: 10 }, (_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={5}>
                                            <Skeleton animation="wave" height={50} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            currentProducts.length > 0 && currentProducts.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell className='w-3'>
                                        <img src={product?.image} alt={product?.description} />
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="w-2/5">{product.description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={10}
                page={page}
                onPageChange={handleChangePage}
            />
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogContent>
                    <AddProductsForm closeModal={handleClose} />
                </DialogContent>
            </Dialog>
        </Card>
    );
};