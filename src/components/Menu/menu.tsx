import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    // 下拉菜单默认展开项
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props

    // 选中的元素
    const [currentActive, setActive] = useState(defaultIndex)

    const handleClick = (index: string) => {
        // 更改选中的元素索引
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus
    }

    const classes = classNames('feedoom-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'

    })

    const renderChildren = () => {
        // 确认 Menu 里的子元素为 MenuItem
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 添加索引
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.log('warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu
