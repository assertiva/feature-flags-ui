export interface FeatureFlagFilter {
    _id?: string;
    featureName?: string;
    productName?: string;
    active?: boolean;
    canUse?: string[];
    dateToIgnoreProps?: Date;
}
