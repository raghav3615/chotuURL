import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: Promise<{
    shortCode: string
  }>
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params

  // Get the URL from the database
  const { data, error } = await supabase
    .from('urls')
    .select('original_url, click_count')
    .eq('short_code', shortCode)
    .single()

  if (error || !data) {
    redirect('/')
  }  // Increment click count (fire and forget)
  supabase
    .from('urls')
    .update({ click_count: data.click_count + 1 })
    .eq('short_code', shortCode)

  // Redirect to the original URL
  redirect(data.original_url)
}
