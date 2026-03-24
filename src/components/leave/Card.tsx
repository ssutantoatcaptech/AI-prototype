interface Props {
  children: React.ReactNode
}

export default function Card({ children }: Props) {
  return (
    <div className="bg-white border border-[#e2e2e5] rounded-[10px] px-9 py-8">
      {children}
    </div>
  )
}
