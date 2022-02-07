import { LoadStrategy, MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { Cat, Profile, User } from './models';

async function main() {
  const orm = await MikroORM.init({
    dbName: ':memory:',
    type: 'sqlite',
    entities: [User, Profile, Cat],
    loadStrategy: LoadStrategy.JOINED,
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.getSchemaGenerator().execute(await orm.getSchemaGenerator().generate());

  const em = orm.em.fork();

  em.create(
    User,
    {
      id: 'TestPrimary',
      name: 'TestName',
    },
    { persist: true },
  );
  await em.flush();
  em.clear();

  console.log(await em.find(User, {}));
}

main();
