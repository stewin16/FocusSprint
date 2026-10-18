import { OverrideRule } from "@/types";

export interface EmergencyMatrixProps {
  rules: OverrideRule[];
  onToggleRule: (ruleId: string) => void;
  onAddRule: (keyword: string, category: OverrideRule["category"], description: string) => void;
  onDeleteRule?: (ruleId: string) => void;
}

export interface RuleTesterProps {
  rules: OverrideRule[];
}
