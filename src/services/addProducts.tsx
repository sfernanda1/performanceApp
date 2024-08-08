import { FormValues } from "@/components/products/addProducts";

export async function addProduct(formData: FormValues) {
    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if(response.status < 400){
            return response
        } else{
            return false;
        }
    } catch (error) {
        throw new Error();
    }
}
