import { Collection, Embeddable, Embedded, Entity, IdentifiedReference, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Cat {
    @PrimaryKey()
    name!: string;

    @ManyToOne()
    user!: IdentifiedReference<User>;
}

@Embeddable()
export class Profile {
    @Property()
    phoneNumber?: string;
}

@Entity()
export class User {
    @PrimaryKey()
    id!: string;

    @Property()
    name!: string;

    @Embedded({ hidden: true })
    profile?: Profile;

    @OneToMany(() => Cat, c => c.user, { eager: true })
    cats = new Collection<Cat>(this);
}
