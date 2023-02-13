---
title: How to Upgrade Your Next.js Blog's Database to PlanetScale
date: 2023-02-12
summary: Upgrading to PlanetScale can improve the performance, scalability, and reliability of a Next.js blog's database. PlanetScale is a globally distributed database as a service built on Vitess, offering benefits such as high availability and cost savings. The integration process involves connecting the Next.js blog to PlanetScale, and configuring it to use PlanetScale as its backend. Technical expertise may be required, and working with a PlanetScale consultant is recommended.
---

How to Upgrade Your Next.js Blog's Database to PlanetScale

If you're running a Next.js blog, you may have noticed that as your traffic and user base grows, your database performance can start to lag. This can lead to slow page load times and a frustrating user experience. To avoid these issues, it's important to upgrade your database platform to a more scalable solution. One great option to consider is PlanetScale.

What is PlanetScale? PlanetScale is a fully-managed, globally distributed database as a service (DBaaS) that's designed to handle the scale and complexity of modern applications. It's built on top of the popular open source database, Vitess, and provides a simple, scalable solution for running your database in a multi-cloud environment.

Benefits of PlanetScale for Next.js Blogs

- Scalability: PlanetScale can handle large amounts of traffic and data, so you won't have to worry about your database becoming a bottleneck as your blog grows.
- Global distribution: PlanetScale supports multi-cloud and hybrid cloud deployments, so you can easily serve users from around the world without sacrificing performance.
- High availability: PlanetScale ensures high availability by automatically replicating your data across multiple regions, so you can continue serving users even in the event of a regional outage.
- Cost savings: By using PlanetScale, you can reduce the cost of running your database by eliminating the need for expensive infrastructure and maintenance.

How to Apply PlanetScale to Your Next.js Blog Applying PlanetScale to your Next.js blog is a straightforward process that can be completed in just a few steps:

1. Sign up for PlanetScale and create a database cluster.
2. Connect your Next.js blog to the PlanetScale database.
3. Configure your Next.js application to use PlanetScale as its database backend.

It's important to note that while PlanetScale is easy to use, you may need some technical expertise to fully integrate it with your Next.js blog. If you're not familiar with databases, it's best to work with a PlanetScale partner or consultant who can guide you through the process.

Conclusion Upgrading your Next.js blog's database to PlanetScale is a great way to ensure that your blog can handle the growing demands of your traffic and user base. With its scalability, global distribution, high availability, and cost savings, PlanetScale is a powerful solution for Next.js blogs that are looking to take their performance to the next level.

---

## 시작해보자. 

가장 먼저 planet scale 에 github 계정으로 간편하게 가입하고 

Database를 생성했다. Database 는 AWS tokyo 서버에 생성되었다. 

공식 문서 가이드와 leerob 형님의 코드를 참고하면 진행해보자

```bash
yarn add @planetscale/database
```

leerob 의 코드를 보면 planetscale 관련 interface 와 queryBuilder 함수를 정의해서 사용한다.

```ts title="lib/planetscale.ts" showLineNumbers 
// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface GuestbookTable {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
  guestbook: GuestbookTable;
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

```

처음보는 kysely 라는 package가 등장한다. 

kysely 는 Typesafty 하게 SQL 을 사용할 수 있게 하는 것을 목적으로 개발된 도구인거 같다. 나중에 추가 학습해보자.

leerob 은 kysely-planetscale 패키지를 사용해서 typesafe한 쿼리빌드를 사용하고자 한거 같다. 좋은거 배웠다. 

