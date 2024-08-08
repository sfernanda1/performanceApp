import * as React from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import { Menu, Typography, MenuItem, Avatar, Box, Toolbar, AppBar, IconButton, List, ListItem, ListItemIcon} from '@mui/material';
import { useRouter } from 'next/router';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';

interface ResponsiveAppBarProps {
    children: React.ReactNode;
}

function ResponsiveAppBar({ children }: ResponsiveAppBarProps) {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = React.useState<string>('');
    const [userName, setUserName] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    interface NavItem {
        text: string;
        icon: React.ReactNode;
        route: string;
    }
    const navItems: NavItem[] = [
        { text: 'Desempenho', icon: <AssessmentIcon />, route: '/' },
        { text: 'Produtos', icon: <CategoryIcon />, route: '/addProducts' },
        { text: 'Áreas de entrega', icon: <LocalShippingOutlinedIcon />, route: '/deliveryArea' },
    ];
    React.useEffect(() => {
        const fetchUserData = () => {
            const storedUserName = localStorage.getItem('nome') || '';
            const storedAvatar = localStorage.getItem('avatar') || '';
            setUserName(storedUserName);
            setAvatar(storedAvatar);
        };

        fetchUserData();
    }, []);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const logout = () => {
        localStorage.clear();
        document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        router.push('/login');
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };
    const handleListItemClick = (route: string) => {
        router.push(route);
        setSelectedItem(route);
    };
    
    return (
        <Box width="100vw overflow-hidden" >
            <AppBar position="static" >
                <Toolbar className='justify-between bg-white'>

                    <div className="flex-grow-0">
                        <div className='flex gap-2 items-center'>
                            <div className="font-semibold text-[#4E5D66]">{userName}</div>
                            <IconButton onClick={handleOpenUserMenu} className='p-0'>
                                <Avatar alt={userName} src={avatar} />
                            </IconButton>
                        </div>

                        <Menu
                            className="mt-11"
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='logout' onClick={logout}>
                                <Typography textAlign="center">Sair</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <div className='md:flex w-full'>
                <div className='bg-white h-full m-5 w-full  md:w-14 justify-between'>
                    <List className='mt-sm flex md:flex-col'>
                        {navItems.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                selected={selectedItem === item.route}
                                onClick={() => handleListItemClick(item.route)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div className="w-full mt-5">
                    {children}
                </div>
            </div>

        </Box>

    );
}
export default ResponsiveAppBar;