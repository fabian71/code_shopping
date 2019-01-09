import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {

    name: {
        id: 'name',
        label: 'Nome',
        validationsMessage: {
            maxlenght: 255
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }

}
export default fieldsOptions;