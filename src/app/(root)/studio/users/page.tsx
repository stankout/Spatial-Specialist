import { GovernanceUsersClient } from "@/components/governance-users-client";
import { StudioPlatformPage } from "@/components/studio-platform";
import { capabilityGroups, roleDefinitions } from "@/lib/governance/permissions";

export default function Page() {
  const roles = Object.values(roleDefinitions).map((definition) => ({ ...definition, capabilities: [...definition.capabilities] }));
  const groups = Object.entries(capabilityGroups).map(([label, capabilities]) => ({ label, capabilities: [...capabilities] }));
  return <StudioPlatformPage active="users" capability="users.read" eyebrow="Authority and responsibility" title="Users & Roles" description="One centralized role-capability model for current development and a future authenticated production team.">
    <GovernanceUsersClient roles={roles} capabilityGroups={groups}/>
  </StudioPlatformPage>;
}
