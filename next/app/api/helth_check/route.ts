import { NextResponse } from 'next/server'
// ヘルスチェック用
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
