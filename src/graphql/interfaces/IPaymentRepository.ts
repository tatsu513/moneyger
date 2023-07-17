import { Payment, Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export default interface IPaymentRepository {
  getListPayments(
    userId: String,
    client: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  ): Promise<Payment[] | Error>
}
