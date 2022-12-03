import { FormInputRules } from '../types';
import { emailRegex } from './regex';

export const LOGIN_RULES: FormInputRules = {
  ['Обязательное поле']: (value) => /\S+/.test(value),
  ['Логин должен содержать от 3 до 20 символов']: (value) => /^(.{3,20})$/.test(value),
  ['Недопустимы пробелы']: (value) => /^\S*$/.test(value),
  ['Допустимы только латиница, цифры, символы "_" и "-"']: (value) => /^[0-9a-zA-Z\-\_]*$/.test(value),
  ['Логин не может состоять только из цифр']: (value) => /\D+/.test(value),
};

export const PASSWORD_RULES: FormInputRules = {
  ['Обязательное поле']: (value) => /\S+/.test(value),
  ['Пароль должен содержать от 8 до 40 символов']: (value) => /^(.{8,40})$/.test(value),
  ['Пароль должен содержать хотя бы одну заглавную букву']: (value) => /[A-ZА-Я]+/.test(value),
  ['Пароль должен содержать хотя бы одну цифру']: (value) => /[0-9]+/.test(value),
};

export const PHONES_RULES: FormInputRules = {
  ['Обязательное поле']: (value) => /\S+/.test(value),
  ['Некорректный формат телефона']: (value) => /^\+*(\d{10,15})$/.test(value),
};

export const EMAIL_RULES: FormInputRules = {
  ['Обязательное поле']: (value) => /\S+/.test(value),
  ['Некорректный формат email']: (value) => emailRegex.test(value),
};

export const NAME_RULES: FormInputRules = {
  ['Обязательное поле']: (value) => /\S+/.test(value),
  ['Должно начинаться с заглавной буквы']: (value) => /^[A-ZА-Я]/.test(value),
  ['Может содержать первую заглавную букву, строчные буквы и дефис']: (value) =>
    /^([A-ZА-Я]){1,1}[а-яa-z\-]*$/.test(value),
};
