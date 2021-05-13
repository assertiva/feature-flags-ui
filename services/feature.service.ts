import HttpClient from '../utils/http.util';
import {Product} from '@myTypes/product';
import {Feature} from '@myTypes/feature';

const endpoint = '/feature';

const save = (name: string) => {
    return HttpClient.post(endpoint, { name })
}

const editFeature = (id: string, feature: Feature) => {
    return HttpClient.put(`${endpoint}/${id}`, feature)
}

const getFeature = (id: string) => {
    return HttpClient.get(`${endpoint}/${id}`)
}

const getFeatures = () => {
    return HttpClient.get<Product[]>(endpoint);
}

const deleteFeature = (id: string) => {
    return HttpClient.delete(`${endpoint}/${id}`)
}

const FeatureService = {
    save,
    editFeature,
    getFeature,
    getFeatures,
    deleteFeature,
}

export default FeatureService;
