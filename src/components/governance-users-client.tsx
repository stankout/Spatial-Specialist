"use client";

import { useState } from "react";
import type { Role } from "@/lib/governance/permissions";

type RoleView = { role: Role; label: string; description: string; capabilities: string[] };

export function GovernanceUsersClient({ roles, capabilityGroups }: { roles: RoleView[]; capabilityGroups: Array<{ label: string; capabilities: string[] }> }) {
  const [tab, setTab] = useState<"users" | "roles" | "permissions">("users");
  const [simulatedRole, setSimulatedRole] = useState<Role>("OWNER");
  const selected = roles.find((role) => role.role === simulatedRole)!;
  return <div className="governance-workspace">
    <nav className="governance-tabs" aria-label="User governance views">{(["users", "roles", "permissions"] as const).map((item) => <button key={item} aria-pressed={tab === item} onClick={() => setTab(item)}>{item}</button>)}</nav>
    {tab === "users" && <section className="governance-panel">
      <header><div><p className="eyebrow">Development-only simulator</p><h2>Local owner session</h2></div><span>Not production authentication</span></header>
      <p>Use this selector to understand interface visibility by role. It never changes the actor used by server authorization and is not accepted by any API.</p>
      <label>Preview role<select value={simulatedRole} onChange={(event) => setSimulatedRole(event.target.value as Role)}>{roles.map((role) => <option key={role.role} value={role.role}>{role.label}</option>)}</select></label>
      <article className="role-simulation"><strong>{selected.label}</strong><p>{selected.description}</p><small>{selected.capabilities.length} capabilities in the centralized policy</small></article>
      <div className="governance-empty"><h3>No production users repository</h3><p>User invitations, password reset, MFA, and session management stay unavailable until a real production authentication adapter is installed.</p></div>
    </section>}
    {tab === "roles" && <section className="role-definition-grid">{roles.map((role) => <article key={role.role}><small>{role.role}</small><h2>{role.label}</h2><p>{role.description}</p><strong>{role.capabilities.length} capabilities</strong></article>)}</section>}
    {tab === "permissions" && <section className="permission-matrix" aria-label="Role capability matrix"><div className="permission-row permission-head"><strong>Capability</strong>{roles.map((role) => <strong key={role.role}>{role.label}</strong>)}</div>{capabilityGroups.flatMap((group) => [<div className="permission-group" key={`${group.label}-heading`}>{group.label}</div>, ...group.capabilities.map((capability) => <div className="permission-row" key={capability}><code>{capability}</code>{roles.map((role) => <span key={role.role} aria-label={`${role.label}: ${role.capabilities.includes(capability) ? "allowed" : "not allowed"}`}>{role.capabilities.includes(capability) ? "✓" : "—"}</span>)}</div>)])}</section>}
  </div>;
}

