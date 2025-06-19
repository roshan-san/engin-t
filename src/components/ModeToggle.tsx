import { Moon, Sun } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useTheme } from "./ThemeProvider"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      />
      <Label htmlFor="theme-mode" className="flex items-center gap-2">
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Label>
    </div>
  )
}