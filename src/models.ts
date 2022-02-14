import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Cat {
    @PrimaryKey()
    id!: number;

    @Property({ persist: true })
    get abc() {
        return 'ABC';
    }
}
