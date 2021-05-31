
export const catalogExportFields = [
    "modelNumber",
    "mfrName",
    "shortDesc",
    "unitPrice",
    "status",
    "images.0.fileName"
];

export const catalogTableConfig = {
    key: "modelNumber",
    itemsPerPage: 10,
    defaultSort: "modelNumber",
    sortDescending: false,
    columns: [
        { fieldForSort: "modelNumber", columnLabel: "Model#" },
        { fieldForSort: "mfrName", columnLabel: "Mfr" },
        { fieldForSort: "unitPrice", columnLabel: "Price" },
        { fieldForSort: "status", columnLabel: "Status" },
        { fieldForSort: "images.0.fileName", columnLabel: "File" },
    ]
}

export const catalogSelectOptions = [
    { fieldName: "mfrName", columnLabel: "Mfr" },
    { fieldName: "status", columnLabel: "Status" }
];