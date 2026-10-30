"use client"

import { useMemo, useState } from "react"

import { PageHeader } from "@/features/admin-shell/components/page-header"

import { KNOWLEDGE_BASE_TABS } from "./config/knowledge-base-tabs.config"
import { KnowledgeBaseSectionPlaceholder } from "./components/knowledge-base-section-placeholder"
import { KnowledgeBaseTabs } from "./components/knowledge-base-tabs"
import { CoachInformationSection } from "./components/coach-information-section"
import { ClassInformationSection } from "./components/class-information-section"
import { ScheduleKnowledgeSection } from "./components/schedule-knowledge-section"

import type { KnowledgeBaseTab } from "./types/knowledge-base.types"

export function KnowledgeBaseOverview() {
  const [activeTab, setActiveTab] = useState<KnowledgeBaseTab>("schedule")

  const selectedTab = useMemo(
    () =>
      KNOWLEDGE_BASE_TABS.find((tab) => tab.id === activeTab) ??
      KNOWLEDGE_BASE_TABS[0],
    [activeTab]
  )

  return (
    <div className="min-h-full space-y-5 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Knowledge Base"
        description="Organize the information your team and AI assistants rely on."
      />

      <div className="min-w-0 space-y-4">
        <KnowledgeBaseTabs value={activeTab} onChange={setActiveTab} />

        <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {activeTab === "schedule" ? (
            <ScheduleKnowledgeSection />
          ) : activeTab === "coach_information" ? (
            <CoachInformationSection />
          ) : activeTab === "class_information" ? (
            <ClassInformationSection />
          ) : (
            <KnowledgeBaseSectionPlaceholder tab={selectedTab} />
          )}
        </section>
      </div>
    </div>
  )
}

export default KnowledgeBaseOverview
