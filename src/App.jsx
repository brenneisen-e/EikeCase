import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { EditorProvider } from "@/contexts/EditorContext"
import { IframeProvider } from "@/contexts/IframeContext"
import { EditorPanel } from "@/components/editor/EditorPanel"
import { EditorToggleButton } from "@/components/editor/EditorToggleButton"
import { EditorOverlay } from "@/components/editor/EditorOverlay"

function App() {
  return (
    <EditorProvider>
      <IframeProvider>
        <Pages />
        <Toaster />
        <EditorToggleButton />
        <EditorPanel />
        <EditorOverlay />
      </IframeProvider>
    </EditorProvider>
  )
}

export default App 