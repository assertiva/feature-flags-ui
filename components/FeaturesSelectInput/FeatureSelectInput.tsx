import {Select} from 'antd';
import FeatureService from '@services/feature.service';
import {FC, useEffect, useState} from 'react';
import {Feature} from '@myTypes/feature';

const getFeatures = async () => {
    const res = await FeatureService.getFeatures();
    return res.data;
}

interface FeatureSelectInputProps {
    used?: string[];
}

const FeaturesSelectInput: FC<FeatureSelectInputProps> = ({ used = [], ...props }) => {
    const [features, setFeatures] = useState<Feature[]>([]);

    useEffect(() => {
        getFeatures().then(features => {
            const filtered = features.filter(f => !used.includes(f.name));
            setFeatures(filtered);
        })
    }, [used])


    return (
        <Select
            {...props}
            showSearch
            placeholder="Selecione uma feature"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >=0}
        >
            {
                features.map(feature => (
                    <Select.Option value={feature.name}>
                        {feature.name}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

export default FeaturesSelectInput;
