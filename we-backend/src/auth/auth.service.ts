import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

const WE_MEMBERS = [
  {
    email: 'sbkjarmul@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Sebastian',
    lastName: 'Jarmul',
    nickName: 'Sbk',
  },
  {
    email: 'mateusznaprawa@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Mateusz',
    lastName: 'Naprawa',
    nickName: 'ZielonyKapelusz',
  },
  {
    email: 'jakub.ozga99@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Jakub',
    lastName: 'Ozga',
    nickName: 'Ozia',
  },
  {
    email: 'radek.chciuk@o2.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Radek',
    lastName: 'Chciuk',
    nickName: 'Gruby',
  },
  {
    email: 'dreamek15@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Kamil',
    lastName: 'Dabal',
    nickName: 'Zombi',
  },
  {
    email: 'sakosek123@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Kamil',
    lastName: 'Swieca',
    nickName: 'Cichy',
  },
  {
    email: 'krystianjarmul.kj@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Krystian',
    lastName: 'Jarmul',
    nickName: 'Yungkubek',
  },
  {
    email: 'kacpersuchhora@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Kacper',
    lastName: 'Suchora',
    nickName: 'Pysiek',
  },
  {
    email: 'rafalek1996-96@o2.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Rafal',
    lastName: 'Kolasa',
    nickName: 'Rafcio byk',
  },
  {
    email: 'Piter1380@wp.pl',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Piotr',
    lastName: 'Dabek',
    nickName: 'Piter',
  },
  {
    email: 'Msmolen98@gmail.com',
    hash: '$argon2id$v=19$m=65536,t=3,p=4$IwXlKXXsmlfRJNCGjlStJA$lVGdhImKh6r8BkjhxF5WEipGRUCmQmvw6t0lQAPn6ac',
    firstName: 'Marcin',
    lastName: 'Smolen',
    nickName: 'Brudi',
  },
]

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService, private configService: ConfigService) { }
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          nickName: dto.nickName,
        },
      })

      return this.signToken(user.id, user.email)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }

      throw error
    }
  }

  async signupAll() {
    try {
      await this.prismaService.user.createMany({
        data: WE_MEMBERS
      })

      return 'all users added'
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }

      throw error
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      }
    })

    if (!user) throw new ForbiddenException('Credentials incorrect')

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect')

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.configService.get('JWT_SECRET')

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret
    })
    return {
      access_token: token
    }
  }
}
