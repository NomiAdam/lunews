import Schema from './Schema';

const FlagTypesParams = {
    description: 'text NOT NULL',
    id: 'integer PRIMARY KEY',
};

const AdditionalParams = ``;

class FlagTypes extends Schema {

    public up(): Promise<any> {
        return this.create('flag_types', FlagTypesParams, AdditionalParams);
    }

    public down(): Promise<any> {
        return this.drop('flag_types');
    }

}

export default FlagTypes;
