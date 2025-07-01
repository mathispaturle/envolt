'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Copy, Download, Plus, Save } from 'lucide-react'
import { addSecret, getFullVaultData } from '@/lib/firebase' 
import { Secret } from '@/types/types'
import SecretView from '@/components/app/SecretView'
import { toast } from 'sonner'
import { Timestamp } from 'firebase/firestore'
import InviteButton from '@/components/app/InviteButton'
import { downloadEnvFile } from '../../../lib/EnvDownloader'
import Footer from '../../../components/app/footer'

type EnvVar = { key: string; value: string }

export default function Page() {

  const params = useParams()
  const vaultId = params?.id as string

  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { key: '', value: '' },
  ])
  const [myEnvVars, setMyEnvVars] = useState<Secret[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleAddRow = () => {
    setEnvVars([...envVars, { key: '', value: '' }])
  }

  const handleUpdateRow = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...envVars]
    updated[index][field] = value
    setEnvVars(updated)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await Promise.all(
        envVars
          .filter(v => v.key && v.value) // skip incomplete rows
          .map(v => addSecret(vaultId, v.key, v.value))
      )
      // Reset or show a success message here
      setEnvVars([{ key: '', value: '' }])
    } catch (err) {
      console.error('Failed to save secrets:', err)
    } finally {
      setLoading(false)
      if (typeof window !== 'undefined') {
        window.location.reload() // Reload to fetch updated secrets
      }
    }
  }

  const handleEnvDownload = () => {
    downloadEnvFile(myEnvVars)
  }

  useEffect(() => {
    const FetchVariables = async () => {
      try {
        // Fetch existing secrets from the vault
        // const existingSecrets = await fetchVaultSecrets(vaultId)
        // setEnvVars(existingSecrets || [{ key: '', value: '' }])

        const vaultData = await getFullVaultData(vaultId)

        if (vaultData?.secrets)
          setMyEnvVars(vaultData.secrets)

        if (vaultData?.views)
          setLogs(vaultData.views)

      } catch (error) {
        console.error('Failed to fetch existing secrets:', error)
      }
    }
    FetchVariables()

  }, [vaultId])

  const handleSmartPaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedText = e.clipboardData.getData('text')

    // Case 1: Multi-line paste (likely full .env file)
    if (pastedText.includes('\n')) {
      e.preventDefault()
      const newPairs: { key: string; value: string }[] = []

      const lines = pastedText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))

      for (const line of lines) {
        const [rawKey, ...rest] = line.split('=')
        if (!rawKey || rest.length === 0) continue
        const key = rawKey.trim()
        const value = rest.join('=').trim().replace(/^"|"$/g, '')

        newPairs.push({ key, value })
      }

      const updated = [...envVars]
      // Insert at the current index, replacing or appending
      updated.splice(index, 1, ...newPairs)
      setEnvVars(updated)
      return
    }

    // Case 2: Single-line `KEY=value`
    if (pastedText.includes('=') && !pastedText.includes('\n')) {
      e.preventDefault()
      const [key, ...rest] = pastedText.split('=')
      const value = rest.join('=')

      const updated = [...envVars]
      updated[index] = { key: key.trim(), value: value.trim() }
      setEnvVars(updated)
    }
  }

  return (
    <div className="flex flex-1 flex-col mt-8 px-5">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 max-w-screen-lg mx-auto w-full">
          <div>
            <h1 className="text-2xl font-semibold">Environment Variables</h1>
            <p className="text-muted-foreground max-w-screen-sm mt-2">
              Configure and manage environment variables for your application.
            </p>
          </div>

          {/* Create variables */}
          <div className="mt-6">
            <h2 className="font-semibold">Add new variables</h2>
            <div className="border border-neutral-200 rounded-md mt-2 bg-white overflow-hidden">
              <p className="text-muted-foreground p-4">
                You can add new environment variables here. Make sure to follow the naming conventions and security best practices.
              </p>

              <div className="p-4 border-t border-neutral-200 pt-4 space-y-2 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-neutral-600">Key Name</label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-neutral-600">Key Value</label>
                  </div>
                </div>
                {envVars.map((env, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={env.key}
                        onChange={e => handleUpdateRow(index, 'key', e.target.value)}
                        className="border border-muted rounded-md p-2 font-mono text-sm"
                        placeholder="e.g., API_KEY"
                        onPaste={e => handleSmartPaste(e, index)}

                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={env.value}
                        onChange={e => handleUpdateRow(index, 'value', e.target.value)}
                        className="border border-muted rounded-md p-2 font-mono text-sm"
                        placeholder="e.g., your_api_key_here"
                        onPaste={e => handleSmartPaste(e, index)}

                      />
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={handleAddRow}>
                  <Plus className="h-4 w-4" />
                  Add Variable
                </Button>
              </div>

              <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-between gap-2">
                <div className="flex flex-row gap-2 items-center">
                  {/* <Button variant="outline" className="mr-2" onClick={() => { }}>
                    <File className="h-4 w-4" />
                    Import .env
                  </Button> */}
                  <p className="text-neutral-600 text-sm font-medium">Paste the .env contents above</p>
                </div>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : <><Save className="h-4 w-4" /> Save</>}
                </Button>
              </div>
            </div>
          </div>

          {/* Display existing variables */}
          <div className="mt-6">
            <div className='flex justify-between items-center'>
              <h2 className="font-semibold">Your environment variables</h2>

              <Button variant="outline" onClick={handleEnvDownload}>
                Download .env file
                <Download />
              </Button>
            </div>
            <div className="border border-neutral-200 rounded-md mt-2 bg-white overflow-hidden">
              <div className="">
                {myEnvVars.length > 0 && myEnvVars.map((env, index) => (
                  <SecretView key={index} env={env} index={index} v_id={vaultId} />
                ))}
                {
                  myEnvVars.length === 0 && (
                    <div className="p-6 text-center text-neutral-600">
                      <p className="text-sm">No environment variables found. Add some to get started!</p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          {/* Share environment */}
          <div className="mt-6">
            <h2 className='font-semibold'>Start sharing your .env with your team</h2>
            <p className="text-sm text-neutral-600">Share this link with your team to allow them to access the environment variables.</p>
            <div className="mt-2 flex justify-between items-center">
                <input
                  type="text"
                value={`${process.env.NEXT_PUBLIC_APP_URL}/v/${vaultId}`}
                  readOnly
                  className="border border-muted rounded-md bg-white p-2 font-mono text-sm w-full"
                />
              <Button variant="outline" className="ml-2" onClick={() => {
                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/v/${vaultId}`);
                toast("Share link copied correctly", {
                  description: "You can paste it in your code editor",
                  duration: 2000,
                  descriptionClassName: 'text-neutral-600',
                });
              }}>
                  <Copy className="h-4 w-4" />
                  Copy .env link
                </Button>
                <InviteButton />
              
            </div>            
            {
              logs.length > 0 ?
                <div className="border border-neutral-200 rounded-md mt-2 bg-white overflow-hidden">
                {
                  logs.map((log, index) => (
                    <div className='p-6 flex flex-col md:flex-row justify-between items-end not-last:border-b border-neutral-200 gap-12' key={index}>
                      <div>
                        <p className='font-semibold text-sm'>{log.ip}</p>
                        <p className='text-xs'>{log.timestamp
                          ? `Viewed on ${(log.timestamp as Timestamp).toDate().toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric'
                                  })}`
                                  : "Date unknown"}</p>
                      </div>
                      <p className='text-gray-600 text-sm'>{log.userAgent}</p>
                    </div>
                  ))
                }
              </div>
              :

              <div className="border border-dashed border-neutral-200 rounded-md mt-2  overflow-hidden min-h-48 flex justify-center items-center">
                <p className='text-sm font-semibold'>No one has yet viewed the .env link</p>
              </div>
            }
          
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
