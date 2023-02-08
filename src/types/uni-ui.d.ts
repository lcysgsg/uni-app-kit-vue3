type Rule = {
  /**
   * 是否必填，配置此参数不会显示输入框左边的必填星号，如需要，请配置uni-forms-item组件的的required为true
   */
  required?: boolean;
  /**
   * 数组至少要有一个元素，且数组内的每一个元素都是唯一的。
   */
  range?: Array<any>;
  /**
   * 内置校验规则，如这些规则无法满足需求，可以使用正则匹配或者自定义规则
   */
  format?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'url' | 'email';
  /**
   * 正则表达式
   */
  pattern?: RegExp;
  /**
   * 校验最大值(大于)
   */
  maximum?: number;
  /**
   * 校验最小值(小于)
   */
  minimum?: number;
  /**
   * 校验数据最大长度
   */
  maxLength?: number;
  /**
   * 校验失败提示信息语，可添加属性占位符，当前表格内属性都可用作占位符
   */
  errorMessage?: string;
  /**
   * 自定义校验规则
   */
  validateFunction?: (
    rule?: Rule,
    value?: any,
    data?: Record<string, any>,
    callback?: (message?: string) => void,
  ) => any;
};

type ValidateRule = {
  rules?: Rule[];
  label?: string;
};

declare namespace Uniui {
  export type RuleItem = Rule;

  export type FormRule = {
    [key: string]: ValidateRule;
  };
  export interface FormsRef {
    /**
     * 动态设置表单规则
     */
    setRules(rules?: FormRule): void;
    /**
     * 对整个表单进行校验的方法，会返回一个 promise
     */
    validate(keepItem?: string[], callback?: (err: any, formData: object) => void): Promise<any>;
    /**
     * 部分表单进行校验
     */
    validateField(props?: string[], callback?: (err: any, formData: object) => void): Promise<any>;
    /**
     * 移除表单的校验结果
     */
    clearValidate(props?: string[]): void;
    /**
     * 设置表单某一项 name 的对应值，通常在 uni-forms-item 和自定表单组件中使用
     */
    setValue(key: string, value: any): void;
    [key: string]: any;
  }

  export interface PopupRef {
    open(direction?: 'top' | 'center' | 'bottom' | 'left' | 'right' | 'message' | 'dialog' | 'share'): void;
    close(): void;
  }
}
