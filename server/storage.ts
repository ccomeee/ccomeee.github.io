import {
  users,
  insights,
  diaryEntries,
  tutorials,
  type User,
  type UpsertUser,
  type RegisterUser,
  type Insight,
  type InsertInsight,
  type DiaryEntry,
  type InsertDiaryEntry,
  type Tutorial,
  type InsertTutorial,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: RegisterUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Insights operations
  getAllInsights(): Promise<Insight[]>;
  getInsight(id: string): Promise<Insight | undefined>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  updateInsight(id: string, insight: Partial<InsertInsight>): Promise<Insight>;
  deleteInsight(id: string): Promise<void>;
  
  // Diary entries operations
  getAllDiaryEntries(): Promise<DiaryEntry[]>;
  getDiaryEntry(id: string): Promise<DiaryEntry | undefined>;
  createDiaryEntry(entry: InsertDiaryEntry): Promise<DiaryEntry>;
  updateDiaryEntry(id: string, entry: Partial<InsertDiaryEntry>): Promise<DiaryEntry>;
  deleteDiaryEntry(id: string): Promise<void>;
  
  // Tutorials operations
  getAllTutorials(): Promise<Tutorial[]>;
  getTutorial(id: string): Promise<Tutorial | undefined>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
  updateTutorial(id: string, tutorial: Partial<InsertTutorial>): Promise<Tutorial>;
  deleteTutorial(id: string): Promise<void>;
}

