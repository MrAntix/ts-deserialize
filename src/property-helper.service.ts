export class PropertyHelper {

    dependant<TModel, TValue>(
        model: TModel,
        getPropertyValue: (m: TModel) => TValue,
        dependantPropertyName: string,
        getDependantValue: (TValue: any) => any
    ) {

        let cachedValue: TValue = null;
        let cachedDependantValue: TValue = null;

        Object.defineProperty(model,
            dependantPropertyName,
            {
                get: () => {
                    // check property data
                    const value = getPropertyValue(model);
                    if (value !== cachedValue) {
                        cachedValue = value;
                        // get the dependant value
                        cachedDependantValue = getDependantValue(value);
                    }

                    return cachedDependantValue;
                }
            });
    }

    dependantById(
        model: any,
        propertyName: string,
        propertyIdName: string,
        factory: (id: any) => any,
        propertyModelIdName: string = 'id'): void {

        let data: any = null;
        Object.defineProperty(model,
            propertyName,
            {
                get: () => {
                    // check property id has not changed
                    const propertyId = model[propertyIdName];
                    if (data && propertyId !== data[propertyModelIdName]) data = null;

                    // when there is no id return a null
                    if (!propertyId) return null;

                    // get cached property model or call factory
                    return data || (data = factory(propertyId));
                },
                set: (value: any) => {
                    // no change
                    if (value === data) return;

                    // id is required
                    if (value && !value[propertyModelIdName])
                        throw new Error(`model ${value} has no value for ${propertyModelIdName}`);

                    // set cached property model and property id
                    data = value;
                    model[propertyIdName] = value && value[propertyModelIdName];
                }
            });
    }
}