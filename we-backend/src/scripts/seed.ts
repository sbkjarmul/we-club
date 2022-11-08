import { PrismaClient, User } from '@prisma/client'
import { LoteryDto } from 'src/lotery/dto'

const WE_MEMBERS = [
  {
    email: 'sbkjarmul@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$9TJ8/4xnSeeAAKvO6nPEaA$5kV0ak1iNqShLdmNJ8oT2pgQ8rq8e753i49EI3wTwc8',
    firstName: 'Sebastian',
    lastName: 'Jarmul',
    nickName: 'Sbk',
  },
  {
    email: 'mateusznaprawa@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$RJRZt7qO4/iB8jjvBqSihQ$DqdM7PGhZgbEMezjDZj77ThXtFcVsS2NwSsCACBvBIg',
    firstName: 'Mateusz',
    lastName: 'Naprawa',
    nickName: 'ZielonyKapelusz',
  },
  {
    email: 'jakub.ozga99@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$xWSpaFhDSpWeslDB5CEZdA$Q0I9lGQRZsvSIbkXFugkkzufV2cqzPlFNIppztGniao',
    firstName: 'Jakub',
    lastName: 'Ozga',
    nickName: 'Ozia',
  },
  {
    email: 'radek.chciuk@o2.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$Le5RvqARLTnB1PMeuA7HcQ$HIv0AqgZ/A89ISucMX9wq1j+Jw2VAtHg0z//DSXRV8I',
    firstName: 'Radek',
    lastName: 'Chciuk',
    nickName: 'Gruby',
  },
  {
    email: 'dreamek15@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$WBhpafoqfgqQwZm0oFP7cQ$n0VRTJ5AleN6Y8jcJqqowhhNm044l3+4l2+RBrTLU9o',
    firstName: 'Kamil',
    lastName: 'Dabal',
    nickName: 'Zombi',
  },
  {
    email: 'sakosek123@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$3+044RwhN2FVTeB77mQW2A$6DWgiKtuCxT/b/VzJxqJUJLOTYt14M2V1PoQAMdG56E',
    firstName: 'Kamil',
    lastName: 'Swieca',
    nickName: 'Cichy',
  },
  {
    email: 'krystianjarmul.kj@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$EhjguYfMHcSL4FHPsPw4fA$sr93qtBw1tQHMWH1uO+OVtOogKi4IXFYWWlRKXUSo+8',
    firstName: 'Krystian',
    lastName: 'Jarmul',
    nickName: 'Yungkubek',
  },
  {
    email: 'kacpersuchhora@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$Ef0/SPuF3hl+zQawGWj8yQ$pJIp9ZMCgq489fbkfqLO1uSUV6IcXgaiLbQ2Vp9EBbQ',
    firstName: 'Kacper',
    lastName: 'Suchora',
    nickName: 'Pysiek',
  },
  {
    email: 'rafalek1996-96@o2.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$EtQOgKZrczF2gZxZ2Ax2/A$dx8f461Sc09cY00fHNkg3W4ch9Wh0gGNuprGxBiIZmw',
    firstName: 'Rafal',
    lastName: 'Kolasa',
    nickName: 'Rafcio byk',
  },
  {
    email: 'Piter1380@wp.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$qMeAvwfUzepb1bkLScejYg$unq5nCKLhXnn6fwIAhqU95VkrLoFgQxhAWsKH54X6bg',
    firstName: 'Piotr',
    lastName: 'Dabek',
    nickName: 'Rep tera',
  },
  {
    email: 'Msmolen98@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$tklq4HUScRbjBGrv/DBnuQ$txPz+eyUjvI2rzo0bgprGkxmvfWipi2Gjp+vOz3Dp1g',
    firstName: 'Marcin',
    lastName: 'Smolen',
    nickName: 'Makflar',
  },
]

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: WE_MEMBERS
  })
  const users = await prisma.user.findMany()

  await prisma.lotery.createMany({
    data: usersToLoteryMapper(users)
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

function usersToLoteryMapper(users: User[]): LoteryDto[] {
  const usersTmp = [...users]

  const lotery = usersTmp.map(user => {
    return {
      userId: user.id,
    }
  })

  return lotery
}