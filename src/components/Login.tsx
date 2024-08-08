import {  Button, IconButton, InputAdornment, OutlinedInput,  TextField,  } from "@mui/material";
import { FormEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { loginUser } from "@/services/auth";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useStatusAlertContext } from "@/context/StatusAlertContext";
export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const { setMessage, setStatus } = useStatusAlertContext();
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userName = formData.get('userName') as string;
        const password = formData.get('password') as string;
        console.log(userName, password)
        try {
            await loginUser({ userName, password });
            router.push('/');
        } catch (error) {
            console.log(error)
            setMessage('Ocorreu um erro no login, tente novamente!');
            setStatus('error');
        }
    }

    return (
        <div className="h-screen flex w-full items-center justify-center w">
            <form className="gap-8 bg-white flex flex-col items-center justify-center p-20 lg:w-2/5 max-[894] noBorderInput box-border" onSubmit={login} >
                        <AutoGraphIcon fontSize="large"/>
                        <p className="font-semibold text-2xl mb-2">Fazer login</p>
                        <div className="w-full max-w-sm">
                            <p className="font-semibold text-lg ml-5">Usuário</p>
                            <TextField name="userName" size="small" fullWidth type="text" color="primary" className="bg-custom-input" required />
                        </div>
                        <div className="w-full max-w-sm">
                            <p className="font-semibold text-lg ml-5">Senha</p>
                            <OutlinedInput
                                required
                                size="small"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                color="primary"
                                className="bg-custom-input"
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="password visibility"
                                            onClick={handlePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                } />
                        </div>
                        <Button color="primary" variant="contained" className="rounded-lg bg-red mt-2" type="submit">Entrar</Button>
                    </form>
        </div>
        
    )
}