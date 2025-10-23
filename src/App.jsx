import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { EditorProvider } from "@/contexts/EditorContext"
import { EditorPanel } from "@/components/editor/EditorPanel"
import { EditorToggleButton } from "@/components/editor/EditorToggleButton"
import { EditorOverlay } from "@/components/editor/EditorOverlay"

function App() {
  return (
    <EditorProvider>
      <Pages />
      <Toaster />
      <EditorToggleButton />
      <EditorPanel />
      <EditorOverlay />
    </EditorProvider>
  )
}

export default App 