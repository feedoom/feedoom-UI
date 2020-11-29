import React, { FC, useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** 复发自动提示的函数 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中提示选项时触发的函数 */
  onSelect?: (item: DataSourceType) => void;
  /** 自定义模板函数 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props;

  // 用户输入的值
  const [inputValue, setInputValue] = useState(value);
  // 下拉提建议
  const [suggestions, setSugetions] = useState<DataSourceType[]>([]);
  // 异步是否加载
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSugetions(data);
        });
      } else {
        setSugetions(results);
      }
    } else {
      setSugetions([]);
    }
  };

  // 点击下拉菜单的选项触发的函数
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSugetions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 渲染下拉菜单
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="feedoom-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
