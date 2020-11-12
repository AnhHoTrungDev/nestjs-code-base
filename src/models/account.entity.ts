import { Entity, ObjectIdColumn, Column } from 'typeorm';
import * as uuid from 'uuid';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Entity({
  name: 'account',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class AccountEntity {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  userId: string;

  @Expose()
  @Column()
  userName: string;

  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column()
  createdAt: number;

  @Expose()
  @Column()
  updatedAt: number;

  constructor(account: Partial<AccountEntity>) {
    if (account) {
      Object.assign(
        this,
        plainToClass(AccountEntity, account, {
          excludeExtraneousValues: true,
        }),
      );
      this._id = this._id || uuid.v1();
      this.createdAt = +new Date();
      this.updatedAt = +new Date();
    }
  }
}
