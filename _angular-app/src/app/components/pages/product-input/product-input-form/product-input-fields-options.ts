import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {

    product_id: {
        id: 'product_id',
        label: 'Produto'
    },

    amount: {
        id: 'amount',
        label: 'Quantidade',
        validationsMessage: {
            min: 1
        }
    },

}
export default fieldsOptions;