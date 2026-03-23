import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import { Button as ShadButton } from './button'
import { Badge as ShadBadge } from './badge'
import { Card as ShadCard } from './card'

const noop = () => {}

const toast = (type, content) => {
  if (typeof document === 'undefined') return
  const el = document.createElement('div')
  const colorMap = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    warning: 'bg-amber-500',
    info: 'bg-slate-800',
    loading: 'bg-slate-800'
  }
  const base = 'fixed top-4 right-4 z-[9999] text-white text-sm px-4 py-2 rounded-xl shadow-lg transition-opacity duration-300'
  el.className = `${base} ${colorMap[type] || colorMap.info}`
  el.textContent = typeof content === 'string' ? content : 'Action completed'
  document.body.appendChild(el)
  setTimeout(() => { el.style.opacity = '0' }, 1800)
  setTimeout(() => { el.remove() }, 2200)
}

const message = {
  success: (content) => toast('success', content),
  error: (content) => toast('error', content),
  warning: (content) => toast('warning', content),
  info: (content) => toast('info', content),
  loading: (content) => toast('loading', content)
}

const modal = {
  confirm: ({ title, content, onOk, onCancel }) => {
    const ok = window.confirm(`${title || 'Confirm'}\n${content || ''}`)
    if (ok) onOk?.()
    else onCancel?.()
  }
}

export const App = ({ children }) => <>{children}</>
App.useApp = () => ({ message, modal })

export const ConfigProvider = ({ children }) => <>{children}</>

export const theme = {
  useToken: () => ({
    token: {
      colorBgContainer: '#ffffff',
      borderRadiusLG: 16
    }
  })
}

export const Button = React.forwardRef(({
  type,
  danger,
  size = 'middle',
  shape,
  icon,
  block,
  loading,
  className,
  children,
  htmlType,
  ...props
}, ref) => {
  const variant = type === 'primary' ? 'default' : type === 'text' ? 'ghost' : 'outline'
  const sizeClass = size === 'large'
    ? 'h-11 px-5 text-sm'
    : size === 'small'
      ? 'h-8 px-3 text-xs'
      : 'h-10 px-4 text-sm'
  const shapeClass = shape === 'round' ? 'rounded-full' : 'rounded-xl'
  const dangerClass = danger ? 'text-red-600 border-red-200 hover:bg-red-50' : ''
  const primaryDanger = danger && type === 'primary' ? 'bg-red-600 hover:bg-red-600/90 text-white' : ''
  const primaryClass = type === 'primary' ? 'bg-brand-purple text-white hover:bg-brand-purple/90' : ''
  const textClass = type === 'text' ? 'bg-transparent shadow-none hover:bg-gray-100' : ''
  const blockClass = block ? 'w-full' : ''

  return (
    <ShadButton
      ref={ref}
      type={htmlType || 'button'}
      variant={variant}
      className={cn(sizeClass, shapeClass, blockClass, primaryClass, primaryDanger, dangerClass, textClass, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />}
      {!loading && icon && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
    </ShadButton>
  )
})
Button.displayName = 'Button'

export const Input = React.forwardRef(({ prefix, suffix, size = 'middle', className, style, ...props }, ref) => {
  const sizeClass = size === 'large'
    ? 'h-11 text-sm'
    : size === 'small'
      ? 'h-8 text-xs'
      : 'h-10 text-sm'
  return (
    <div className={cn('relative w-full', className)} style={style}>
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{prefix}</span>}
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{suffix}</span>}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-gray-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-black/5',
          sizeClass,
          prefix ? 'pl-9' : '',
          suffix ? 'pr-9' : ''
        )}
        {...props}
      />
    </div>
  )
})
Input.displayName = 'Input'

Input.Password = React.forwardRef(({ prefix, suffix, size = 'middle', className, style, ...props }, ref) => (
  <Input ref={ref} prefix={prefix} suffix={suffix} size={size} className={className} style={style} type="password" {...props} />
))
Input.Password.displayName = 'Input.Password'

Input.TextArea = React.forwardRef(({ className, style, rows = 4, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn('w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5', className)}
    style={style}
    {...props}
  />
))
Input.TextArea.displayName = 'Input.TextArea'

