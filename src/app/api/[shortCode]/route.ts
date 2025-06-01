import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params

  // Get the URL from the database
  const { data, error } = await supabase
    .from('urls')
    .select('original_url, click_count')
    .eq('short_code', shortCode)
    .single()

  if (error || !data) {
    return NextResponse.redirect(new URL('/', request.url))
  }  // Increment click count (fire and forget)
  supabase
    .from('urls')
    .update({ click_count: data.click_count + 1 })
    .eq('short_code', shortCode)

  // Redirect to the original URL
  return NextResponse.redirect(data.original_url)
}
