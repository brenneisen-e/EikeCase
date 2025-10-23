import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { EditorProvider } from "@/contexts/EditorContext"
import { EditorPanel } from "@/components/editor/EditorPanel"
import { EditorToggleButton } from "@/components/editor/EditorToggleButton"

function App() {
  return (
    <EditorProvider>
      <Pages />
      <Toaster />
      <EditorToggleButton />
      <EditorPanel />
    </EditorProvider>
  )
}

export default App 