export function ModalBox({ children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center sm:p-4">
      {children}
    </div>
  )
}
