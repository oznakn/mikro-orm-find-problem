import { MikroORM } from '@mikro-orm/core';

import { Cat, User } from './models';

async function main() {
  const orm = await MikroORM.init({
    dbName: ':memory:',
    type: 'sqlite',
    entities: [Cat, User],
    debug: true,
  });
  await orm.getSchemaGenerator().execute(await orm.getSchemaGenerator().generate());

  const em = orm.em.fork();

  const user = em.create(
    User,
    {
      id: 'TestUser'
    },
    {persist: true},
  );

  em.create(
    Cat,
    {
      name: 'TestCat',
      user,
    },
    {persist: true},
  );
  await em.flush();
  em.clear();

  const u = await em.findOneOrFail(User, { id: 'TestUser' });
  em.remove(u);
  await em.flush();

  console.log('success');
}

main();
