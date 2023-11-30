import { Validator, required, isMobile, range, min, max, equalTo, regular, regexps, rangeLength, maxLength, minLength, isEmail, isIDCard, isPrice, packStrategy } from './main.js'

const btn = document.querySelector('.btn-test')

const v = new Validator({
  name: [required('请输入姓名'), rangeLength(2, 5, 'rl超出范围')],
  phone: [required(), isMobile('手机号码格式错误')],
  twoPhone: equalTo('phone', '不相等'),
  age: range(1, 120, '超出范围'),
  min: min(3, 'min超出范围'),
  max: max(10, 'max超出范围'),
  maxLength: maxLength(2, 'maxl超出范围'),
  minLength: minLength(5, 'minl超出范围'),
  email: isEmail('邮箱错误'),
  idCard: isIDCard('id错误'),
  price: isPrice('金额错误'),
  r: regular(regexps.capital, '大写'),
  other: (val, key, formData) => {
    if (val !== 'other') return `${key}错误`
  },
  pack: packStrategy((val, key, formData) => {
    if (val !== 'pack') return `${key}错误`
  })
})

btn.addEventListener('click', () => {
  const errData = {
    name: '测',
    phone: '1367051550',
    twoPhone: '1367051509',
    age: '0',
    min: '2',
    max: '12',
    maxLength: 'hhhhhhhh',
    minLength: 'lll',
    email: '111@qq',
    idCard: '44',
    price: 'sdas',
    r: '11',
    pack: 'ss'
  }

  const error = v.validateFind(errData)

  const errors = v.validate(errData)

  console.log('find', error)
  console.log('all', errors)

  const data = {
    name: '测试',
    phone: '13670515509',
    twoPhone: '13670515509',
    age: '18',
    min: '4',
    max: '10',
    maxLength: 'hh',
    minLength: 'll44444',
    email: '111@qq.com',
    idCard: '44051019961114041X',
    price: '10',
    r: 'ASSS',
    other: 'other',
    // pack: 'pack'
  }

  const ok = v.validateFind(data)

  const okAll = v.validate(data)

  console.log('ok', ok)
  console.log('okAll', okAll)
})
