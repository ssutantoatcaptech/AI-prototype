interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({ variant = 'primary', fullWidth = false, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-black text-black bg-white hover:bg-gray-50',
    ghost: 'text-black hover:bg-gray-100',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
