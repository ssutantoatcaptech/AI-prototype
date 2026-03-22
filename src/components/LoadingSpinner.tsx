export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin`} />
    </div>
  )
}
