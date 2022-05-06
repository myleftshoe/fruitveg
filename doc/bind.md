# MINEW API (Bind)

https://esl.minew.com:9090/V1

## [POST] /label/save

Bind from label page

```json
body = {
    "mac": "ac233fd0b591",
    "only": "1620",
    "storeId": "123",
    "templets": [
        {
            "demoId": "ae7ed1bb2d724c07a0076bef6d075120",
            "demoName": "Barcode Product",
            "templateType": "1",
            "effect": true,
            "mac": "ac233fd0b591"
        }
    ]
} 
```

## [POST] /label/delete?mac=ac233fd0a3f5&storeId=123

Delete binding (Product Page Drawer - Click trash can)
