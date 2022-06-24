import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';
import { EmailService } from '../../src/email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository, Connection, EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.checkUserExists(createUserDto.email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();

    this.saveUserUsingTransaction(createUserDto, signupVerifyToken);
    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    console.log(emailAddress);
    const user = await this.usersRepository.findOneBy({ email: emailAddress });
    console.log(user);
    return user !== null;
  }

  private async saveUserUsingTransaction(
    dto: CreateUserDto,
    signupVerifyToken: string,
  ) {
    await this.connection.transaction(async (manager: EntityManager) => {
      const user = new UserEntity();
      user.name = dto.name;
      user.email = dto.email;
      user.password = dto.password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save(user);
    });
  }

  // private async saveUser(dto: CreateUserDto, signupVerifyToken: string) {
  //   const user = new UserEntity();
  //   user.name = dto.name;
  //   user.email = dto.email;
  //   user.password = dto.password;
  //   user.signupVerifyToken = signupVerifyToken;
  //   console.log(user);
  //   await this.usersRepository.save(user);
  // }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급

    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    throw new Error('Method not implemented');
  }

  findAll() {
    throw new Error('Method not implemented');
  }
}
