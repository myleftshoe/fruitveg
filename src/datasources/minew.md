# MINEW API

https://esl.minew.com:9090/V1/

## [GET] /TagBinding/label?storeId=123

+ Response 200 (application/json)

```json
    {
        "errcode": 200,
        "body": {
            "data": [
                {
                    "result": "1",
                    "demoName": "Bulk Bins",
                    "screenSize": "000c",
                    "demoData": "{\"inch\":4.2,\"size\":{\"width\":400,\"height\":300},\"transpose\":3,\"rgbtype\":2,\"text\":{\"label4\":{\"x\":9,\"y\":103,\"font-size\":40,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label5\":{\"x\":7,\"y\":51,\"font-size\":40,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label11\":{\"x\":342,\"y\":17,\"font-size\":20,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label6\":{\"x\":146,\"y\":211,\"font-size\":80,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"red\",\"effect\":\"minitail-up\"},\"label10\":{\"x\":349,\"y\":275,\"font-size\":18,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"red\"},\"label8\":{\"x\":8,\"y\":10,\"font-size\":30,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label9\":{\"x\":11,\"y\":155,\"font-size\":30,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label3\":{\"x\":11,\"y\":276,\"font-size\":12,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"}},\"icons\":{\"icon1\":{\"x\":84,\"y\":199,\"font-size\":70,\"align\":\"left\",\"color\":\"red\",\"content\":\"icofont-dollar\"}}}",
                    "mac": "AC233FD0A3F5"
                },
                {
                    "result": "1",
                    "demoName": "Barcode Product",
                    "screenSize": "0008",
                    "demoData": "{\"inch\":2.13,\"size\":{\"width\":250,\"height\":122},\"transpose\":0,\"rgbtype\":2,\"text\":{\"label4\":{\"x\":5,\"y\":5,\"font-size\":16,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label5\":{\"x\":5,\"y\":30,\"font-size\":16,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label3\":{\"x\":5,\"y\":77,\"font-size\":12,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label6\":{\"x\":148,\"y\":80,\"font-size\":35,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"red\",\"effect\":\"minitail-up\"},\"label7\":{\"x\":5,\"y\":56,\"font-size\":12,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label10\":{\"x\":231,\"y\":106,\"font-size\":11,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"red\"}},\"grapcodes\":{\"barcode\":{\"type\":\"code128\",\"x\":3,\"y\":98,\"color\":\"black\",\"layer\":\"mono\",\"barwidth\":1,\"barheight\":20}},\"icons\":{\"icon1\":{\"x\":121,\"y\":73,\"font-size\":30,\"align\":\"left\",\"color\":\"red\",\"content\":\"icofont-dollar\"}}}",
                    "mac": "AC233FD0B591"
                }
            ]
        }
    }
```

## [GET] /label/query?storeId=123&mac=ac233fd09fd0

+ Response 200 (application/json)

```json
{
    "errcode": 200,
    "body": {
        "id": "613ec842124436beb0df9624",
        "mac": "ac233fd09fd0",
        "goods": {
            "id": "2082",
            "barcode": "",
            "qrcode": "",
            "label1": "",
            "label2": "",
            "label3": "1706",
            "label4": "CAPSICUM",
            "label5": "RED",
            "label6": "15.99",
            "label7": "",
            "label8": "Organic",
            "label9": "",
            "label10": "/kg",
            "label11": "",
            "label12": "",
            "label13": "VEGETABLES",
            "label14": "",
            "label15": "",
            "label16": "",
            "label17": "",
            "label18": "",
            "label19": "",
            "label20": "",
            "label21": "",
            "label22": "",
            "label23": "",
            "label24": "",
            "label25": "",
            "label26": "",
            "label27": "",
            "label28": "",
            "label29": "",
            "label30": "",
            "label31": "",
            "label32": "",
            "label33": "",
            "label34": "",
            "label35": "",
            "label36": "",
            "label37": "",
            "label38": "",
            "label39": "",
            "label40": "",
            "label41": "",
            "label42": "",
            "label43": "",
            "label44": "",
            "label45": "",
            "label46": "",
            "label47": "",
            "label48": "",
            "label49": "",
            "label50": "",
            "photo1": null,
            "photo2": null,
            "photo3": null,
            "photo4": null,
            "photo5": null,
            "status": "已绑定",
            "createTime": 1651789793706,
            "updateTime": 1651404163854,
            "msg": null
        },
        "only": "2082",
        "storeId": 123,
        "screenInfo": {
            "id": "5d650ce24582e9f249973acb",
            "colour": "red",
            "screenSize": {
                "inch": 4.2,
                "width": 400,
                "height": 300
            },
            "screeninfo": "000c",
            "firmwareType": "OTA1",
            "type": null
        },
        "goodsLabel": {
            "id": 6149,
            "labelmac": "AC233FD09FD0",
            "ean13": "2082",
            "storeId": 123,
            "demoId": "164cb6d35ac8407484bb88c8b0bdcf1c"
        },
        "templets": [
            {
                "id": "613ec84293f0ca00010a3635",
                "mac": "ac233fd09fd0",
                "demoId": "164cb6d35ac8407484bb88c8b0bdcf1c",
                "demoName": "Bulk Bins",
                "effect": true,
                "use": false,
                "templateType": "1",
                "promotionStartTime": null,
                "promotionEndTime": null,
                "createTime": 1631504450719
            }
        ],
        "gateway": null
    }
}
```

