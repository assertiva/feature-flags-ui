import HttpClient from '../utils/http.util';
import {FeatureFlag} from '@myTypes/feature-flag';
import {FeatureFlagFilter} from '@myTypes/feature-flag-filter';

const endpoint = '/feature-flag';

const save = (featureFlag: FeatureFlag) => {
    return HttpClient.post(endpoint, featureFlag)
}

const get = (id: string) => {
    return HttpClient.get(`${endpoint}/${id}`)
}

const getAll = () => {
    return HttpClient.get<FeatureFlag[]>(endpoint);
}

const edit = (id: string, featureFlag: FeatureFlag) => {
    return HttpClient.put(`${endpoint}/${id}`, featureFlag);
}

const getAllByFilter = (featureFlag?: FeatureFlagFilter) => {
    return HttpClient.post<FeatureFlag[]>(`${endpoint}/filter`, featureFlag);
}

const deleteFeatureFlag = (id: string) => {
    return HttpClient.delete(`${endpoint}/${id}`)
}

const FeatureFlagService = {
    save,
    get,
    edit,
    getAll,
    getAllByFilter,
    deleteFeatureFlag,
}

export default FeatureFlagService;
