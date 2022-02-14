import { LoadStrategy, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { Cat } from './models';

async function main() {
  const orm = await MikroORM.init({
    dbName: ':memory:',
    type: 'sqlite',
    entities: [Cat],
    loadStrategy: LoadStrategy.JOINED,
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.getSchemaGenerator().execute(await orm.getSchemaGenerator().generate());

  const em = orm.em.fork();

  let cat = new Cat();
  em.persist(cat);
  await em.flush();
  em.clear();

  cat = await em.findOneOrFail(Cat, { id: cat.id });
  em.persist(cat);
  await em.flush();
  em.clear();

  cat = await em.findOneOrFail(Cat, { id:cat.id });
  console.log(cat.abc);
}

main();
