export const regexps = {
  /** 大写字母 */
  capital: /^[A-Z]+$/,
  /** 身份证 */
  IDCard: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
  /** 护照 */
  passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
  /** 港澳通行证 */
  passportMacao: /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/,
  /** 台湾通行证 */
  passportTaiwan: /^\\d{8}|^[a-zA-Z0-9]{10}|^\\d{18}$/,
  /** 军官证 */
  certificate: /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/,
  /** 金额 */
  price: /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/,
  /** 手机号 */
  mobile: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
  /** 邮箱 */
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

/**
 * 包装策略函数
 * @param {Function} fn 策略函数
 * @param {Boolean} isRequired 是否必填
 * @returns 策略函数
 */
export function packStrategy (fn, isRequired = false) {
  return (val = '', key = '', formData = {}) => {
    if (!isRequired && val === '') return
    return fn(val, key, formData)
  }
}

/**
 * 正则验证
 * @param {*} regex 正则表达式
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const regular = (regex, msg) => packStrategy((val, key) => {
  if (!(regex.test(val))) return msg || `${key}验证不通过`
})

/**
 * 必填
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const required = (msg) => packStrategy((val, key) => {
  if (val.trim() === '') return msg || `${key}的值不能为空`
}, true)

/**
 * 相等校验
 * @param {String} toKey 表单的另一个key
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const equalTo = (toKey = '', msg) => packStrategy((val, key, formData) => {
  if (val !== formData[toKey]) return msg || `${key}的值不等于${toKey}的值`
})

/**
 * 字符串最小长度
 * @param {Number} length 字符长度
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const minLength = (length, msg) => packStrategy((val, key) => {
  if (val.length < length) return msg || `${key}的值长度不能小于${length}`
})

/**
 * 字符串最大长度
 * @param {Number} length 字符长度
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const maxLength = (length, msg) => packStrategy((val, key) => {
  if (val.length > length) return msg || `${key}的值长度不能超过${length}`
})

/**
 * 字符串长度范围
 * @param {Number} min 最小长度
 * @param {Number} max 最大长度
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const rangeLength = (min, max, msg) => packStrategy((val, key) => {
  if (val.length > max || val.length < min) return msg || `${key}的值长度范围应该是${min}~${max}`
})

/**
 * 最小值限制
 * @param {Number} length 最小值
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const min = (m, msg) => packStrategy((val, key) => {
  if (parseFloat(val) < m) return msg || `${key}的值不能小于${m}`
})

/**
 * 最大值限制
 * @param {Number} length 最大值
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const max = (m, msg) => packStrategy((val, key) => {
  if (parseFloat(val) > m) return msg || `${key}的值不能超过${m}`
})

/**
 * 数值范围
 * @param {Number} min 最小长度
 * @param {Number} max 最大长度
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const range = (min, max, msg) => packStrategy((val, key) => {
  if (parseFloat(val) < min || parseFloat(val) > max) return msg || `${key}的值范围应该是${min}~${max}`
})

/**
 * 金额判断
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const isPrice = (msg) => regular(regexps.price, msg)

/**
 * 手机号码判断
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const isMobile = (msg) => regular(regexps.mobile, msg)

/**
 * 邮箱判断
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const isEmail = (msg) => regular(regexps.email, msg)

/**
 * 身份证判断
 * @param {String} msg 提示信息
 * @returns 提示信息
 */
export const isIDCard = (msg) => regular(regexps.IDCard, msg)

export class Validator {
  /**
   * 验证表单
   * @param {Object} rules 验证规则
   */
  constructor (rules = {}) {
    this.rules = {}

    this.addRules(rules)
  }

  /**
   * 添加规则
   * @param {Object} rules 验证规则
   */
  addRules (rules = {}) {
    Object.assign(this.rules, rules)
  }

  /**
   * 验证表单，检验到错误立马返回
   * @param {Object} formData 表单数据
   * @returns 错误信息 { key：表单key；val：表单的值；msg：错误信息；} || false
   */
  validateFind (formData = {}) {
    const { rules } = this

    return Validator.validateFind(formData, rules)
  }

  /**
   * 验证表单
   * @param {Object} formData 表单数据
   * @returns 错误信息 [{ key：表单key；val：表单的值；msg：错误信息；}]
   */
  validate (formData = {}) {
    const { rules } = this
    
    return Validator.validate(formData, rules)
  }
  
  /**
   * 验证表单，检验到错误立马返回
   * @param {Object} formData 表单数据
   * @param {Object} rules 验证规则
   * @returns 错误信息 { key：表单key；val：表单的值；msg：错误信息；} || false
   */
  static validateFind (formData = {}, rules = {}) {
    for (let key in rules) {
      if (!rules.hasOwnProperty(key)) continue
      
      const item = rules[key]

      if (Array.isArray(item)) {
        for (let fun of item) {
          const msg = fun(formData[key], key, formData)
          if (msg) return { msg, key, val: formData[key] }
        }
      } else if (typeof item === 'function') {
        const msg = item(formData[key], key, formData)
        if (msg) return { msg, key, val: formData[key] }
      }
    }

    return false
  }

  /**
   * 验证表单（静态方法）
   * @param {Object} formData 表单数据
   * @param {Object} rules 验证规则
   * @returns 错误信息 [{ key：表单key；val：表单的值；msg：错误信息；}]
   */
  static validate (formData = {}, rules = {}) {
    const errors = []
    
    for (let key in rules) {
      if (!rules.hasOwnProperty(key)) continue
      
      const item = rules[key]

      if (Array.isArray(item)) {
        for (let fun of item) {
          const msg = fun(formData[key], key, formData)
          if (msg) { errors.push({ msg, key, val: formData[key] }) }
        }
      } else if (typeof item === 'function') {
        const msg = item(formData[key], key, formData)
        if (msg) { errors.push({ msg, key, val: formData[key] }) }
      }
    }

    return errors
  }
}
