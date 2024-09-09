import { Request } from "express";
import { User } from "./user";

declare module "express" {
  export interface Request {
    //TODO: replace any with type later
    user?: Record<string, any>;
  }
}
