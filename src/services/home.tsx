export async function getAvgTicketDay() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getAvgTicketMonth() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getProductsAlerts() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getOrdersMonth() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getSellsMonth() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}


export async function getSellsPerMonth() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getProfitExpectation() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getRealProfit() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}


export async function getDoneOrders() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}


export async function getCancelledOrders() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getFunnelData() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getUserProfileData() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

interface Product {
  price:number;
  name: string;
  category: string;
  status: string;
  description: string;
  id: string;
  image?: string;
}

export const getProducts = async (filter: string, page: number, limit: number): Promise<Product[]> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      return []
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    throw error;
  }
};

export const getTotalProducts = async (filter: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      return []
    }
    const data = await response.json();
    return data as Product[];
  } catch (error) {
    throw error;
  }
};
export async function getOrdersPerCategory() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}