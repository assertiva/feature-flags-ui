import HttpClient from '../utils/http.util';
import {Product} from '@myTypes/product';

const endpoint = '/product';

const saveProduct = (name: string) => {
    return HttpClient.post(endpoint, { name })
}

const editProduct = async (id: string, product: Product) => {
    return HttpClient.put<Product>(`${endpoint}/${id}`, product)
}

const getProduct = async (id: string) => {
    return HttpClient.get<Product>(`${endpoint}/${id}`)
}

const getProducts = () => {
    return HttpClient.get<Product[]>(endpoint);
}

const deleteProduct = (id: string) => {
    return HttpClient.delete(`${endpoint}/${id}`);
}

const ProductService = {
    saveProduct,
    editProduct,
    getProduct,
    getProducts,
    deleteProduct,
}

export default ProductService;
