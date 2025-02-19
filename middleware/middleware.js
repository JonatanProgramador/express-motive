import { permissionMiddle } from "./permissionMiddle.js";
import { protecredMiddle } from "./protectedMiddle.js";

export function middleware(app) {
    protecredMiddle(app)
    permissionMiddle(app)
}