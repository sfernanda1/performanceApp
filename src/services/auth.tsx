export async function loginUser({ userName, password }: { userName: string, password: string }) {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": userName,
        "password": password
      }),
    });

    console.log('Login response:', response);

    if (!response.ok) {
      throw new Error('Login ou senha incorreto');
    }

    const data = await response.json();
    console.log('Login data:', data);

    console.log('User data:', data);

    document.cookie = `access-token=${data['access-token']}; path=/`;
    localStorage.setItem('userName', 'fernanda@exemplo');
    localStorage.setItem('nome', 'Fernanda');

  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}