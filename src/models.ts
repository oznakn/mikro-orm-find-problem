import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Cat {
    @PrimaryKey({ type: Number })
    id!: number;

    @Property({ type: String })
    name!: string;

    @Property({ type: String, persist: true })
    get lowerName() {
        return this.name.toLowerCase();
    }
}
