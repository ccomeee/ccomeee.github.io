import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, type AuthRequest } from "./auth";
import { 
  insertInsightSchema, 
  insertDiaryEntrySchema, 
  insertTutorialSchema,
  registerUserSchema,
  loginUserSchema 
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Setup authentication
  setupAuth(app);

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const data = registerUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "用戶名已存在" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({ ...data, password: hashedPassword });
      
      const authReq = req as AuthRequest;
      authReq.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("Error registering user:", error);
      res.status(400).json({ message: error.message || "註冊失敗" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const data = loginUserSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(data.username);
      if (!user) {
        return res.status(401).json({ message: "用戶名或密碼錯誤" });
      }

      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "用戶名或密碼錯誤" });
      }

      const authReq = req as AuthRequest;
      authReq.session.userId = user.id;
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      console.error("Error logging in:", error);
      res.status(400).json({ message: error.message || "登入失敗" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    const authReq = req as AuthRequest;
    authReq.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "登出失敗" });
      }
      res.json({ message: "登出成功" });
    });
  });

  app.get('/api/auth/user', isAuthenticated, async (req, res) => {
    try {
      const authReq = req as AuthRequest;
      const user = await storage.getUser(authReq.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "用戶不存在" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "獲取用戶信息失敗" });
    }
  });

  // Insights routes
  app.get('/api/insights', async (req, res) => {
    try {
      const insights = await storage.getAllInsights();
      res.json(insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.get('/api/insights/:id', async (req, res) => {
    try {
      const insight = await storage.getInsight(req.params.id);
      if (!insight) {
        return res.status(404).json({ message: "Insight not found" });
      }
      res.json(insight);
    } catch (error) {
      console.error("Error fetching insight:", error);
      res.status(500).json({ message: "Failed to fetch insight" });
    }
  });

  app.post('/api/insights', isAuthenticated, async (req, res) => {
    try {
      const data = insertInsightSchema.parse(req.body);
      const insight = await storage.createInsight(data);
      res.status(201).json(insight);
    } catch (error: any) {
      console.error("Error creating insight:", error);
      res.status(400).json({ message: error.message || "Failed to create insight" });
    }
  });

  app.patch('/api/insights/:id', isAuthenticated, async (req, res) => {
    try {
      const insight = await storage.updateInsight(req.params.id, req.body);
      res.json(insight);
    } catch (error: any) {
      console.error("Error updating insight:", error);
      res.status(400).json({ message: error.message || "Failed to update insight" });
    }
  });

  app.delete('/api/insights/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteInsight(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting insight:", error);
      res.status(500).json({ message: "Failed to delete insight" });
    }
  });

  // Diary entries routes
  app.get('/api/diary', async (req, res) => {
    try {
      const entries = await storage.getAllDiaryEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      res.status(500).json({ message: "Failed to fetch diary entries" });
    }
  });

  app.get('/api/diary/:id', async (req, res) => {
    try {
      const entry = await storage.getDiaryEntry(req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "Diary entry not found" });
      }
      res.json(entry);
    } catch (error) {
      console.error("Error fetching diary entry:", error);
      res.status(500).json({ message: "Failed to fetch diary entry" });
    }
  });

  app.post('/api/diary', isAuthenticated, async (req, res) => {
    try {
      const data = insertDiaryEntrySchema.parse(req.body);
      const entry = await storage.createDiaryEntry(data);
      res.status(201).json(entry);
    } catch (error: any) {
      console.error("Error creating diary entry:", error);
      res.status(400).json({ message: error.message || "Failed to create diary entry" });
    }
  });

  app.patch('/api/diary/:id', isAuthenticated, async (req, res) => {
    try {
      const entry = await storage.updateDiaryEntry(req.params.id, req.body);
      res.json(entry);
    } catch (error: any) {
      console.error("Error updating diary entry:", error);
      res.status(400).json({ message: error.message || "Failed to update diary entry" });
    }
  });

  app.delete('/api/diary/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteDiaryEntry(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting diary entry:", error);
      res.status(500).json({ message: "Failed to delete diary entry" });
    }
  });

  // Tutorials routes
  app.get('/api/tutorials', async (req, res) => {
    try {
      const tutorials = await storage.getAllTutorials();
      res.json(tutorials);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      res.status(500).json({ message: "Failed to fetch tutorials" });
    }
  });

  app.get('/api/tutorials/:id', async (req, res) => {
    try {
      const tutorial = await storage.getTutorial(req.params.id);
      if (!tutorial) {
        return res.status(404).json({ message: "Tutorial not found" });
      }
      res.json(tutorial);
    } catch (error) {
      console.error("Error fetching tutorial:", error);
      res.status(500).json({ message: "Failed to fetch tutorial" });
    }
  });

  app.post('/api/tutorials', isAuthenticated, async (req, res) => {
    try {
      const data = insertTutorialSchema.parse(req.body);
      const tutorial = await storage.createTutorial(data);
      res.status(201).json(tutorial);
    } catch (error: any) {
      console.error("Error creating tutorial:", error);
      res.status(400).json({ message: error.message || "Failed to create tutorial" });
    }
  });

  app.patch('/api/tutorials/:id', isAuthenticated, async (req, res) => {
    try {
      const tutorial = await storage.updateTutorial(req.params.id, req.body);
      res.json(tutorial);
    } catch (error: any) {
      console.error("Error updating tutorial:", error);
      res.status(400).json({ message: error.message || "Failed to update tutorial" });
    }
  });

  app.delete('/api/tutorials/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteTutorial(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      res.status(500).json({ message: "Failed to delete tutorial" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
