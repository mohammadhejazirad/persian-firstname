# Persian FirstName 🇮🇷

Package of all Iranian (and Arabic) names

> پکیج تمامی اسامی ایرانی (و عربی)

## Using:

install:

```bash
npm install persian-firstname
```

```bash
yarn install persian-firstname
```

import:

```javascript
import PersianName from 'persian-firstname';
```

require:

```javascript
const PersianName = require('persian-firstname').default;
```

---

## Examples

Validation Persian Name:

```javascript
const is_name = PersianName.validationPersianName('آرش');
console.log(is_name); //true  or  false
```

using options

```javascript
const is_name = PersianName.validationPersianName('امیر', {
  convertToPersian: true, // ي ==> ی (using package @persian-tools)
  typeCheck: 'exact', //include type or exact type for find name
  trimName: true, //trim name before validation (remove space and A-Z characters and emojis and ...)
});
console.log(is_name); //true  or  false
```

##

Get All FirstName:

```javascript
const get_names = PersianName.getNames();
console.log(get_names);

/*
[
   { id: 1, name: 'اَبدەَ', gender: 1, rate: 3 },
   { id: 2, name: 'اَبیش', gender: 1, rate: 3 },
   ...
]
*/
```

using options:

```javascript
const get_names = PersianName.getNames({
  genderType: 'stringFa', // default is "number"
  rateType: 'stringFa', // default is "number"
  getParamsData: {
    // return param data
    //default is true
    id: false,
    name: true,
    gender: true,
    rate: true,
  },
});
console.log(get_names);
/*
[
    { name: 'اَبدەَ', gender: 'مرد', rate: 'بسیار نادر' }
   { name: 'اَبیش', gender: 'مرد', rate: 'بسیار نادر' },
   ...
]
*/
```

Rate Types:
| value | stringEn type | number type | stringFa type
|---|---|---|---|
| 1 |very practical|1|پر کاربردی|
| 2 |normal|2|معمولی|
| 3 |very rare| 3| بسیار نادر|

Gender Types:

| value | genderTypeEn | genderTypeFa | genderTypeNumber | genderTypeEmoji | genderTypeArb |
| ----- | ------------ | ------------ | ---------------- | --------------- | ------------- |
| 1     | Male         | مرد          | 1                | ♂️              | مذکر          |
| 2     | Female       | زن           | 2                | ♀️              | مونت          |
| 3     | Both         | هر دو        | 3                | ♂️♀️            | هر دو         |

##

Find Name:

```javascript
const find_name = PersianName.findName('زهرا');
console.log(find_name);
// return { id: 2887, name: 'زهرا', gender: 2, rate: 1 }
```

using options:

```javascript
const find_name = PersianName.findName('علی', {
  // previous duplicate options
  showErrorMessage: true, //if not find name return (*name*) find name  //default: false
  consoleLog: true, //default: false //if not find name sow console log (*name*) find name
});
```

##

Get Gender Name:

```javascript
const get_gender_name = PersianName.getGenderName('سارا', {
  // previous duplicate options
  genderType: 'stringFa',
});
console.log(get_gender_name);
// return { gender: 'زن' }
```

##

Random Name:

```javascript
const random_name = PersianName.randomName({
  // previous duplicate options
  firstLetterName: 'م', // first letter name
  countOfNames: 5, // number of names
});
console.log(random_name);
/** 
 *  return   [
      { id: 4132, name: 'مأمون', gender: 1, rate: 3 },
      { id: 4133, name: 'مائده', gender: 2, rate: 1 },
      { id: 4134, name: 'ماتیار', gender: 1, rate: 3 },
      { id: 4135, name: 'ماتیسا', gender: 2, rate: 3 },
      { id: 4136, name: 'ماتینا', gender: 2, rate: 3 }
    ]
 */
```

---

## نکات

1- ممکن است یک سری از نام ها در این کتابخانه وجود نداشته باشد. که شما می توانید از طریق این لینک پروژه تبدیل کننده آن را دریافت کنید: [project](https://github.com/mohammadhejazirad/converExcelToSqlite_forLibrary)
که این پروژه شامل فایل اکسل آماده اسامی + کد های جاوااسکریپت برای تبدیل فایل اکسل به sqlite است.

2- بعضی از اسامی مانند حشمت و یا احسان و... هم در مردان و هم در زنان استفاده می شود پس این کتابخانه در جواب آن به شما پاسخ 3 و یا هردو و... میدهد.

3-این کتابخانه برای سهولت در توسعه و کار کردن با آن از دیتابیس داخلی یعنی sqlite استفاده می کند.

4- این کتابخانه تا به الان شامل 6179 عدد نام مرد و زن (عربی و فارسی) است.

5- نام هایی مثل محمد و محمدرضا و یا محمدمهدی جدا هستند و جدا حساب می شوند.

---

### مشتاق به دریافت پیشنهادات و نظرات دوستان هستم.

[✉️ email](mailto:hejazi00831@gmail.com) : hejazi00831@gmail.com

[🌐 github](https://github.com/mohammadhejazirad) : https://github.com/mohammadhejazirad
