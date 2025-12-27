import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, userAc as defaultUserAc, adminAc as defaultAdminAc } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements,
    // Add your own permissions here
    // Example: project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
    ...defaultUserAc.statements
})

export const admin = ac.newRole({
    ...defaultAdminAc.statements
})

// Type-safe role names
export type RoleName = "user" | "admin";

// Type-safe permission format: "resource:action"
type Statement = typeof statement;
type Resource = keyof Statement;
type PermissionUnion = {
    [K in Resource]: `${K & string}:${Statement[K][number] & string}`
}[Resource];
export type Permission = PermissionUnion;