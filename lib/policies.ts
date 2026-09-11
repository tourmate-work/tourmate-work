import { prisma } from "@/lib/prisma";
import { PolicyDocument, PolicySection, PolicyType, PoliciesMap } from "@/types";
import fs from "fs/promises";
import path from "path";

export * from "./policies-defaults";
import { DEFAULT_POLICIES } from "./policies-defaults";

const BACKUP_FILE_PATH = path.join(process.cwd(), "data", "policies.json");

// Helper to write backup JSON
async function writeBackupFile(data: PoliciesMap) {
  try {
    const dir = path.dirname(BACKUP_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(BACKUP_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write backup policies.json:", err);
  }
}

// Helper to read backup JSON
async function readBackupFile(): Promise<PoliciesMap | null> {
  try {
    const content = await fs.readFile(BACKUP_FILE_PATH, "utf-8");
    return JSON.parse(content) as PoliciesMap;
  } catch {
    return null;
  }
}

/**
 * Get all policies (from DB, falling back to backup file or defaults)
 */
export async function getAllPolicies(): Promise<PoliciesMap> {
  try {
    // Attempt DB fetch
    const records = await prisma.policy.findMany();

    if (records.length > 0) {
      const result: PoliciesMap = { ...DEFAULT_POLICIES };
      for (const rec of records) {
        if (rec.id === "terms" || rec.id === "privacy" || rec.id === "cancellation") {
          let parsedSections: PolicySection[] = [];
          try {
            parsedSections = JSON.parse(rec.sections);
          } catch {
            parsedSections = DEFAULT_POLICIES[rec.id].sections;
          }

          result[rec.id] = {
            id: rec.id,
            title: rec.title,
            subtitle: rec.subtitle || undefined,
            lastUpdated: rec.lastUpdated || undefined,
            intro: rec.intro || undefined,
            sections: parsedSections,
            updatedAt: rec.updatedAt.toISOString(),
          };
        }
      }
      return result;
    }

    // If table is empty, seed defaults into DB asynchronously
    try {
      await seedDefaultPolicies();
    } catch (e) {
      console.warn("Could not seed default policies to DB:", e);
    }
  } catch (dbErr) {
    console.warn("Prisma error fetching policies, attempting file backup:", dbErr);
  }

  // Fallback to local backup file
  const backup = await readBackupFile();
  if (backup) {
    return { ...DEFAULT_POLICIES, ...backup };
  }

  return DEFAULT_POLICIES;
}

/**
 * Get a specific policy by type
 */
export async function getPolicy(id: PolicyType): Promise<PolicyDocument> {
  const policies = await getAllPolicies();
  return policies[id] || DEFAULT_POLICIES[id];
}

/**
 * Save or update a policy document
 */
export async function savePolicy(policy: PolicyDocument): Promise<PolicyDocument> {
  const validId = policy.id as PolicyType;
  const sectionsJson = JSON.stringify(policy.sections || []);

  let savedRecord: PolicyDocument = {
    ...policy,
    updatedAt: new Date().toISOString(),
  };

  try {
    const record = await prisma.policy.upsert({
      where: { id: validId },
      create: {
        id: validId,
        title: policy.title,
        subtitle: policy.subtitle || null,
        lastUpdated: policy.lastUpdated || null,
        intro: policy.intro || null,
        sections: sectionsJson,
      },
      update: {
        title: policy.title,
        subtitle: policy.subtitle || null,
        lastUpdated: policy.lastUpdated || null,
        intro: policy.intro || null,
        sections: sectionsJson,
      },
    });

    let parsedSections: PolicySection[] = [];
    try {
      parsedSections = JSON.parse(record.sections);
    } catch {
      parsedSections = policy.sections;
    }

    savedRecord = {
      id: record.id as PolicyType,
      title: record.title,
      subtitle: record.subtitle || undefined,
      lastUpdated: record.lastUpdated || undefined,
      intro: record.intro || undefined,
      sections: parsedSections,
      updatedAt: record.updatedAt.toISOString(),
    };
  } catch (dbErr) {
    console.error("Failed to save policy in database, saving to backup file:", dbErr);
  }

  // Also update backup file
  try {
    const all = await getAllPolicies();
    all[validId] = savedRecord;
    await writeBackupFile(all);
  } catch (e) {
    console.error("Failed to update backup file:", e);
  }

  return savedRecord;
}

/**
 * Reset a policy to factory defaults
 */
export async function resetPolicy(id: PolicyType): Promise<PolicyDocument> {
  const defaultDoc = DEFAULT_POLICIES[id];
  return await savePolicy(defaultDoc);
}

/**
 * Reset all policies to factory defaults
 */
export async function resetAllPolicies(): Promise<PoliciesMap> {
  const result: PoliciesMap = { ...DEFAULT_POLICIES };
  for (const key of ["terms", "privacy", "cancellation"] as PolicyType[]) {
    result[key] = await resetPolicy(key);
  }
  return result;
}

/**
 * Seed all default policies into DB
 */
export async function seedDefaultPolicies(): Promise<void> {
  for (const key of ["terms", "privacy", "cancellation"] as PolicyType[]) {
    const doc = DEFAULT_POLICIES[key];
    await prisma.policy.upsert({
      where: { id: key },
      create: {
        id: key,
        title: doc.title,
        subtitle: doc.subtitle || null,
        lastUpdated: doc.lastUpdated || null,
        intro: doc.intro || null,
        sections: JSON.stringify(doc.sections),
      },
      update: {},
    });
  }
}