export const InputNumber = React.forwardRef(({ className, style, ...props }, ref) => (
  <input
    ref={ref}
    type="number"
    className={cn('w-full rounded-xl border border-gray-200 bg-white px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/5', className)}
    style={style}
    {...props}
  />
))
InputNumber.displayName = 'InputNumber'

export const Select = ({ value, defaultValue, onChange, mode, placeholder, children, options, size = 'middle', className, style, ...props }) => {
  const isMultiple = mode === 'multiple' || mode === 'tags'
  const sizeClass = size === 'large' ? 'h-11 text-sm' : size === 'small' ? 'h-8 text-xs' : 'h-10 text-sm'

  const handleChange = (e) => {
    if (isMultiple) {
      const values = Array.from(e.target.selectedOptions).map(opt => opt.value)
      onChange?.(values)
    } else {
      onChange?.(e.target.value)
    }
  }

  const finalValue = value !== undefined ? value : defaultValue

  return (
    <select
      value={finalValue}
      multiple={isMultiple}
      onChange={handleChange}
      className={cn('w-full rounded-xl border border-gray-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-black/5', sizeClass, className)}
      style={style}
      {...props}
    >
      {!isMultiple && placeholder && <option value="">{placeholder}</option>}
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
      {children}
    </select>
  )
}
Select.Option = ({ value, children }) => <option value={value}>{children}</option>

export const Checkbox = ({ checked, onChange, children, className, ...props }) => (
  <label className={cn('inline-flex items-center gap-2 text-sm', className)}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.({ target: { checked: e.target.checked } })}
      className="h-4 w-4 rounded border-gray-300"
      {...props}
    />
    {children}
  </label>
)

export const Switch = ({ checked, onChange, className, ...props }) => (
  <button
    type="button"
    onClick={() => onChange?.(!checked)}
    className={cn('relative inline-flex h-6 w-10 items-center rounded-full transition-colors', checked ? 'bg-emerald-500' : 'bg-gray-300', className)}
    {...props}
  >
    <span className={cn('inline-block h-4 w-4 transform rounded-full bg-white transition-transform', checked ? 'translate-x-5' : 'translate-x-1')} />
  </button>
)

export const Radio = ({ children }) => <>{children}</>
Radio.Group = ({ value, onChange, children, className }) => (
  <div className={cn('inline-flex rounded-xl border border-gray-200 overflow-hidden', className)}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        active: child.props.value === value,
        onSelect: () => onChange?.({ target: { value: child.props.value } })
      })
    )}
  </div>
)
Radio.Button = ({ value, active, onSelect, children, style }) => (
  <button
    type="button"
    onClick={onSelect}
    style={style}
    className={cn('px-4 py-2 text-sm transition-colors', active ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50')}
  >
    {children}
  </button>
)

export const Badge = ({ count, children, size, offset }) => {
  if (!children) {
    return <ShadBadge>{count}</ShadBadge>
  }
  return (
    <span className="relative inline-flex">
      {children}
      {count !== undefined && count !== null && (
        <span className="absolute -top-1 -right-1 min-w-[16px] rounded-full bg-brand-purple px-1 text-[10px] font-bold text-white text-center">
          {count}
        </span>
      )}
    </span>
  )
}

export const Tag = ({ color, children, className }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    error: 'bg-red-50 text-red-700 border-red-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    gold: 'bg-amber-50 text-amber-700 border-amber-100',
    default: 'bg-gray-50 text-gray-600 border-gray-100'
  }
  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium', colorMap[color] || colorMap.default, className)}>
      {children}
    </span>
  )
}

export const Space = ({ direction = 'horizontal', size = 'middle', children, className }) => {
  const gapMap = { small: 'gap-2', middle: 'gap-3', large: 'gap-4' }
  return (
    <div className={cn('flex', direction === 'vertical' ? 'flex-col' : 'flex-row', gapMap[size] || 'gap-2', className)}>
      {children}
    </div>
  )
}

