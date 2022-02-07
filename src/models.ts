import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, PrimaryKey, PrimaryKeyType } from "@mikro-orm/core";

@Entity()
export class Cat {
  [PrimaryKeyType]: [string, string];

  @PrimaryKey()
  name!: string;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @ManyToOne(() => User, { primary: true, onDelete: 'CASCADE', wrappedReference: true })
  user!: IdentifiedReference<User>;
}

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @OneToMany(() => Cat, c => c.user, { eager: true, orphanRemoval: true })
  cats = new Collection<Cat>(this);
}
