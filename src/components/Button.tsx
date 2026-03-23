import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'default' | 'outline' | 'subtle' | 'transparent'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'before' | 'after'
  children?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#0078D4] text-white hover:bg-[#106EBE] active:bg-[#005A9E] border border-transparent focus-visible:outline-[#0078D4]',
  default:
    'bg-white text-[#201F1E] hover:bg-[#F3F2F1] active:bg-[#EDEBE9] border border-[#8A8886] focus-visible:outline-[#0078D4]',
  outline:
    'bg-transparent text-[#0078D4] hover:bg-[#F3F2F1] active:bg-[#EDEBE9] border border-[#0078D4] focus-visible:outline-[#0078D4]',
  subtle:
    'bg-transparent text-[#201F1E] hover:bg-[#F3F2F1] active:bg-[#EDEBE9] border border-transparent focus-visible:outline-[#0078D4]',
  transparent:
    'bg-transparent text-[#0078D4] hover:bg-transparent active:bg-transparent underline border border-transparent focus-visible:outline-[#0078D4]',
}

const sizeStyles: Record<Size, string> = {
  small:  'h-6  px-2   text-xs  gap-1   rounded',
  medium: 'h-8  px-3   text-sm  gap-1.5 rounded',
  large:  'h-10 px-4   text-sm  gap-2   rounded',
}

export default function Button({
  variant = 'default',
  size = 'medium',
  icon,
  iconPosition = 'before',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-[Segoe_UI,system-ui,sans-serif] font-semibold',
        'transition-colors duration-100',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {icon && iconPosition === 'before' && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'after' && <span className="shrink-0">{icon}</span>}
    </button>
  )
}