export const Typography = {
  Title: ({ level = 2, children, style }) => {
    const Tag = `h${level}`
    const sizeMap = { 1: 'text-3xl', 2: 'text-2xl', 3: 'text-xl', 4: 'text-lg', 5: 'text-base' }
    return <Tag style={style} className={cn('font-bold text-gray-900', sizeMap[level] || 'text-2xl')}>{children}</Tag>
  },
  Text: ({ type, strong, children, style }) => {
    const typeMap = {
      secondary: 'text-gray-500',
      success: 'text-emerald-600',
      danger: 'text-red-600',
      warning: 'text-amber-600'
    }
    return <span style={style} className={cn(strong ? 'font-semibold' : '', typeMap[type] || 'text-gray-700')}>{children}</span>
  }
}

export const Layout = ({ children, style, className }) => (
  <div className={cn('flex w-full', className)} style={style}>{children}</div>
)
Layout.Header = ({ children, style, className }) => (
  <header className={cn('w-full', className)} style={style}>{children}</header>
)
Layout.Sider = ({ children, style, className, width }) => (
  <aside className={cn('h-full', className)} style={{ width, ...style }}>{children}</aside>
)
Layout.Content = ({ children, style, className }) => (
  <main className={cn('flex-1', className)} style={style}>{children}</main>
)

export const Menu = ({ items = [], selectedKeys = [], className }) => (
  <nav className={cn('flex flex-col gap-1', className)}>
    {items.map((item) => (
      <div
        key={item.key}
        className={cn(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/10',
          selectedKeys.includes(item.key) ? 'bg-white/10 text-white' : ''
        )}
      >
        {item.icon}
        {item.label}
      </div>
    ))}
  </nav>
)

export const Avatar = ({ src, icon, size = 32, className }) => (
  <div className={cn('inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 overflow-hidden', className)} style={{ width: size, height: size }}>
    {src ? <img src={src} alt="avatar" className="w-full h-full object-cover" /> : icon}
  </div>
)

export const Card = ({ children, className, ...props }) => (
  <ShadCard className={cn('border border-gray-100 shadow-sm rounded-2xl', className)} {...props}>
    {children}
  </ShadCard>
)
Card.Meta = ({ title, description, avatar }) => (
  <div className="flex gap-3 items-start">
    {avatar && <div className="shrink-0">{avatar}</div>}
    <div className="space-y-1">
      {title && <div className="font-semibold text-gray-900 text-sm">{title}</div>}
      {description && <div className="text-xs text-gray-500">{description}</div>}
    </div>
  </div>
)

export const Row = ({ children, gutter = 16, className }) => (
  <div className={cn('flex flex-wrap', className)} style={{ gap: gutter }}>
    {children}
  </div>
)

export const Col = ({ children, span = 24, className }) => (
  <div className={cn(className)} style={{ flex: `0 0 ${(span / 24) * 100}%` }}>
    {children}
  </div>
)

export const Divider = ({ className, orientation, plain, ...props }) => (
  <hr className={cn('my-4 border-gray-100', className)} {...props} />
)

export const Tooltip = ({ title, children }) => (
  <span title={title}>{children}</span>
)

export const Progress = ({ percent = 0, className }) => (
  <div className={cn('w-full h-2 bg-gray-100 rounded-full overflow-hidden', className)}>
    <div className="h-full bg-brand-purple" style={{ width: `${percent}%` }} />
  </div>
)

export const Alert = ({ type = 'info', message: text, description, className }) => {
  const typeMap = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    error: 'bg-red-50 text-red-700 border-red-100'
  }
  return (
    <div className={cn('rounded-xl border px-4 py-3 text-sm', typeMap[type] || typeMap.info, className)}>
      <div className="font-medium">{text}</div>
      {description && <div className="mt-1 text-xs opacity-80">{description}</div>}
    </div>
  )
}

export const Rate = ({ value = 0 }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= value ? 'text-amber-400' : 'text-gray-300'}>★</span>
    ))}
  </div>
)

export const Statistic = ({ title, value, suffix, prefix }) => (
  <div className="space-y-1">
    <div className="text-xs text-gray-500">{title}</div>
    <div className="text-xl font-semibold text-gray-900">
      {prefix}{value}{suffix}
    </div>
  </div>
)