## /label/preview?storeId=123&mac=ac233fd09fd0

### POST (seems to be used as GET)

+ Response 200 (application/json)

```json
{
    "errcode": 200,
    "body": {
        "id": "2082",
        "barcode": "",
        "qrcode": "",
        "label1": "",
        "label2": "",
        "label3": "1706",
        "label4": "CAPSICUM",
        "label5": "RED",
        "label6": "15.99",
        "label7": "",
        "label8": "Organic",
        "label9": "",
        "label10": "/kg",
        "label11": "",
        "label12": "",
        "label13": "VEGETABLES",
        "label14": "",
        "label15": "",
        "label16": "",
        "label17": "",
        "label18": "",
        "label19": "",
        "label20": "",
        "label21": "",
        "label22": "",
        "label23": "",
        "label24": "",
        "label25": "",
        "label26": "",
        "label27": "",
        "label28": "",
        "label29": "",
        "label30": "",
        "label31": "",
        "label32": "",
        "label33": "",
        "label34": "",
        "label35": "",
        "label36": "",
        "label37": "",
        "label38": "",
        "label39": "",
        "label40": "",
        "label41": "",
        "label42": "",
        "label43": "",
        "label44": "",
        "label45": "",
        "label46": "",
        "label47": "",
        "label48": "",
        "label49": "",
        "label50": "",
        "photo1": null,
        "photo2": null,
        "photo3": null,
        "photo4": null,
        "photo5": null,
        "status": "已绑定",
        "createTime": 1651789793652,
        "updateTime": 1651404163854,
        "msg": null
    },
    "map": {
        "demoData": "{\"inch\":4.2,\"size\":{\"width\":400,\"height\":300},\"transpose\":3,\"rgbtype\":2,\"text\":{\"label4\":{\"x\":9,\"y\":103,\"font-size\":40,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label5\":{\"x\":7,\"y\":51,\"font-size\":40,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label11\":{\"x\":342,\"y\":17,\"font-size\":20,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"black\"},\"label6\":{\"x\":146,\"y\":211,\"font-size\":80,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"red\",\"effect\":\"minitail-up\"},\"label10\":{\"x\":349,\"y\":275,\"font-size\":18,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":true,\"prefix\":false,\"color\":\"red\"},\"label8\":{\"x\":8,\"y\":10,\"font-size\":30,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label9\":{\"x\":11,\"y\":155,\"font-size\":30,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"},\"label3\":{\"x\":11,\"y\":276,\"font-size\":12,\"font-family\":\"WqyBitmapSong_AlibabaPuhui\",\"align\":\"left\",\"bold\":false,\"prefix\":false,\"color\":\"black\"}},\"icons\":{\"icon1\":{\"x\":84,\"y\":199,\"font-size\":70,\"align\":\"left\",\"color\":\"red\",\"content\":\"icofont-dollar\"}}}",
        "mac": "AC233FD09FD0"
    }
}
```
