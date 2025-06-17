import { useRegisterSW } from 'virtual:pwa-register/react'
export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="pwa-toast">
      {offlineReady && <p>App is ready to work offline.</p>}
      {needRefresh && (
        <>
          <p>New version available!</p>
          <button onClick={() => updateServiceWorker(true)}>Update</button>
        </>
      )}
      <button onClick={() => {
        setOfflineReady(false)
        setNeedRefresh(false)
      }}>Close</button>
    </div>
  )
}