export const Tabs = ({ items, activeKey, onChange, children }) => {
  const panes = items || React.Children.toArray(children).filter(Boolean).map((child) => ({
    key: child.key,
    tab: child.props.tab,
    content: child.props.children
  }))
  const [internal, setInternal] = useState(panes[0]?.key)
  const currentKey = activeKey ?? internal

  const handleChange = (key) => {
    if (activeKey === undefined) setInternal(key)
    onChange?.(key)
  }

  return (
    <div>
      <div className="flex gap-2 border-b border-gray-100">
        {panes.map((pane) => (
          <button
            key={pane.key}
            onClick={() => handleChange(pane.key)}
            className={cn('px-4 py-2 text-sm font-medium', currentKey === pane.key ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500')}
          >
            {pane.tab}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {panes.map((pane) => (
          currentKey === pane.key ? <div key={pane.key}>{pane.content}</div> : null
        ))}
      </div>
    </div>
  )
}
Tabs.TabPane = ({ children }) => <>{children}</>

export const Descriptions = ({ column = 1, bordered, children, size }) => (
  <div
    className={cn('grid gap-4', bordered ? 'border border-gray-100 rounded-xl p-4' : '')}
    style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
)
Descriptions.Item = ({ label, children, span = 1 }) => (
  <div style={{ gridColumn: `span ${span}` }}>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-sm text-gray-900">{children}</div>
  </div>
)

export const Steps = ({ current = 0, items = [] }) => (
  <div className="flex items-center gap-4">
    {items.map((item, index) => (
      <div key={item.title} className="flex items-center gap-2">
        <div className={cn('h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold', index <= current ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500')}>
          {index + 1}
        </div>
        <div className="text-sm text-gray-700">{item.title}</div>
        {index < items.length - 1 && <div className="w-8 h-px bg-gray-200" />}
      </div>
    ))}
  </div>
)

export const Empty = ({ description = 'No data', className }) => (
  <div className={cn('text-sm text-gray-500 text-center py-8', className)}>{description}</div>
)

export const Upload = ({ children, onChange, multiple, accept }) => (
  <label className="inline-flex cursor-pointer">
    <input type="file" className="hidden" onChange={onChange} multiple={multiple} accept={accept} />
    {children}
  </label>
)
Upload.Dragger = ({ children, onChange, multiple, accept }) => (
  <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center hover:border-brand-purple/40">
    <input type="file" className="hidden" onChange={onChange} multiple={multiple} accept={accept} />
    {children}
  </label>
)

export const DatePicker = ({ showTime, onChange, className, style, value, ...props }) => {
  const inputValue = value?.format ? value.format(showTime ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD') : value
  return (
    <input
      type={showTime ? 'datetime-local' : 'date'}
      className={cn('w-full rounded-xl border border-gray-200 bg-white px-3 h-10 text-sm', className)}
      style={style}
      value={inputValue || ''}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  )
}
DatePicker.RangePicker = ({ onChange, className, style, value }) => {
  const startValue = value?.[0]?.format ? value[0].format('YYYY-MM-DD') : value?.[0]
  const endValue = value?.[1]?.format ? value[1].format('YYYY-MM-DD') : value?.[1]
  return (
    <div className={cn('flex gap-2', className)} style={style}>
      <input
        type="date"
        value={startValue || ''}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 h-10 text-sm"
        onChange={(e) => onChange?.([e.target.value, endValue])}
      />
      <input
        type="date"
        value={endValue || ''}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 h-10 text-sm"
        onChange={(e) => onChange?.([startValue, e.target.value])}
      />
    </div>
  )
}

export const TimePicker = ({ onChange, className, style, value, ...props }) => {
  const inputValue = value?.format ? value.format('HH:mm') : value
  return (
    <input
      type="time"
      className={cn('w-full rounded-xl border border-gray-200 bg-white px-3 h-10 text-sm', className)}
      style={style}
      value={inputValue || ''}
      onChange={(e) => onChange?.(e.target.value)}
      {...props}
    />
  )
}

export const Popover = ({ content, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <span onClick={() => setOpen(!open)}>{children}</span>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
          {content}
        </div>
      )}
    </span>
  )
}

export const Dropdown = ({ overlay, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <span onClick={() => setOpen(!open)}>{children}</span>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
          {overlay}
        </div>
      )}
    </span>
  )
}

export const List = ({ dataSource = [], renderItem }) => (
  <div className="space-y-2">
    {dataSource.map((item, idx) => (
      <div key={item.key || idx}>{renderItem(item, idx)}</div>
    ))}
  </div>
)
List.Item = ({ children, style }) => (
  <div style={style} className="rounded-xl border border-gray-100 bg-white p-4">
    {children}
  </div>
)

export const Table = ({ columns = [], dataSource = [], rowKey }) => (
  <div className="w-full overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key || col.dataIndex} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {dataSource.map((row, index) => (
          <tr key={rowKey ? row[rowKey] : index}>
            {columns.map((col) => {
              const value = col.dataIndex ? row[col.dataIndex] : row
              return (
                <td key={col.key || col.dataIndex} className="px-4 py-3 text-sm text-gray-700">
                  {col.render ? col.render(value, row, index) : value}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Form implementation
const FormContext = createContext(null)

const useInternalForm = () => {
  const formRef = useRef({
    values: {},
    rules: {},
    setFieldsValue: noop,
    getFieldValue: noop,
    resetFields: noop,
    validateFields: async () => ({})
  })
  return formRef.current
}

export const Form = ({ form, layout, children, onFinish, style, ...props }) => {
  const internal = useInternalForm()
  const [values, setValues] = useState(form?.values || {})
  const rulesRef = useRef({})

  const register = (name, rules) => {
    if (name) rulesRef.current[name] = rules
  }

  const setFieldsValue = (next) => setValues((prev) => ({ ...prev, ...next }))
  const getFieldValue = (name) => values[name]
  const resetFields = () => setValues({})

  const validateFields = async () => {
    const errors = []
    Object.entries(rulesRef.current).forEach(([name, rules]) => {
      if (!rules) return
      const requiredRule = rules.find((r) => r.required)
      if (requiredRule && !values[name]) {
        errors.push({ name, message: requiredRule.message || 'Required' })
      }
    })
    if (errors.length) {
      throw errors
    }
    return values
  }

  useEffect(() => {
    if (form) {
      form.values = values
      form.setFieldsValue = setFieldsValue
      form.getFieldValue = getFieldValue
      form.resetFields = resetFields
      form.validateFields = validateFields
    } else {
      internal.values = values
      internal.setFieldsValue = setFieldsValue
      internal.getFieldValue = getFieldValue
      internal.resetFields = resetFields
      internal.validateFields = validateFields
    }
  }, [form, values])

  const contextValue = useMemo(() => ({ values, setFieldsValue, getFieldValue, register }), [values])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onFinish) {
      const vals = await validateFields()
      onFinish(vals)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style} {...props}>
      <FormContext.Provider value={contextValue}>
        <div className={cn(layout === 'vertical' ? 'space-y-4' : '')}>{children}</div>
      </FormContext.Provider>
    </form>
  )
}

Form.useForm = () => [useInternalForm()]

Form.Item = ({ name, label, rules, children, shouldUpdate, noStyle }) => {
  const ctx = useContext(FormContext)

  useEffect(() => {
    if (name) ctx?.register(name, rules)
  }, [name, rules])

  if (typeof children === 'function') {
    return children({ getFieldValue: ctx?.getFieldValue })
  }

  const value = name ? ctx?.values?.[name] : undefined
  const onChange = (val) => {
    const nextValue = val?.target ? (val.target.checked ?? val.target.value) : val
    ctx?.setFieldsValue({ [name]: nextValue })
  }

  const child = React.Children.only(children)
  const isBoolean = typeof value === 'boolean'
  const childProps = name ? { value, ...(isBoolean ? { checked: value } : {}), onChange } : {}

  if (noStyle) return React.cloneElement(child, { ...child.props, ...childProps })

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {React.cloneElement(child, { ...child.props, ...childProps })}
    </div>
  )
}

export const Modal = ({ open, onCancel, onOk, title, children, okText = 'OK', cancelText = 'Cancel', footer, destroyOnClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="text-lg font-semibold text-gray-900 mb-4">{title}</div>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        {footer !== null && (
          <div className="mt-6 flex justify-end gap-2">
            <Button type="text" onClick={onCancel}>{cancelText}</Button>
            <Button type="primary" onClick={onOk}>{okText}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { message, modal }
