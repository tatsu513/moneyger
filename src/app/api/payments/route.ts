import { prisma } from '@/util/prisma'
import { NextApiResponse, NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const results = await prisma.payment.findMany()
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}

export async function POST(request: Request) {
  const { title, limitPrice } = await request.json()
  try {
    const result = await prisma.payment.create({
      data: { title, limitPrice },
    })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500, error })
  }
}
