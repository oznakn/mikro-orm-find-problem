import { LoadStrategy, MikroORM } from '@mikro-orm/core';
import { Cat } from './models';

async function main() {
  const orm = await MikroORM.init({
    dbName: ':memory:',
    type: 'sqlite',
    entities: [Cat],
    loadStrategy: LoadStrategy.JOINED,
  });
  await orm.getSchemaGenerator().execute(await orm.getSchemaGenerator().generate());

  const em = orm.em.fork();

  let cat = new Cat();
  em.persist(cat);
  await em.flush();
  em.clear();

  cat = await em.findOneOrFail(Cat, { id:cat.id });
  console.log(cat, cat.abc);
}

main();
