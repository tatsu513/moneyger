import { prisma } from '@/util/prisma'
import { Payment, Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

const listPayments = async (
  userId: string,
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
): Promise<Payment[] | Error> => {
  try {
    const result = await prisma.payment.findMany()
    return result
  } catch (error) {
    return new Error('収支内容一覧を取得できませんでした')
  }
}

export default listPayments
