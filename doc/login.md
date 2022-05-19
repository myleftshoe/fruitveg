<style>
.heading1 {
    color: red;
    font-weight:700;
    font-size: 35px;
}
.heading2 {
    color: blue;
    font-weight:700;
    font-size: 30px;
}
</style>

# Overview

## Overview | Login

### Request

#### POST /api/2.2/auth/signin HTTP/1.1

```json
body: {
    "username": "username",
    "password": "password"
}
```

### Response

#### 200 OK

```json
{
    "errcode": 200,
    "errmsg": "Login Success",
    "body": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzY2NTI1NTQsInN1YiI6ImFkbWluIiwidXNlcklkIjoiYTM1NGNhZDNmYzI3MTFlOGE1MDEzMDljMjMyMzc2ZmEiLCJwYXNzd29yZCI6IjdkNjc0OTI2OTQyNzQwNzQ3NDQyYjZkNDQwOTQ3YTJiIiwicm9sZSI6InJvb3QifQ.GF4QpXFBbwQ_jFKjUYQHU8FeYPkeTN9k8ejXkgt2BDo",
        "storeId": 0,
        "role": "root",
        "first": false
    },
    "createTime": 157656615436
}
```

#### 400 Error

```json
{
  "errcode": 400,
  "errmsg": "Login Fail",
  "createTime": 157656615436
} 
```

## Overview | Usage

### Request

#### POST /api/2.2/auth/signin HTTP/1.1

```json
headers: {
    "Accept-Encoding": "Accept-Encoding: gzip, deflate"
} 
```

### Response

#### 200 OK

```json
{
    "body": [
        {
            "uuid": "5cda596857bb3cdd53a26a2d",
            "id": "ID",
            "barcode": "条形码",
            "qrcode": "二维码",
            "label1": "条形码文本",
            "label2": "二维码文本",
            "label3": "编号",
            "label4": "名称",
            "label5": "简称",
            "label6": "价格",
            "label7": "品牌",
            "label8": "规格",
            "label9": "等级",
            "label10": "单位",
            "label11": "产地",
            "label12": "供货商",
            "label13": "预留 1",
            "label14": "预留 2",
            "label15": "预留 3",
            "label16": "预留 4",
            "label17": "预留 5",
            "label18": "预留 6",
            "photo1": "图片 1",
            "photo2": "图片 2",
            "photo3": "图片 3",
            "photo4": "图片 4",
            "photo5": "图片 5",
            "sence": "retail",
            "lang": "zh",
            "createTime": 1557813608461
        },
        {
            "uuid":"5cda596857bb3cdd53a26a2d",
            "id": "ID",
            "barcode": "Barcode",
            "qrcode": "QR Code",
            "label1": "Barcode Text",
            "label2": "Qrcode Text",
            "label3": "Number",
            "label4": "Name",
            "label5": "Name Abbr",
            "label6": "Price",
            "label7": "Brand",
            "label8": "Specification",
            "label9": "Grade",
            "label10": "Unit",
            "label11": "Place Of Origin",
            "label12": "Supplier",
            "label13": "Placeholder1",
            "label14": "Placeholder2",
            "label15": "Placeholder3",
            "label16": "Placeholder4",
            "label17": "Placeholder5",
            "label18": "Placeholder6",
            "photo1": "photo1",
            "photo2": "photo2",
            "photo3": "photo3",
            "photo4": "photo4",
            "photo5": "photo5",
            "sence": "retail",
            "lang": "en",
            "createTime": 1557813608461
        }，
        {
            "uuid":"5cda596857bb3cdd53a26a2d",
            "id": "ID",
            "barcode": "バーコード",
            "qrcode": "QR コード",
            "label1": "バーコードテキスト",
            "label2": "QR コードテキスト",
            "label3": "番号",
            "label4": "名前",
            "label5": "略称",
            "label6": "価格",
            "label7": "ブランド",
            "label8": "規格",
            "label9": "ランク",
            "label10": "単位",
            "label11": "産地",
            "label12": "ベンダー",
            "label13": "予約 1",
            "label14": "予約 2",
            "label15": "予約 3",
            "label16": "予約 4",
            "label17": "予約 5",
            "label18": "予約 6",
            "photo1": "画像 1",
            "photo2": "画像 2",
            "photo3": "画像 3",
            "photo4": "画像 4",
            "photo5": "画像 5",
            "sence": "retail",
            "lang": "ja",
            "createTime": 1557813608461
        }
    ],
    "status": 200
}
``` 

#### 433 Error

```json
{
  "errcode": 433,
  "errmsg": "No scene selected",
  "createTime": 157656615436
}  
```

<img src="./svg/get.svg" alt="" /> EST