interface StorageData {
  users: Record<string, User>;
  insights: Record<string, Insight>;
  diaryEntries: Record<string, DiaryEntry>;
  tutorials: Record<string, Tutorial>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private insights: Map<string, Insight> = new Map();
  private diaryEntries: Map<string, DiaryEntry> = new Map();
  private tutorials: Map<string, Tutorial> = new Map();
  private dataFilePath = join(process.cwd(), "data.json");

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      if (existsSync(this.dataFilePath)) {
        const data: StorageData = JSON.parse(readFileSync(this.dataFilePath, "utf-8"));
        
        Object.entries(data.users || {}).forEach(([id, user]) => {
          this.users.set(id, {
            ...user,
            createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
            updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
          });
        });
        
        Object.entries(data.insights || {}).forEach(([id, insight]) => {
          this.insights.set(id, {
            ...insight,
            publishedAt: insight.publishedAt ? new Date(insight.publishedAt) : null,
            updatedAt: insight.updatedAt ? new Date(insight.updatedAt) : null,
          });
        });
        
        Object.entries(data.diaryEntries || {}).forEach(([id, entry]) => {
          this.diaryEntries.set(id, {
            ...entry,
            date: entry.date ? new Date(entry.date) : null,
            updatedAt: entry.updatedAt ? new Date(entry.updatedAt) : null,
          });
        });
        
        Object.entries(data.tutorials || {}).forEach(([id, tutorial]) => {
          this.tutorials.set(id, {
            ...tutorial,
            publishedAt: tutorial.publishedAt ? new Date(tutorial.publishedAt) : null,
            updatedAt: tutorial.updatedAt ? new Date(tutorial.updatedAt) : null,
          });
        });
      }
    } catch (error) {
      console.error("Error loading data from file:", error);
    }
  }

  private saveData() {
    try {
      const data: StorageData = {
        users: Object.fromEntries(this.users),
        insights: Object.fromEntries(this.insights),
        diaryEntries: Object.fromEntries(this.diaryEntries),
        tutorials: Object.fromEntries(this.tutorials),
      };
      writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving data to file:", error);
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(userData: RegisterUser): Promise<User> {
    const id = randomUUID();
    const now = new Date();
    const user: User = {
      id,
      username: userData.username,
      password: userData.password,
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    this.saveData();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existing = await this.getUser(userData.id);
    if (existing) {
      const updated: User = {
        ...existing,
        username: userData.username,
        password: userData.password,
        email: userData.email ?? null,
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        profileImageUrl: userData.profileImageUrl ?? null,
        updatedAt: new Date(),
      };
      this.users.set(userData.id, updated);
      this.saveData();
      return updated;
    }
    const now = new Date();
    const user: User = {
      id: userData.id,
      username: userData.username,
      password: userData.password,
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(userData.id, user);
    this.saveData();
    return user;
  }

  // Insights operations
  async getAllInsights(): Promise<Insight[]> {
    return Array.from(this.insights.values()).sort((a, b) => 
      (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
    );
  }

  async getInsight(id: string): Promise<Insight | undefined> {
    return this.insights.get(id);
  }

  async createInsight(insightData: InsertInsight): Promise<Insight> {
    const id = randomUUID();
    const now = new Date();
    const insight: Insight = {
      id,
      title: insightData.title,
      excerpt: insightData.excerpt,
      content: insightData.content,
      tags: insightData.tags || [],
      publishedAt: now,
      updatedAt: now,
    };
    this.insights.set(id, insight);
    this.saveData();
    return insight;
  }

  async updateInsight(id: string, insightData: Partial<InsertInsight>): Promise<Insight> {
    const existing = this.insights.get(id);
    if (!existing) throw new Error("Insight not found");
    const updated: Insight = {
      ...existing,
      ...insightData,
      updatedAt: new Date(),
    };
    this.insights.set(id, updated);
    this.saveData();
    return updated;
  }

  async deleteInsight(id: string): Promise<void> {
    this.insights.delete(id);
    this.saveData();
  }

  // Diary entries operations
  async getAllDiaryEntries(): Promise<DiaryEntry[]> {
    return Array.from(this.diaryEntries.values()).sort((a, b) => 
      (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
    );
  }

  async getDiaryEntry(id: string): Promise<DiaryEntry | undefined> {
    return this.diaryEntries.get(id);
  }

  async createDiaryEntry(entryData: InsertDiaryEntry): Promise<DiaryEntry> {
    const id = randomUUID();
    const now = new Date();
    const entry: DiaryEntry = {
      id,
      title: entryData.title,
      content: entryData.content,
      tags: entryData.tags || [],
      date: now,
      updatedAt: now,
    };
    this.diaryEntries.set(id, entry);
    this.saveData();
    return entry;
  }

  async updateDiaryEntry(id: string, entryData: Partial<InsertDiaryEntry>): Promise<DiaryEntry> {
    const existing = this.diaryEntries.get(id);
    if (!existing) throw new Error("Diary entry not found");
    const updated: DiaryEntry = {
      ...existing,
      ...entryData,
      updatedAt: new Date(),
    };
    this.diaryEntries.set(id, updated);
    this.saveData();
    return updated;
  }

  async deleteDiaryEntry(id: string): Promise<void> {
    this.diaryEntries.delete(id);
    this.saveData();
  }

  // Tutorials operations
  async getAllTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).sort((a, b) => 
      (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0)
    );
  }

  async getTutorial(id: string): Promise<Tutorial | undefined> {
    return this.tutorials.get(id);
  }

  async createTutorial(tutorialData: InsertTutorial): Promise<Tutorial> {
    const id = randomUUID();
    const now = new Date();
    const tutorial: Tutorial = {
      id,
      ...tutorialData,
      publishedAt: now,
      updatedAt: now,
    };
    this.tutorials.set(id, tutorial);
    this.saveData();
    return tutorial;
  }

  async updateTutorial(id: string, tutorialData: Partial<InsertTutorial>): Promise<Tutorial> {
    const existing = this.tutorials.get(id);
    if (!existing) throw new Error("Tutorial not found");
    const updated: Tutorial = {
      ...existing,
      ...tutorialData,
      updatedAt: new Date(),
    };
    this.tutorials.set(id, updated);
    this.saveData();
    return updated;
  }

  async deleteTutorial(id: string): Promise<void> {
    this.tutorials.delete(id);
    this.saveData();
  }
}

export const storage = new MemStorage();
