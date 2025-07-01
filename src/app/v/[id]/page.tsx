'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download,} from 'lucide-react'
import { getVaultSecretsPublic } from '@/lib/firebase' 
import { Secret } from '@/types/types'
import SecretView from '@/components/app/SecretView'
import { FaFingerprint } from 'react-icons/fa'
import { siteDetails } from '../../../data/siteDetails'
import Link from 'next/link'
import { downloadEnvFile } from '../../../lib/EnvDownloader'
import Footer from '../../../components/app/footer'

type EnvVar = { key: string; value: string }

export default function Page() {

  const publicView = true

  const params = useParams()
  const vaultId = params?.id as string

  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { key: '', value: '' },
  ])
  const [myEnvVars, setMyEnvVars] = useState<Secret[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const FetchVariables = async () => {
      try {
        // Fetch existing secrets from the vault
        // const existingSecrets = await fetchVaultSecrets(vaultId)
        // setEnvVars(existingSecrets || [{ key: '', value: '' }])
        const variables = await getVaultSecretsPublic(vaultId)

        setMyEnvVars(variables)

        const response = await fetch(`/api/log-view?vaultId=${vaultId}`);
        console.log(response)

      } catch (error) {
        console.error('Failed to fetch existing secrets:', error)
      }
    }
    FetchVariables()

  }, [vaultId])


  const handleEnvDownload = () => {
    downloadEnvFile(myEnvVars)
  }

  return (
    <>
      <div className='w-full'>
        <div className='@container/main flex flex-1 flex-row gap-2 max-w-screen-lg mx-auto w-full py-6 justify-between items-center'>
          <div className='flex justify-start items-center gap-2'>
            <FaFingerprint className="text-primary-accent min-w-fit w-7 h-7" />

            {/* <BiKey className="text-foreground min-w-fit w-7 h-7" /> */}
            <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </div>
          <Button>
            <Link href="/" target='_blank'>Start sharing your .env securely</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col mt-4 px-5">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 max-w-screen-lg mx-auto w-full">
            <div className='flex justify-between items-end gap-2'>
              <div>
                <h1 className="text-2xl font-semibold">Environment Variables</h1>
                <p className="text-muted-foreground max-w-screen-sm mt-2">
                  View environment variables and download them for your project
                </p>
              </div>
              <Button variant="outline" onClick={handleEnvDownload}>
                Download .env file
                <Download />
              </Button>
            </div>

            {/* Display existing variables */}
            <div className="mt-2">
              <div className="border border-neutral-200 rounded-md mt-2 bg-white overflow-hidden">
                <div className="">
                  {myEnvVars.length > 0 && myEnvVars.map((env, index) => (
                    <SecretView key={index} env={env} index={index} v_id={vaultId} publicView={publicView} />
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
          </div>
        </div>
      </div>

      <Footer />

    </>
  )
}
