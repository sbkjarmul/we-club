import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoteryDto } from './dto';

@Injectable()
export class LoteryService {
  constructor(private prismaService: PrismaService) { }

  async createList() {
    const users = await this.prismaService.user.findMany()

    const lotery = await this.prismaService.lotery.createMany({
      data: usersToLoteryMapper(users)
    })
  }

  async getDrawnUserId(userId: number) {
    const { drawnUserId } = await this.prismaService.lotery.findUnique({
      where: {
        id: userId
      },
      select: {
        drawnUserId: true
      }
    })
    if (drawnUserId) {
      const drawnUserInfo = await this.prismaService.user.findUnique({
        where: {
          id: drawnUserId
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          nickName: true,
        }
      })
      return drawnUserInfo
    }
  }

  async drawn(userId: number) {
    const allMemberIds = await this.prismaService.lotery.findMany({
      where: {
        NOT: [
          {
            userId: userId
          },
        ]
      },
      select: {
        id: true
      }
    })
    const takenMembersId = await this.prismaService.lotery.findMany({
      where: {
        NOT: [
          {
            drawnUserId: undefined
          },
        ]
      },
      select: {
        drawnUserId: true
      }
    })

    const { drawnUserId } = await this.prismaService.lotery.findUnique({
      where: {
        id: userId
      },
      select: {
        drawnUserId: true
      }
    })

    const allIds = allMemberIds.map(id => id.id)
    const takenIds = takenMembersId.map(id => id.drawnUserId)
    const freeIds = allIds.filter(id => !takenIds.includes(id));

    if (!!drawnUserId) {
      return 'You have already drawn'
    }

    const drawnId = draw(freeIds)

    await this.prismaService.lotery.update({
      where: {
        id: userId
      },
      data: {
        drawnUserId: drawnId
      }
    })

    return drawnId
  }
}

function draw(idList: number[]) {
  const listSize = idList.length
  const randomNumber = Math.floor(Math.random() * listSize)
  return idList[randomNumber]
}

function usersToLoteryMapper(users: User[]): LoteryDto[] {
  const usersTmp = [...users]

  const lotery = usersTmp.map(user => {
    return {
      userId: user.id,
    }
  })

  return lotery
}