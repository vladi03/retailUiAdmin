const catalogUpsertSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Catalog Upsert",
    "type": "object",
    "required": [
        "_id",
        "shortDesc",
        "extraDesc",
        "description",
        "unitPrice",
        "status",
        "categories",
        "images",
        "siteDomain"
    ],
    "properties": {
        "siteDomain": {"type": "string"},
        "shortDesc": {"type": "string"},
        "extraDesc" : {"type": "string"},
        "description" : {"type": "string"},
        "modelNumber" : {"type": "string"},
        "unitPrice" : {"type": "number"},
        "status": {
            "type": "string",
            "enum": ["in-progress", "active", "disabled"]
        },
        "categories": {
            "type": "array",
            "uniqueItems": true,
            "items": {
                "type": "object",
                "required": [
                    "category",
                    "sort"
                ],
                "properties": {
                    "category": {"type": "string"},
                    "sort": {"type": "integer"}
                }
            },
        },
        "images": {"type": "array"}
    }
};