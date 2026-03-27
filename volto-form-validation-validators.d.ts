declare module '@plone/volto/helpers/FormValidation/validators' {
  export const minLengthValidator: (...args: any[]) => any;
  export const maxLengthValidator: (...args: any[]) => any;
  export const urlValidator: (...args: any[]) => any;
  export const emailValidator: (...args: any[]) => any;
  export const isNumberValidator: (...args: any[]) => any;
  export const maximumValidator: (...args: any[]) => any;
  export const minimumValidator: (...args: any[]) => any;
  export const isIntegerValidator: (...args: any[]) => any;
  export const maxItemsValidator: (...args: any[]) => any;
  export const minItemsValidator: (...args: any[]) => any;
  export const hasUniqueItemsValidator: (...args: any[]) => any;
  export const startEventDateRangeValidator: (...args: any[]) => any;
  export const endEventDateRangeValidator: (...args: any[]) => any;
  export const patternValidator: (...args: any[]) => any;
  export const defaultLanguageControlPanelValidator: (...args: any[]) => any;
  export const sizeValidator: (...args: any[]) => any;
}

declare module 'react-router-hash-link' {
  export const HashLink: any;
}

declare module '@plone/volto/helpers/Url/Url' {
  export const flattenToAppURL: (...args: any[]) => any;
  export const isInternalURL: (...args: any[]) => any;
  export const getFieldURL: (...args: any[]) => any;
  export const URLUtils: any;
}

declare module '@plone/volto/registry' {
  const config: any;
  export default config;
}
