import { PrismaClient } from "@prisma/client";
import strategies from "@birch/shared/strategies";

const prisma = new PrismaClient();

async function main() {
  const organisation = await prisma.organisation.upsert({
    where: { id: "demo-org" },
    update: {},
    create: {
      id: "demo-org",
      name: "Demo Org",
      adAccounts: {
        create: {
          id: "act_demo",
          name: "Demo Ad Account",
          currency: "USD"
        }
      }
    }
  });

  const adAccount = await prisma.adAccount.findFirstOrThrow({ where: { organisationId: organisation.id } });

  for (const strategy of strategies) {
    const ruleId = `rule_${strategy.name.replace(/\s+/g, "_").toLowerCase()}`;

    await prisma.rule.upsert({
      where: { id: ruleId },
      update: {},
      create: {
        id: ruleId,
        name: strategy.name,
        adAccountId: adAccount.id,
        dsl: strategy.rule,
        scheduleCron: strategy.rule.schedule.cron,
        versions: {
          create: {
            dsl: strategy.rule
          }
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
