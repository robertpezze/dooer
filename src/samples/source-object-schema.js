let data = {
    "$schema": "http://json-schema.org/draft-07/schema",

    "type": "object",
    "properties": {
        "name": { 
            "type": "string"
        },
        "price_excl_vat": {
            "type": "number",
            "minimum": 0
        },
        "vat_rate": {
            "type": "number",
            "minimum": 0
        }
    },
    "required": ["name", "price_excl_vat", "vat_rate"]
}

export default data;