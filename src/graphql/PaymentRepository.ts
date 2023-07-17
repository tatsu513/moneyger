import { Payment, Prisma, PrismaClient } from '@prisma/client'
import IPaymentRepository from 'src/graphql/interfaces/IPaymentRepository'
import listPayments from 'src/graphql/dao/prisma/listPayments'
import { DefaultArgs } from '@prisma/client/runtime/library'

/**
 * SiteMessageService用のRepository
 */
class PaymentRepository implements IPaymentRepository {
  private readonly prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  constructor(prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this.prismaClient = prismaClient
  }

  getListPayments(userId: string): Promise<Payment[] | Error> {
    return listPayments(userId, this.prismaClient)
  }
}

export default PaymentRepository
