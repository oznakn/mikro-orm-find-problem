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
  cat.name = 'TestName';
  em.persist(cat);
  await em.flush();
  em.clear();

  cat = await em.findOneOrFail(Cat, { id: cat.id });
  cat.name = 'TestName2';
  em.persist(cat);
  await em.flush();

  cat = await em.findOneOrFail(Cat, { id: cat.id });
  console.log(cat.name, cat.lowerName, cat.name.toLowerCase() === cat.lowerName);
}

main();
