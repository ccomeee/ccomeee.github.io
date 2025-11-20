import type { Express, Request, Response, NextFunction, RequestHandler } from "express";
import session from "express-session";
import MemoryStore from "memorystore";

const MemStore = MemoryStore(session);

export function setupAuth(app: Express) {
  const sessionStore = new MemStore({
    checkPeriod: 86400000
  });

  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }));
}

export interface AuthRequest extends Request {
  session: session.Session & {
    userId?: string;
  };
}

export const isAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;
  if (authReq.session && authReq.session.userId) {
    return next();
  }
  res.status(401).json({ message: "未授權" });
};
