import Joi = require('joi')

export default class UserValidator {
  public register (value: any) {
    let schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      nickName: Joi.string(),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .regex(new RegExp('^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()\-__+.]){1,}).{8,32}$')),
      confirmPassword: Joi.ref('password'),
      birthday: Joi.string()
        .isoDate()
        .required()
    }).with('password', 'confirmPassword')

    return schema.validate(value)
  }

  public edit (value: any) {
    let schema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      nickName: Joi.string(),
      email: Joi.string().email(),
      birthday: Joi.string().isoDate()
    })

    return schema.validate(value)
  }

  public login (value: any) {
    let schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .max(32)
        .required()
    })

    return schema.validate(value)
  }

  public changePassword (value: any) {
    let schema = Joi.object({
      actualPassword: Joi.string()
        .min(8)
        .max(32)
        .required()
        .regex(new RegExp('^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()\-__+.]){1,}).{8,32}$')),
      password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .regex(new RegExp('^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){0,})(?=(.*[!@# $%^&*()\-__+.]){1,}).{8,32}$')),
      confirmPassword: Joi.ref('password')
    }).with('password', 'confirmPassword')

    return schema.validate(value)
  }
}
